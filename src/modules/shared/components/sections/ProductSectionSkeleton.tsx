import { Skeleton } from "../ui/skeleton";

interface ProductSectionSkeletonProps {
  title: string;
  count?: number; // Number of product placeholders to show
}

export default function ProductSectionSkeleton({
  title,
  count = 2,
}: ProductSectionSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="w-1/4 h-8" />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-40 w-full" /> {/* Product Image */}
            <Skeleton className="h-4 w-4/5" /> {/* Product Name */}
            <Skeleton className="h-4 w-3/5" /> {/* Product Specs */}
            <Skeleton className="h-4 w-2/5" /> {/* Product Price */}
          </div>
        ))}
      </div>
    </div>
  );
}