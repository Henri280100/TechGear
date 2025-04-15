import { Skeleton } from "../ui/skeleton";


export default function BestSellersSectionSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="w-1/4 h-8" />

      {/* Best Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-48 w-full" /> {/* Product Image */}
            <Skeleton className="h-4 w-4/5" /> {/* Product Name */}
            <Skeleton className="h-4 w-3/5" /> {/* Product Price */}
          </div>
        ))}
      </div>
    </div>
  );
}