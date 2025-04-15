import { Skeleton } from "../ui/skeleton";

export default function ShopSaleSectionSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="w-1/4 h-8" />

      {/* Banner */}
      <Skeleton className="h-48 w-full" />
    </div>
  );
}