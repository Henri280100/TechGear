"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Layers,
  Menu,
  Percent,
  Search,
  ShoppingBag,
  ShoppingCart,
  Tag,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import HeroSection from "./Hero";

interface BottomNavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export default function HeaderHero() {
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
    <>
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
            <Link href="/" className="text-2xl font-bold text-primary">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              >
                EShop
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground">
                    <motion.span
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Products
                      {/* <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" /> */}
                    </motion.span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Layers className="h-6 w-6 text-primary" />
                            <div className="mb-2 mt-4 text-lg font-medium text-primary">
                              Featured Product
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Check out our latest and greatest offerings.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem
                        href="/products/new"
                        title="New Arrivals"
                        icon={Zap}
                      >
                        The latest additions to our catalog.
                      </ListItem>
                      <ListItem
                        href="/products/bestsellers"
                        title="Best Sellers"
                        icon={Tag}
                      >
                        Our most popular items.
                      </ListItem>
                      <ListItem
                        href="/products/sale"
                        title="On Sale"
                        icon={Tag}
                      >
                        Great deals on select items.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground">
                    <motion.span
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Categories
                      {/* <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" /> */}
                    </motion.span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <ListItem
                          key={category.title}
                          title={category.title}
                          href={category.href}
                          icon={category.icon}
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/deals" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors",
                        isAtTop
                          ? "text-white hover:bg-white/20"
                          : "text-foreground hover:bg-accent/50"
                      )}
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Deals
                      </motion.span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className={`${
                    isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"
                  }`}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"
                  }`}
                >
                  <User className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="md:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  className={`${
                    isAtTop ? "hover:bg-white/20" : "hover:bg-accent/50"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
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

      {/* Animated Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-primary to-secondary overflow-hidden"
      >
        <HeroSection />
      </motion.section>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ComponentType<{ className?: string }>;
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  href,
  icon: Icon,
  label,
}) => (
  <Link href={href} className="flex flex-col items-center space-y-1">
    <Icon className="h-6 w-6" />
    <span className="text-xs">{label}</span>
  </Link>
);

const categories = [
  {
    title: "Electronics",
    href: "/categories/electronics",
    description: "Cutting-edge gadgets and devices.",
    icon: Zap,
  },
  {
    title: "Clothing",
    href: "/categories/clothing",
    description: "Stylish apparel for all occasions.",
    icon: Tag,
  },
  {
    title: "Home & Garden",
    href: "/categories/home-garden",
    description: "Everything you need for your living space.",
    icon: Layers,
  },
  {
    title: "Sports & Outdoors",
    href: "/categories/sports-outdoors",
    description: "Gear up for your active lifestyle.",
    icon: Layers,
  },
];
