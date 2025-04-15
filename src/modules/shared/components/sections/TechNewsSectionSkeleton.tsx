import { Skeleton } from "../ui/skeleton";

interface TechNewsSectionSkeletonProps {
  count?: number; // Number of news article placeholders to show
}

export default function TechNewsSectionSkeleton({ count = 3 }: TechNewsSectionSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="w-1/4 h-8" />

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={`space-y-2 ${index === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
          >
            <Skeleton className="h-60 w-full" /> {/* News Image */}
            <Skeleton className="h-6 w-3/5" /> {/* News Title */}
            <Skeleton className="h-4 w-4/5" /> {/* News Description */}
            <Skeleton className="h-4 w-2/5" /> {/* News Meta (Date, Category) */}
          </div>
        ))}
      </div>
    </div>
  );
}