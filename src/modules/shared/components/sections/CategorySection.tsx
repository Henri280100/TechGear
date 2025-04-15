"use client";

import useIsMobile from "@/modules/shared/hooks/useIsMobile";
import { useMobileMenu } from "@/modules/shared/hooks/useMobileMenu";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Laptop",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "PC",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Monitor",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Mainboard",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "CPU",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "VGA",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "RAM",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Storage",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Case",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Cooling",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Power Supply",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Keyboard",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Mouse",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Chair",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Headphones",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Speakers",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Console",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Accessories",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Office Equipment",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Apple",
    icon: () => <span className="mr-2">💻</span>,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function CategorySection() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobileMenuOpen } = useMobileMenu();
  const isMobile = useIsMobile();

  return (
    <section>
      {isMobile ? (
        <nav className="mb-8">
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <div className="flex flex-col space-y-2 py-4">
                  <Button variant="outline" className="justify-between">
                    <span>Categories</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-between">
                    <span>New Product</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">About</Button>
                  <Button variant="ghost">FAQs</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-sm font-semibold">Catalogs</h2>

            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button variant="link" size="sm">
                  View all
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>All Tech Categories</DrawerTitle>
                  <DrawerDescription>
                    Browse our full range of tech product categories.
                  </DrawerDescription>
                </DrawerHeader>
                <ScrollArea className="h-[50vh] px-4">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center p-2 hover:bg-muted rounded-lg cursor-pointer"
                    >
                      {category.icon()}
                      <span>{category.name}</span>
                    </div>
                  ))}
                </ScrollArea>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <Carousel
            className="w-full mt-2"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {categories.map((category) => (
                <CarouselItem
                  key={category.name}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    {category.name}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-5">
              <CarouselPrevious className="relative inset-auto mr-2" />
              <CarouselNext className="relative inset-auto" />
            </div>
          </Carousel>
        </nav>
      ) : (
        <div className="w-full bg-white border border-gray-400 py-8 rounded-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl text-slate-100 bg-[#3E5879] font-bold mb-6 pb-2 border-b">
              Product Categories
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {categories.map((category) => (
                <Link
                  href="#"
                  key={category.name}
                  className="flex flex-col items-center group hover:opacity-80 transition-opacity"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative mb-2">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-contain z-10 shadow-md rounded-lg border"
                    />
                  </div>
                  <span className="text-center text-sm">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
