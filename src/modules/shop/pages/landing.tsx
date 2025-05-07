"use client";

import LandingPageSection from "@/modules/shared/components/sections/LandingPageSections";
import ErrorBoundary from "@/modules/shared/components/ui/ErrorBoundary";
import { useState } from "react";

export function LandingPageRoute() {
  const [refetchTechNews, setRefetchTechNews] = useState<(() => void) | null>(
    null
  );

  const handleReset = () => {
    if (refetchTechNews) {
      refetchTechNews();
    }
  };

  return (
    <ErrorBoundary
      fallbackMessage="Uh Oh! Failed to load the landing page 😔"
      onReset={handleReset}
    >
      <LandingPageSection
        onRefetch={(refetch) => setRefetchTechNews(() => refetch)}
      />
    </ErrorBoundary>
  );
}
