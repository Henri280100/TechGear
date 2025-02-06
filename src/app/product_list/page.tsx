"use client";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  Check,
  ChevronRight,
  Filter,
  Gift,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type FC } from "react";
import { FadeInSection } from "./components/FadeInSection";

// Updated mock product data
const products = [
  {
    id: 1,
    name: "PC GVN Intel i5-12400F/ VGA RTX 4060",
    category: "Desktop PC",
    price: 17690000,
    originalPrice: 17930000,
    specs: ["i5 12400F", "RTX 4060", "B760", "16GB", "500GB"],
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=300",
    hasGift: true,
    status: "In Stock",
    brand: "GVN",
    cpu: "Intel i5-12400F",
    ram: "16GB",
    ssd: "500GB",
    vga: "RTX 4060",
  },
  {
    id: 2,
    name: "PC GVN AMD Ryzen 5 5600G/ VGA RX 6600",
    category: "Desktop PC",
    price: 15990000,
    originalPrice: 16500000,
    specs: ["Ryzen 5 5600G", "RX 6600", "B550", "16GB", "500GB"],
    rating: 4.3,
    image: "/placeholder.svg?height=300&width=300",
    hasGift: false,
    status: "In Stock",
    brand: "GVN",
    cpu: "AMD Ryzen 5 5600G",
    ram: "16GB",
    ssd: "500GB",
    vga: "RX 6600",
  },
  {
    id: 3,
    name: "PC GVN Intel i7-13700K/ VGA RTX 4070 Ti",
    category: "Desktop PC",
    price: 39990000,
    originalPrice: 41000000,
    specs: ["i7 13700K", "RTX 4070 Ti", "Z690", "32GB", "1TB"],
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    hasGift: true,
    status: "Pre-order",
    brand: "GVN",
    cpu: "Intel i7-13700K",
    ram: "32GB",
    ssd: "1TB",
    vga: "RTX 4070 Ti",
  },
  // Add more products here to see the grid layout in action
];

type Filters = {
  category: string[];
  priceRange: [number, number];
  status: string[];
  brand: string[];
  cpu: string[];
  ram: string[];
  ssd: string[];
  vga: string[];
};



interface FilterContentProps {
  filters: {
    category: string[];
    priceRange: [number, number];
    status: string[];
    brand: string[];
    cpu: string[];
    ram: string[];
    ssd: string[];
    vga: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<FilterContentProps['filters']>>;
  products: Array<{
    [key: string]: string | number | boolean | string[];
  }>;
}

const FilterContent: FC<FilterContentProps> = ({ filters, setFilters, products }) => {
  
  const handleFilterChange = (key: string, option: string, value: string[]) => {
    if (value.includes(option)) {
      setFilters({
        ...filters,
        [key]: value.filter((item) => item !== option),
      });
    } else {
      setFilters({
        ...filters,
        [key]: [...value, option],
      });
    }
  };

  return (
  <ScrollArea className="h-[calc(100vh-200px)] pr-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <h3 className="mb-2 text-sm font-medium">Price Range</h3>
        <Slider
          min={0}
          max={50000000}
          step={1000000}
          value={filters.priceRange}
          onValueChange={(value) =>
            setFilters({ ...filters, priceRange: value as [number, number] })
          }
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{filters.priceRange[0].toLocaleString("vi-VN")}đ</span>
          <span>{filters.priceRange[1].toLocaleString("vi-VN")}đ</span>
        </div>
      </div>
      {Object.entries(filters).map(([key, value]) => {
        if (key !== "priceRange") {
          const options = Array.from(
            new Set(
              products.map((product) => product[key as keyof typeof product])
            )
          );
          return (
            <div key={key} className="space-y-2">
              <h3 className="text-sm font-medium capitalize">{key}</h3>
              <div className="flex flex-wrap gap-1">
                {options.map((option) => (
                  <Button
                    key={String(option)}
                    variant={
                      (value as string[]).includes(option as string)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    className="text-xs px-2 py-0 h-6"
                    onClick={() => handleFilterChange(key, option as string, value as string[])}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  </ScrollArea>);
};

export default function ProductList() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("featured");
  const [filters, setFilters] = useState<Filters>({
    category: [],
    priceRange: [0, 50000000],
    status: [],
    brand: [],
    cpu: [],
    ram: [],
    ssd: [],
    vga: [],
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "priceLowToHigh") return a.price - b.price;
    if (sortOrder === "priceHighToLow") return b.price - a.price;
    return 0; // 'featured' order
  });

  const filteredProducts = sortedProducts.filter((product) => {
    return (
      (filters.category.length === 0 ||
        filters.category.includes(product.category)) &&
      (filters.status.length === 0 ||
        filters.status.includes(product.status)) &&
      (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
      (filters.cpu.length === 0 || filters.cpu.includes(product.cpu)) &&
      (filters.ram.length === 0 || filters.ram.includes(product.ram)) &&
      (filters.ssd.length === 0 || filters.ssd.includes(product.ssd)) &&
      (filters.vga.length === 0 || filters.vga.includes(product.vga)) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
    );
  });




  return (
    <main id="main-section" className="container mx-auto px-4 py-8 bg-gray-50">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-blue-600 hover:text-blue-800"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold text-gray-800 my-6">Our Products</h1>

      <div className="flex justify-between items-center my-6">
        {isMobile ? (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-gray-100"
              >
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-full">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>
              <div className="px-4">
                <FilterContent filters={filters} setFilters={setFilters} products={products}/>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" size="sm">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-gray-100"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {Object.values(filters).flat().filter(Boolean).length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {Object.values(filters).flat().filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px]">
              <h2 className="font-semibold mb-4">Filters</h2>
              <FilterContent filters={filters} setFilters={setFilters} products={products}/>
            </PopoverContent>
          </Popover>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOrder("featured")}>
              Featured
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("priceLowToHigh")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("priceHighToLow")}>
              Price: High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Skeleton className="h-48 w-full" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <Skeleton className="h-3 w-1/4" />
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Skeleton className="h-6 w-1/2" />
                  </CardFooter>
                </Card>
              ))
            : filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <FadeInSection>
                    <Card className="relative overflow-hidden group h-full flex flex-col">
                      {product.hasGift && (
                        <Badge className="absolute top-2 right-2 z-10 bg-red-500">
                          <Gift className="h-3 w-3 mr-1" />
                          Gift
                        </Badge>
                      )}
                      <CardHeader className="p-0 relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button
                            size="sm"
                            className="bg-white text-black hover:bg-gray-200"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-grow">
                        <h3
                          className="font-semibold text-lg mb-2 truncate hover:text-clip"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.specs.map((spec) => (
                            <Badge
                              key={spec}
                              variant="secondary"
                              className="text-xs"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="flex items-center">
                            <Check className="h-4 w-4 mr-1 text-green-500" />
                            {product.status}
                          </p>
                          <p>Brand: {product.brand}</p>
                          <p>CPU: {product.cpu}</p>
                          <p>RAM: {product.ram}</p>
                          <p>SSD: {product.ssd}</p>
                          <p>VGA: {product.vga}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-red-600">
                            {product.price.toLocaleString("vi-VN")}đ
                          </span>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 line-through mr-2">
                              {product.originalPrice.toLocaleString("vi-VN")}đ
                            </span>
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              {Math.round(
                                (1 - product.price / product.originalPrice) *
                                  100
                              )}
                              % off
                            </Badge>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </FadeInSection>
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
