"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import HeroBanner from "../sections/HeroBanner";
import Footer from "./Footer";

export function LayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const showHero = pathname === "/";

  return (
    <>
      <Header />
      {showHero && <HeroBanner />}
      {children}
      <Footer />
    </>
  );
}
