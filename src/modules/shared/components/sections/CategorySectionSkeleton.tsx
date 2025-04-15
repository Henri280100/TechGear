import { Skeleton } from "../ui/skeleton";

export default function CategorySectionSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="w-1/4 h-8" />

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-40 w-full" /> {/* Category Image */}
            <Skeleton className="h-4 w-3/5" /> {/* Category Name */}
          </div>
        ))}
      </div>
    </div>
  );
}