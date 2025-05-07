"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import HeroBanner from "../sections/marketing/HeroBanner";
import Footer from "./Footer";
import { ReactQueryProvider } from "@/providers";

export function LayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const showHero = pathname === "/";

  return (
    <ReactQueryProvider>
      <Header />
      {showHero && <HeroBanner />}
      {children}
      <Footer />
    </ReactQueryProvider>
  );
}
