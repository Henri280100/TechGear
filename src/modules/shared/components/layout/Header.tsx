"use client";

import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/modules/shared/hooks/useMobileMenu";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Layers, Percent, ShoppingBag, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DesktopNavigation from "../../navigations/DesktopNavigation";
import MotionIcons from "../animations/MotionIcons";
import MotionLogo from "../animations/MotionLogo";
import BottomNavItem from "../ui/bottom-nav-item";
import { Input } from "../ui/input";


export default function Header() {
  
  const { toggleMobileMenu } = useMobileMenu();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollY, setScrollY] = useState(0);

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
      setScrollY(window.scrollY);
      setIsAtTop(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed w-full top-0 z-50 transition-all duration-300",
          scrollY > 50
            ? "bg-background/80 backdrop-blur-lg shadow-lg text-foreground"
            : "bg-transparent text-white"
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
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full bg-background/50 backdrop-blur-md focus:bg-background/80 transition-all duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>
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
