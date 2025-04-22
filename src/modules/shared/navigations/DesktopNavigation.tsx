import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Layers, Menu, Tag, Zap } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { containerVariants } from "../components/animations/AnimationVariant";
import ListItem from "../components/ui/list-item";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { categories, submenuData } from "../data/categoriesMenuData";
import { HeaderPropsPreview } from "../interfaces/HeaderProps";
import { usePathname } from "next/navigation";

const DesktopNavigation: React.FC<HeaderPropsPreview> = ({ isAtTop }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isCartPage = pathname.startsWith("/shop/cart");
  return (
    <>
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
                <ListItem href="/products/new" title="New Arrivals" icon={Zap}>
                  The latest additions to our catalog.
                </ListItem>
                <ListItem
                  href="/products/bestsellers"
                  title="Best Sellers"
                  icon={Tag}
                >
                  Our most popular items.
                </ListItem>
                <ListItem href="/products/sale" title="On Sale" icon={Tag}>
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
            <NavigationMenuLink asChild>
              <Link
                href="/deals"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent transition-colors",
                  isAtTop && !isCartPage
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
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default DesktopNavigation;
