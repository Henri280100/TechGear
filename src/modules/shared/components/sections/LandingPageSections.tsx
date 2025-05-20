"use client"; // Since we're using hooks, this needs to be a client component

import { useEffect, useState } from "react";
import { useTechNews } from "../../hooks";
import { FadeInSection } from "../animations";
import ErrorMessage from "../ui/ErrorMessage";
import Loading from "../ui/Loading";
import { Separator } from "../ui/separator";
import ComingSoonSection from "./marketing/ComingSoonSection";
import ShopSaleSection from "./marketing/ShopSaleSection";
import TechNewsSection from "./marketing/TechNewsSection";
import BestSellersSection from "./shop/BestSellersSection";
import CategorySection from "./shop/CategorySection";
import FreshArrivalsSection from "./shop/FreshArrivalsSection";
import ProductSection from "./shop/ProductSection";
import ErrorBoundary from "../ui/ErrorBoundary";

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

  const [refetchProductList, setRefetchProductList] = useState<
    (() => void) | null
  >(null);

  const [refetchCategoryList, setRefetchCategoryList] = useState<
    (() => void) | null
  >(null);

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

  const handleResetProductList = () => {
    if (refetchProductList) {
      refetchProductList();
    }
  };
  const handleResetCategoryList = () => {
    if (refetchCategoryList) {
      refetchCategoryList();
    }
  };

  // Flatten articles from all pages
  const techNews = data?.pages.flatMap((page) => page.articles) ?? [];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <ErrorBoundary
        fallbackMessage="Something went wrong while loading categories"
        onReset={handleResetCategoryList}
      >
        <FadeInSection>
          <CategorySection
            onRefetch={(categoryRefetch) =>
              setRefetchCategoryList(() => categoryRefetch)
            }
          />
        </FadeInSection>
      </ErrorBoundary>

      <Separator className="my-8" />

      <FadeInSection>
        <FreshArrivalsSection />
      </FadeInSection>

      <ErrorBoundary
        fallbackMessage="Something went wrong while loading products"
        onReset={handleResetProductList}
      >
        <FadeInSection>
          <ProductSection
            title="PC"
            onRefetch={(productRefetch) =>
              setRefetchProductList(() => productRefetch)
            }
          />
        </FadeInSection>

        <FadeInSection>
          <ProductSection
            title="Workstation"
            onRefetch={(productRefetch) =>
              setRefetchProductList(() => productRefetch)
            }
          />
        </FadeInSection>

        <FadeInSection>
          <ProductSection
            title="Gaming Laptop"
            onRefetch={(productRefetch) =>
              setRefetchProductList(() => productRefetch)
            }
          />
        </FadeInSection>

        <FadeInSection>
          <ProductSection
            title="Gaming Mice"
            onRefetch={(productRefetch) =>
              setRefetchProductList(() => productRefetch)
            }
          />
        </FadeInSection>

        <FadeInSection>
          <ProductSection
            title="Gaming Keyboards"
            onRefetch={(productRefetch) =>
              setRefetchProductList(() => productRefetch)
            }
          />
        </FadeInSection>

        <FadeInSection>
          <ProductSection
            title="EarBuds"
            onRefetch={(productRefetch) =>
              setRefetchProductList(() => productRefetch)
            }
          />
        </FadeInSection>
      </ErrorBoundary>

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
