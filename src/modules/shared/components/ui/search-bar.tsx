"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";
import { useRef, useEffect, useState, SetStateAction, useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearch } from "../../hooks/useSearch";
import { useRouter } from "next/navigation";
import SearchResultList from "./search-result-list";
import { ProductSearchParams } from "@/modules/shop/interfaces/ProductSearch";

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
  const { data, isLoading, isFetching } = useSearch(debouncedQuery);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results: ProductSearchParams[] = useMemo(
    () =>
      data?.product
        .filter(
          (item) =>
            item?.productName?.toLowerCase().includes(input?.toLowerCase()) ||
            item?.productDescription
              ?.toLowerCase()
              .includes(input?.toLowerCase()) ||
            item?.productCategory
              ?.toLowerCase()
              .includes(input?.toLowerCase()) ||
            item?.productPrice?.toString().includes(input?.toLowerCase()) ||
            item?.productAvailability
              ?.toLowerCase()
              .includes(input?.toLowerCase()) || 
            item?.productImage
              ?.toLowerCase()
              .includes(input?.toLowerCase())
        )
        .map((item) => ({
          id: item.id,
          productDescription: item?.productDescription,
          productName: item?.productName,
          productPrice: item?.productPrice,
          productCategory: item?.productCategory,
          productAvailability: item?.productAvailability,
          productImage: item?.productImage,
        })) ?? [],
    [data, input]
  );


  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  useEffect(() => {
    console.log("API data from useSearch:", data);
  }, [data]);

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
    console.log("Input:", input);
    console.log("Debounced Query:", debouncedQuery);
    console.log("API data from useSearch:", data);
    console.log("Filtered Results:", results);
  }, [input, debouncedQuery, data, results]);

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
