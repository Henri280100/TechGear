
import CategorySectionSkeleton from "../sections/CategorySectionSkeleton";
import { Separator } from "./separator";
import TechNewsSectionSkeleton from "../sections/TechNewsSectionSkeleton";
import BestSellersSectionSkeleton from "../sections/BestSellersSectionSkeleton";
import ComingSoonSectionSkeleton from "../sections/ComingSoonSectionSkeleton";
import FreshArrivalsSectionSkeleton from "../sections/FreshArrivalsSectionSkeleton";
import ProductSectionSkeleton from "../sections/ProductSectionSkeleton";
import ShopSaleSectionSkeleton from "../sections/ShopSaleSectionSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <CategorySectionSkeleton />

      <Separator className="my-8" />

      <FreshArrivalsSectionSkeleton />

      <ProductSectionSkeleton title="Gaming PCs" />
      <ProductSectionSkeleton title="Gaming Laptops" />
      <ProductSectionSkeleton title="Gaming Mice" />
      <ProductSectionSkeleton title="Gaming Keyboards" />

      <Separator className="my-8" />

      <BestSellersSectionSkeleton />

      <Separator className="my-8" />

      <ComingSoonSectionSkeleton />

      <ShopSaleSectionSkeleton />

      <TechNewsSectionSkeleton />
    </div>
  );
}
