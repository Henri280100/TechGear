import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";

import { SubmenuItem } from "../../interfaces/CategoryMenu";
import { Button } from "../ui/button";
import {
    NavigationMenuLink
} from "../ui/navigation-menu";
import { submenuData } from "../../data/categoriesMenuData";
import { iconVariants, itemVariants, containerVariants } from "../animations/AnimationVariant";

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

export default ListItem;