"use client";

import { useState, type ReactNode } from "react";
import { Button } from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableContentProps<T> {
  items: T[];
  initialCount: number;
  renderItem: (item: T, index: number) => ReactNode;
  containerClassName?: string;
  loadingDelay?: number;
  expandButtonText?: string;
  collapseButtonText?: string;
  loadingText?: string;
}

export function ExpandableContent<T>({
  items,
  initialCount,
  renderItem,
  containerClassName,
  loadingDelay = 800,
  expandButtonText = "Load more",
  collapseButtonText = "Show less",
  loadingText = "Loading...",
}: Readonly<ExpandableContentProps<T>>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const displayedItems = isExpanded ? items : items.slice(0, initialCount);
  const hasMoreItems = items.length > initialCount;

  const toggleExpand = () => {
    if (!isExpanded) {
      // Simulate loading when expanding
      setIsLoading(true);
      setTimeout(() => {
        setIsExpanded(true);
        setIsLoading(false);
      }, loadingDelay);
    } else {
      // Collapse immediately
      setIsExpanded(false);
    }
  };

  return (
    <>
      <div className={containerClassName}>
        {displayedItems.map((item, index) => renderItem(item, index))}
      </div>

      {hasMoreItems && (
        <div className="mt-16 flex justify-center">
          <Button
            onClick={toggleExpand}
            disabled={isLoading}
            className="py-3 px-8 rounded-full bg-[#4F709C]/10 text-[#4F709C] font-medium hover:bg-[#4F709C] hover:text-white transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
          >
            {isLoading ? (
              loadingText
            ) : isExpanded ? (
              <>
                {collapseButtonText} <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                {expandButtonText} <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
}
