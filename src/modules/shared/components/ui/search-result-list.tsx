import { ProductSearchParams } from "@/modules/shop/interfaces/ProductSearch";
import React from "react";
import { Button } from "./button";
import Image from "next/image";

interface SearchResultListProps {
  results: ProductSearchParams[];
  onSelect: (id: number) => void;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  results,
  onSelect,
}) => {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scroll-smooth border rounded-lg shadow-sm bg-white p-4">
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">
            search_off
          </span>
          <div className="text-sm text-muted-foreground">
            No results found. Try adjusting your search criteria.
          </div>
        </div>
      ) : (
        results.map((item) => (
          <div
            key={item?.id}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-300 bg-white group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              {item?.isNew && (
                <div className="bg-primary-500 text-white text-xs font-bold px-4 py-1 text-center transform rotate-45 translate-y-5 translate-x-2 shadow-md">
                  NEW
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[120px] flex-shrink-0">
                <div className="relative rounded-md overflow-hidden border border-gray-100 bg-gray-50 h-[120px] group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={item?.productImage ?? "/placeholder-image.png"}
                    alt={item?.productImage ?? "Product Image"}
                    width={120}
                    height={120}
                    quality={80}
                    priority
                    className="object-cover w-full h-full text-foreground"
                    onError={(e) => {
                      console.error(`Failed to load image: ${item?.productImage}`);
                      e.currentTarget.src = '/placeholder-image.png'; // Fallback on error
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <Button
                    className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors duration-200 p-0 h-auto text-left"
                    variant={"ghost"}
                    onClick={() => onSelect(item.id)}
                  >
                    {item?.productName || "Product Name"}
                  </Button>

                  <div className="flex items-center gap-2">
                    {item?.productTags && (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        {item?.productTags.join(", ")}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-primary-600 font-bold mb-2">
                  ${item?.finalPrice?.toFixed(2)}
                </p>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {item?.productDescription ?? "No description available."}
                </p>

                <div className="flex items-center gap-2 mt-auto">
                  <Button
                    className="text-xs bg-primary-50 hover:bg-primary-100 text-primary-600 font-medium rounded-full px-3 py-1 transition-all duration-200"
                    onClick={() => onSelect(item.id)}
                  >
                    View Details
                  </Button>
                  {/* Next: "Add quick view modal button" */}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {/* Next: "Add infinite scroll or pagination component" */}
    </div>
  );
};

export default SearchResultList;
