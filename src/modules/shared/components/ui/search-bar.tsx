"use client";

import { IProductSearch } from "@/modules/shop/interfaces";
import { ProductSearchParams, ProductSearchResponse } from "@/modules/shop/interfaces/ProductSearch";
import { useDebounce } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import { useSearch } from "../../hooks/useSearch";
import { Input } from "./input";
import SearchResultList from "./search-result-list";
import { UseQueryResult } from "@tanstack/react-query";

interface HeaderSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState<string>("");
  const [debouncedQuery] = useDebounce(input, 300);
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data, isLoading, isFetching }: UseQueryResult<ProductSearchResponse, Error> = useSearch(debouncedQuery);

  const results: ProductSearchParams[] = useMemo(() => {
    if (!data?.product) return [];

    return data.product.map(
        (item: IProductSearch): ProductSearchParams => ({
          id: item.id,
          productDescription: item.productDescription,
          productName: item.productName,
          finalPrice: item.finalPrice,
          productCategory: item.productCategory,
          productAvailability: item.productAvailability,
          productImage: item.productImage,
          productTags: item.productTags,
        })
      );
  }, [data]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const handleSelect = (id: number) => {
    router.push(`/product/${id}`);
    onClose();
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && isMobile) {
        onClose();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, onClose, isMobile]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 space-y-4"
        >
          <Input
            type="search"
            value={input}
            onChange={handleInputChange}
            placeholder="Search products..."
            className="w-full bg-background/50 backdrop-blur-md focus:bg-background/80 transition-all duration-300"
          />

          {(isLoading || isFetching) && (
            <p className="text-sm text-muted-foreground">Searching...</p>
          )}
          {data?.product?.length === 0 && debouncedQuery && (
            <p className="text-sm text-destructive">No results found.</p>
          )}
          {!isFetching && results.length > 0 && (
            <SearchResultList results={results} onSelect={handleSelect} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderSearchBar;
