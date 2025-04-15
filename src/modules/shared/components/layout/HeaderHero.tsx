"use client";

import { useMobileMenu } from "@/modules/shared/hooks/useMobileMenu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Armchair,
  ChevronRight,
  Cpu,
  Gamepad,
  HardDrive,
  Headphones,
  Home,
  Laptop,
  Layers,
  Menu,
  Monitor,
  Package,
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import HeroSection from "./Hero";
import Image from "next/image";

import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Input } from "../ui/input";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const iconVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: { type: "spring", stiffness: 400 },
  },
};

interface BottomNavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

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

// Define SubmenuItem type
type SubmenuItem = {
  title: string;
  href: string;
};

// Define Category type for submenuData
type Category = {
  icon: React.ComponentType<{ className?: string }>;
  items: SubmenuItem[];
};

// Updated submenuData with icons and items from the image
const submenuData: Record<string, Category> = {
  "Office Laptop": {
    icon: Laptop,
    items: [
      { title: "ASUS", href: "/office-laptop/asus" },
      { title: "ACER", href: "/office-laptop/acer" },
      { title: "MSI", href: "/office-laptop/msi" },
      { title: "LENOVO", href: "/office-laptop/lenovo" },
      { title: "DELL", href: "/office-laptop/dell" },
      { title: "HP-Pavilion", href: "/office-laptop/hp-pavilion" },
      { title: "LG-Gram", href: "/office-laptop/lg-gram" },
      { title: "Laptop AI", href: "/office-laptop/laptop-ai" },
    ],
  },
  "Gaming Laptop": {
    icon: Gamepad,
    items: [
      {
        title: "Entry Level (Below 15 millions)",
        href: "/gaming-laptop/under-15m",
      },
      {
        title: "Mid-Range (From 15 to 20 millions)",
        href: "/gaming-laptop/15-20m",
      },
      {
        title: "High-End (Above 20 millions)",
        href: "/gaming-laptop/over-20m",
      },
      { title: "Professional", href: "/gaming-laptop/professional" },
    ],
  },
  "Office PC": {
    icon: Monitor,
    items: [
      { title: "Mini PCs", href: "/office-pc/mini-pcs" },
      { title: "All-in-One", href: "/office-pc/all-in-one" },
      { title: "Workstations", href: "/office-pc/workstations" },
    ],
  },
  "Gaming PC": {
    icon: Gamepad,
    items: [
      {
        title: "Budget Builds (Below 15 millions)",
        href: "/gaming-pc/under-15m",
      },
      { title: "Mid-Range Builds (From 15 to 20)", href: "/gaming-pc/15-20m" },
      {
        title: "High-End Builds (Above 20 millions)",
        href: "/gaming-pc/over-20m",
      },
      {
        title: "Custom Water Cooling",
        href: "/gaming-pc/custom-water-cooling",
      },
    ],
  },
  "Main, CPU, VGA": {
    icon: Cpu,
    items: [
      { title: "Intel Core i3", href: "/components/intel-i3" },
      { title: "Intel Core i5", href: "/components/intel-i5" },
      { title: "Intel Core i7", href: "/components/intel-i7" },
      { title: "AMD Ryzen", href: "/components/amd-ryzen" },
    ],
  },
  "SSD, RAM, Memory, HardDisk": {
    icon: HardDrive,
    items: [
      { title: "Ram laptop", href: "/accessories/ram" },
      { title: "SSD laptop", href: "/accessories/ssd" },
      { title: "Portable hard drive", href: "/accessories/external-hdd" },
    ],
  },
  Chair: {
    icon: Armchair,
    items: [
      { title: "Gaming Chairs", href: "/chair/gaming-chairs" },
      { title: "Office Chairs", href: "/chair/office-chairs" },
      { title: "Ergonomic Options", href: "/chair/ergonomic-options" },
    ],
  },
  Accessories: {
    icon: Package,
    items: [
      { title: "Graphics Design - Studio", href: "/accessories/studio" },
      { title: "Students - Colleges", href: "/accessories/student" },
      { title: "Premium thin & light", href: "/accessories/premium" },
    ],
  },
  Headphones: {
    icon: Headphones,
    items: [
      { title: "Gaming Headsets", href: "/headphones/gaming-headsets" },
      { title: "Wireless Earbuds", href: "/headphones/wireless-earbuds" },
      { title: "Noise Cancelling", href: "/headphones/noise-cancelling" },

      { title: "Studio Quality", href: "/headphones/studio-quality" },
    ],
  },
};

// Enhanced ListItem component with submenu support
const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ComponentType<{ className?: string }>;
    title: string;
    submenuItems?: SubmenuItem[];
    onMouseEnter?: (title: string) => void;
    onMouseLeave?: () => void;
    isHovered?: boolean;
  }
