"use client"; // Since we're using hooks, this needs to be a client component



import {
  gamingKeyboards,
  gamingLaptops,
  gamingMice,
  gamingPCs,
  earBuds
} from "@/modules/shop/data/products";
import { useTechNews } from "@/modules/shared/hooks/useTechNews";
import { useEffect } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Loading from "../ui/Loading";
import { Separator } from "../ui/separator";
import HeaderHero from "../layout/HeaderHero";
import { FadeInSection } from "../animations/FadeInSection";
import CategorySection from "./CategorySection";
import FreshArrivalsSection from "./FreshArrivalsSection";
import ProductSection from "./ProductSection";
import BestSellersSection from "./BestSellersSection";
import ComingSoonSection from "./ComingSoonSection";
import ShopSaleSection from "./ShopSaleSection";
import Footer from "../layout/Footer";
import TechNewsSection from "./TechNewsSection";

interface LandingPageProps {
  onRefetch?: (refetch: () => void) => void;
}

export default function LandingPageSection({
  onRefetch,
}: Readonly<LandingPageProps>) {
  const { data: techNews, isLoading, error, refetch } = useTechNews();

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

  return (
    <>
      <HeaderHero />
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
          <TechNewsSection techNews={techNews || []} />
        </FadeInSection>
      </div>
      <Footer />
    </>
  );
}
