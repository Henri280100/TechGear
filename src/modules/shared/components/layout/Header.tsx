"use client";

import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/modules/shared/hooks/useMobileMenu";
import { motion } from "framer-motion";
import { Home, Layers, Percent, ShoppingBag, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DesktopNavigation from "../../navigations/DesktopNavigation";
import MotionIcons from "../animations/MotionIcons";
import MotionLogo from "../animations/MotionLogo";
import BottomNavItem from "../ui/bottom-nav-item";
import HeaderSearchBar from "../ui/search-bar";

export default function Header() {
  const pathname = usePathname();
  const { toggleMobileMenu } = useMobileMenu();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  // const [scrollY, setScrollY] = useState(0);

  const isCartPage = pathname.startsWith("/shop/cart");

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current?.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => document.removeEventListener("mousedown", handleOutSideClick);
  }, [ref]);

  useEffect(() => {
    const handleScroll = () => {
      // setScrollY(window.scrollY);
      setIsAtTop(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const headerClassName = !isAtTop
    ? "bg-background/80 backdrop-blur-lg shadow-lg text-foreground"
    : "bg-transparent text-white";

  return (
    <header>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "w-full top-0 z-50 transition-all duration-300",
          !isCartPage && "fixed",
          isCartPage ? "bg-white text-foreground shadow" : headerClassName
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <MotionLogo />

            <DesktopNavigation isAtTop={isAtTop} />

            {/* Icons */}
            <MotionIcons
              toggleMobileMenu={toggleMobileMenu}
              isAtTop={isAtTop}
              toggleSearch={toggleSearch}
            />
          </div>

          {/* Search Bar */}
          <HeaderSearchBar isOpen={isSearchOpen} onClose={toggleSearch} />
        </div>
      </motion.header>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          <BottomNavItem href="/" icon={Home} label="Home" />
          <BottomNavItem href="/products" icon={ShoppingBag} label="Products" />
          <BottomNavItem href="/categories" icon={Layers} label="Categories" />
          <BottomNavItem href="/deals" icon={Percent} label="Deals" />
          <BottomNavItem href="/account" icon={User} label="Account" />
        </div>
      </nav>
    </header>
  );
}