>(
  (
    {
      className,
      title,
      icon: Icon,
      submenuItems: propSubmenuItems,
      onMouseEnter,
      onMouseLeave,
      isHovered,
      ...props
    },
    ref
  ) => {
    // Use submenuItems from props if provided, otherwise fallback to submenuData
    const submenuItems = propSubmenuItems || submenuData[title]?.items || [];

    return (
      <motion.li
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="relative"
        onMouseEnter={() => onMouseEnter?.(title)}
        onMouseLeave={onMouseLeave}
      >
        <HoverCard openDelay={100}>
          {/* The NavigationMenuLink serves as the hover trigger */}
          <HoverCardTrigger asChild>
            <NavigationMenuLink asChild>
              <a
                ref={ref}
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  className
                )}
                {...props}
              >
                <div className="text-sm font-medium leading-none flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {Icon && (
                      <motion.div
                        initial="initial"
                        whileHover="hover"
                        className="text-primary"
                      >
                        <motion.div variants={iconVariants}>
                          <Icon className="h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    )}
                    {title}
                  </div>
                  {submenuItems.length > 0 && (
                    <motion.div
                      initial={{ x: 0 }}
                      animate={isHovered ? { x: 3 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                    </motion.div>
                  )}
                </div>
              </a>
            </NavigationMenuLink>
          </HoverCardTrigger>

          {/* Expanded Submenu displayed on hover */}
          {submenuItems.length > 0 && (
            <HoverCardContent
              side="right"
              sideOffset={8}
              align="start"
              className="flex flex-col p-2 w-[650px] bg-background border border-border/40 rounded-md shadow-lg"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                {/* Hardcoding categories for the layout as per the image */}
                <div className="p-2">
                  <h4 className="text-sm font-semibold mb-1 text-foreground">
                    Brands
                  </h4>
                  {submenuData["Office Laptop"].items.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      custom={idx}
                      whileHover={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)",
                      }}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-1 text-xs"
                        asChild
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="p-2">
                  <h4 className="text-sm font-semibold mb-1 text-foreground">
                    Price
                  </h4>
                  {submenuData["Gaming Laptop"].items
                    .slice(0, 3)
                    .map((item, idx) => (
                      <motion.div
                        key={item.title}
                        variants={itemVariants}
                        custom={idx}
                        whileHover={{
                          backgroundColor: "var(--accent)",
                          color: "var(--accent-foreground)",
                        }}
                        className="w-full"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-1 text-xs"
                          asChild
                        >
                          <Link href={item.href}>{item.title}</Link>
                        </Button>
                      </motion.div>
                    ))}
                </div>

                <div className="p-2">
                  <h4 className="text-sm font-semibold mb-1 text-foreground">
                    CPU Intel - AMD
                  </h4>
                  {submenuData["Main, CPU, VGA"].items.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      custom={idx}
                      whileHover={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)",
                      }}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-1 text-xs"
                        asChild
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="p-2">
                  <h4 className="text-sm font-semibold mb-1 text-foreground">
                    Suppliers
                  </h4>
                  {submenuData["Accessories"].items.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      custom={idx}
                      whileHover={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)",
                      }}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start p-1 text-xs"
                        asChild
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="p-2">
                  <h4 className="text-sm font-semibold mb-1 text-foreground">
                    Laptop accessories
                  </h4>
                  {submenuData["SSD, RAM, Memory, HardDisk"].items.map(
                    (item, idx) => (
                      <motion.div
                        key={item.title}
                        variants={itemVariants}
                        custom={idx}
                        whileHover={{
                          backgroundColor: "var(--accent)",
                          color: "var(--accent-foreground)",
                        }}
                        className="w-full"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start p-1 text-xs"
                          asChild
                        >
                          <Link href={item.href}>{item.title}</Link>
                        </Button>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            </HoverCardContent>
          )}
        </HoverCard>
      </motion.li>
    );
  }
);

ListItem.displayName = "ListItem";

export default function HeaderHero() {
  const { toggleMobileMenu } = useMobileMenu();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

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
            <Link href="/" className="text-2xl font-bold text-primary">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              >
                <Image
                  src="/TG.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="inline-block m-3"
                />
                TGShop
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground">
                    <motion.span
                      className="flex items-center gap-2 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 1 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul
                      className="grid gap-3 p-6 w-[300px] lg:w-[400px]"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Dynamic items from submenuData */}
                      {Object.entries(submenuData).map(([title, data]) => (
                        <ListItem
                          key={title}
                          title={title}
                          icon={data.icon}
                          submenuItems={data.items}
                          onMouseEnter={() => setHoveredItem(title)}
                          onMouseLeave={() => setHoveredItem(null)}
                          isHovered={hoveredItem === title}
                        />
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
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
                  <Link href={"/shop/cart"}>
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
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
    </header>
  );
}
