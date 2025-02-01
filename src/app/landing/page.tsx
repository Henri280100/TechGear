"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  ChevronDown,
  Layers,
  Tag,
  Zap,
} from "lucide-react";
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
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Component() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gradient-to-r from-background/30 to-background/50 backdrop-blur-lg shadow-lg sticky top-0 z-50"
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
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
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
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
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
                      className={navigationMenuTriggerStyle()}
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
                  className="hover:bg-accent/50"
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
                  className="hover:bg-accent/50"
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
                  className="hover:bg-accent/50"
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
                  className="hover:bg-accent/50"
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-64 bg-gradient-to-l from-background/80 to-background/50 backdrop-blur-lg shadow-lg z-50 md:hidden"
            >
              <div className="p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 hover:bg-accent/50"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-5 w-5" />
                </Button>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/products"
                    className="text-foreground hover:text-primary transition-colors duration-200"
                  >
                    Products
                  </Link>
                  <Link
                    href="/categories"
                    className="text-foreground hover:text-primary transition-colors duration-200"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/deals"
                    className="text-foreground hover:text-primary transition-colors duration-200"
                  >
                    Deals
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Animated Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-primary to-secondary overflow-hidden"
      >
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-background sm:text-5xl md:text-6xl">
              Summer Collection
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-background/90">
              Discover our latest arrivals and hottest trends for the season.
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <Button
              size="lg"
              variant="secondary"
              className="mr-4 bg-background text-primary hover:bg-background/90"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background text-background hover:bg-background/20"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute -bottom-16 -left-16 w-64 h-64 bg-background rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-background rounded-full opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
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
