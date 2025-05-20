"use client";

import useIsMobile from "@/modules/shared/hooks/useIsMobile";
import { useMobileMenu } from "@/modules/shared/hooks/useMobileMenu";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { ChevronDown } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/modules/shop/interfaces/ICategory";
import { useAllCategories } from "@/modules/shop/hooks/useAllCategories";
import Loading from "../../ui/Loading";
import ErrorMessage from "../../ui/ErrorMessage";

interface CategorySectionProps {
  categoriesData: ICategory[];
  onRefetch?: (refetch: () => void) => void;
  onViewMore?: () => void;
}

const CategorySection = ({
  onRefetch,
}: Readonly<Omit<CategorySectionProps, "categoriesData">>) => {
  const {
    refetch,
    data: categoriesData = { getAllCategories: [] },
    isLoading,
    error,
  } = useAllCategories();
  const [isOpen, setIsOpen] = useState(false);
  const { isMobileMenuOpen } = useMobileMenu();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (onRefetch) onRefetch(refetch);
  }, [onRefetch, refetch]);

  if (isLoading) {
    <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage message="Failed to load tech news" onRetry={refetch} />
    );
  }

  return (
    <section>
      {isMobile ? (
        <nav className="mb-8">
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <div className="flex flex-col space-y-2 py-4">
                  <Button variant="outline" className="justify-between">
                    <span>Categories</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between">
                    <span>New Product</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">About</Button>
                  <Button variant="ghost">FAQs</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-sm font-semibold">Catalogs</h2>

            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button variant="link" size="sm">
                  View all
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>All Tech Categories</DrawerTitle>
                  <DrawerDescription>
                    Browse our full range of tech product categories.
                  </DrawerDescription>
                </DrawerHeader>
                <ScrollArea className="h-[50vh] px-4">
                  {categoriesData.getAllCategories.map((category: ICategory) => (
                    <div
                      key={category.categoryName}
                      className="flex items-center p-2 hover:bg-muted rounded-lg cursor-pointer"
                    >
                      <span>{category.categoryName}</span>
                    </div>
                  ))}
                </ScrollArea>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <Carousel
            className="w-full mt-2"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {categoriesData.getAllCategories.map((category: ICategory) => (
                <CarouselItem
                  key={category.categoryName}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    {category.categoryName}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-5">
              <CarouselPrevious className="relative inset-auto mr-2" />
              <CarouselNext className="relative inset-auto" />
            </div>
          </Carousel>
        </nav>
      ) : (
        <div className="w-full bg-white border border-gray-400 py-8 rounded-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl text-slate-100 bg-[#3E5879] font-bold mb-6 pb-2 border-b">
              Product Categories
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {categoriesData.getAllCategories.map((category: ICategory) => (
                <Link
                  href="#"
                  key={category.categoryName}
                  className="flex flex-col items-center group hover:opacity-80 transition-opacity"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative mb-2">
                    <Image
                      src={category.categoryImage || "/placeholder.svg"}
                      alt={category.categoryName}
                      fill
                      className="object-contain z-10 shadow-md rounded-lg border"
                    />
                  </div>
                  <span className="text-center text-sm">
                    {category.categoryName}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(CategorySection);
