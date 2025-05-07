"use client"; // Since we're using hooks, this needs to be a client component

import {
  earBuds,
  gamingKeyboards,
  gamingLaptops,
  gamingMice,
  gamingPCs,
} from "@/modules/shop/data/products";
import { useEffect } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Loading from "../ui/Loading";
import { Separator } from "../ui/separator";
import { useTechNews } from "../../hooks";
import { FadeInSection } from "../animations";
import CategorySection from "./shop/CategorySection";
import FreshArrivalsSection from "./shop/FreshArrivalsSection";
import ProductSection from "./shop/ProductSection";
import BestSellersSection from "./shop/BestSellersSection";
import ComingSoonSection from "./marketing/ComingSoonSection";
import ShopSaleSection from "./marketing/ShopSaleSection";
import TechNewsSection from "./marketing/TechNewsSection";

interface LandingPageProps {
  onRefetch?: (refetch: () => void) => void;
}

export default function LandingPageSection({
  onRefetch,
}: Readonly<LandingPageProps>) {
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTechNews();

  useEffect(() => {
    if (onRefetch) onRefetch(refetch);
  }, [onRefetch, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage message="Failed to load tech news" onRetry={refetch} />
    );
  }

  // Flatten articles from all pages
  const techNews = data?.pages.flatMap((page) => page.articles) ?? [];

  return (
    
      <div className="container mx-auto px-4 py-8 bg-gray-50">
        <FadeInSection>
          <CategorySection />
        </FadeInSection>

        <Separator className="my-8" />

        <FadeInSection>
          <FreshArrivalsSection />
        </FadeInSection>

        <FadeInSection>
          <ProductSection title="Gaming PCs" products={gamingPCs} />
        </FadeInSection>

        <FadeInSection>
          <ProductSection title="Gaming Laptops" products={gamingLaptops} />
        </FadeInSection>

        <FadeInSection>
          <ProductSection title="Gaming Mice" products={gamingMice} />
        </FadeInSection>

        <FadeInSection>
          <ProductSection title="Gaming Keyboards" products={gamingKeyboards} />
        </FadeInSection>

        <FadeInSection>
          <ProductSection title="EarBuds" products={earBuds} />
        </FadeInSection>

        <Separator className="my-8" />
        <FadeInSection>
          <BestSellersSection />
        </FadeInSection>

        <Separator className="my-8" />
        <FadeInSection>
          <ComingSoonSection />
        </FadeInSection>

        <FadeInSection>
          <ShopSaleSection />
        </FadeInSection>

        <FadeInSection>
          <TechNewsSection
            techNews={techNews}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </FadeInSection>
      </div>
    
  );
}
