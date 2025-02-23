"use client";

import HeaderHero from "@/components/layout/HeaderHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Plus,
  Search,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const gamingPCs = [
  {
    id: 1,
    name: "UltraGamer Pro",
    price: 1999.99,
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3080, 32GB RAM",
  },
  {
    id: 2,
    name: "EpicBattle Station",
    price: 2499.99,
    rating: 4.9,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3090, 64GB RAM",
  },
  // ... (add more gaming PCs)
];

const gamingLaptops = [
  {
    id: 1,
    name: "PowerPlay 17",
    price: 1799.99,
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3070, 16GB RAM",
  },
  {
    id: 2,
    name: "MobileGamer Pro",
    price: 2199.99,
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3080, 32GB RAM",
  },
  {
    id: 3,
    name: "PowerPlay 17",
    price: 1799.99,
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3070, 16GB RAM",
  },
  {
    id: 4,
    name: "MobileGamer Pro",
    price: 2199.99,
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3080, 32GB RAM",
  },
  {
    id: 5,
    name: "PowerPlay 17",
    price: 1799.99,
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3070, 16GB RAM",
  },
  {
    id: 6,
    name: "MobileGamer Pro",
    price: 2199.99,
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150",
    specs: "RTX 3080, 32GB RAM",
  },
  // ... (add more gaming laptops)
];

const gamingMice = [
  {
    id: 1,
    name: "PrecisionAim X",
    price: 79.99,
    rating: 4.6,
    image: "/placeholder.svg?height=150&width=150",
    specs: "20000 DPI, 8 Buttons",
  },
  {
    id: 2,
    name: "LightSpeed Pro",
    price: 129.99,
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150",
    specs: "Wireless, 25000 DPI",
  },
  // ... (add more gaming mice)
];

const gamingKeyboards = [
  {
    id: 1,
    name: "MechWarrior TKL",
    price: 149.99,
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=150",
    specs: "Mechanical, RGB",
  },
  {
    id: 2,
    name: "SpeedTyper Pro",
    price: 199.99,
    rating: 4.9,
    image: "/placeholder.svg?height=150&width=150",
    specs: "Optical Switches, Macro Keys",
  },
  // ... (add more gaming keyboards)
];

const techNews = [
  {
    id: 1,
    title: "Next-Gen GPUs Announced",
    excerpt:
      "Leading manufacturers reveal plans for revolutionary graphics cards.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "AI in Gaming: The Future is Now",
    excerpt:
      "How artificial intelligence is reshaping video game development and player experiences.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Esports Goes Mainstream",
    excerpt:
      "Major networks sign deals to broadcast competitive gaming events.",
    image: "/placeholder.svg?height=200&width=300",
  },
];

const freshArrivals = [
  {
    id: 1,
    name: "Summer Collection",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Autumn Styles",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Winter Essentials",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Spring Trends",
    image: "/placeholder.svg?height=400&width=300",
  },
  { id: 5, name: "Beachwear", image: "/placeholder.svg?height=400&width=300" },
];

const categories = [
  { name: "Laptops", icon: () => <span className="mr-2">💻</span> },
  { name: "Accessories", icon: () => <span className="mr-2">🎧</span> },
  { name: "Smartphones", icon: () => <span className="mr-2">📱</span> },
  { name: "Tablets", icon: () => <span className="mr-2">📟</span> },
  { name: "Cameras", icon: () => <span className="mr-2">📷</span> },
  { name: "Gaming", icon: () => <span className="mr-2">🎮</span> },
];

const bestSellers = [
  {
    id: 1,
    name: "Premium Watch",
    price: 199.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 129.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 59.99,
    image: "/placeholder.svg?height=100&width=100",
  },
];

const upcomingProducts = [
  {
    id: 1,
    name: "Smart Fitness Tracker",
    description: "Track your health and fitness with our latest smart device.",
    image: "/placeholder.svg?height=150&width=150",
    releaseDate: "Coming in June",
  },
  {
    id: 2,
    name: "Eco-Friendly Water Bottle",
    description:
      "Stay hydrated and eco-conscious with our new insulated bottle.",
    image: "/placeholder.svg?height=150&width=150",
    releaseDate: "Available in July",
  },
  {
    id: 3,
    name: "Wireless Charging Pad",
    description:
      "Charge multiple devices at once with our sleek, fast-charging pad.",
    image: "/placeholder.svg?height=150&width=150",
    releaseDate: "Coming in August",
  },
];

const FadeInSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

const ProductSection = ({ title, products }) => (
  <section className="mb-12">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button variant="outline">See More</Button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden h-full flex flex-col">
          <CardHeader className="p-0">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={300}
                quality={100}
                className="w-full h-32 object-cover"
              />
              <Badge className="absolute top-1 right-1 text-xs bg-primary text-primary-foreground">
                New
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2 flex-grow">
            <CardTitle className="text-sm mb-1 truncate">
              {product.name}
            </CardTitle>
            <p className="text-xs text-muted-foreground mb-1 truncate">
              {product.specs}
            </p>
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-gray-600">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="p-2 bg-secondary flex justify-between items-center">
            <Button variant="outline" size="sm" className="text-xs px-2 py-1">
              View
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-2 py-1"
            >
              <ShoppingCart className="mr-1 h-3 w-3" /> Add
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </section>
);

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const plugins = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );
  const categoryCarouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      if (categoryCarouselRef.current) {
        categoryCarouselRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]); // Run effect only after component mounts

  if (!isMounted) return null; // Prevents hydration issues

  return (
    <>
      <HeaderHero />
      <div ref={categoryCarouselRef}>
        {isMounted && (
          <div className="container mx-auto px-4 py-8 bg-gray-50">
            <FadeInSection>
              <nav className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                      <span className="sr-only">
                        {isMobileMenuOpen ? "Close menu" : "Open menu"}
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-48 justify-between hidden md:flex"
                        >
                          <span>Categories</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {categories.map((category, index) => (
                          <DropdownMenuItem key={index}>
                            {category.icon()}
                            {category.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-40 justify-between hidden md:flex"
                        >
                          <span>New Product</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Latest Arrivals</DropdownMenuItem>
                        <DropdownMenuItem>Trending</DropdownMenuItem>
                        <DropdownMenuItem>Seasonal</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center space-x-4">
                    <AnimatePresence>
                      {(isSearchOpen || window.innerWidth > 768) && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 w-full md:w-auto"
                          />
                          <Search className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!isSearchOpen && window.innerWidth <= 768 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSearchOpen(true)}
                      >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:inline-flex"
                    >
                      About
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden md:inline-flex"
                    >
                      FAQs
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Cart</span>
                    </Button>
                  </div>
                </div>

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
                        {categories.map((category, index) => (
                          <div
                            key={index}
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
                  ref={categoryCarouselRef}
                  className="w-full mt-2"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {categories.map((category, index) => (
                      <CarouselItem
                        key={index}
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
            </FadeInSection>

            <FadeInSection>
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Fresh arrivals and new selections
                </h2>
                <div className="relative">
                  <Carousel
                    plugins={[plugins.current]}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {freshArrivals.map((item) => (
                        <CarouselItem
                          key={item.id}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="p-1">
                            <Card className="overflow-hidden">
                              <CardContent className="p-0 relative">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={300}
                                  height={400}
                                  quality={100}
                                  className="w-full h-[400px] object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                  <Button variant="secondary" size="icon">
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Add collections
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-4">
                      <CarouselPrevious className="relative inset-auto mr-2" />
                      <CarouselNext className="relative inset-auto" />
                    </div>
                  </Carousel>
                </div>
              </section>
            </FadeInSection>

            <FadeInSection>
              <ProductSection title="Gaming PCs" products={gamingPCs} />
            </FadeInSection>

            <FadeInSection>
              <ProductSection title="Gaming Laptops" products={gamingLaptops} />
            </FadeInSection>

            <FadeInSection>
              <ProductSection title="Gaming Mice" products={gamingMice} />
            </FadeInSection>

            <FadeInSection>
              <ProductSection
                title="Gaming Keyboards"
                products={gamingKeyboards}
              />
            </FadeInSection>

            <Separator className="my-8" />
            <FadeInSection>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {bestSellers.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <CardContent className="flex items-center p-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          quality={100}
                          className="w-20 h-20 object-cover mr-4 rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <Star className="ml-auto text-yellow-400 w-5 h-5" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </FadeInSection>

            <Separator className="my-8" />
            <FadeInSection>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {upcomingProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                        <CardHeader className="p-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={150}
                            height={100}
                            quality={100}
                            className="w-full h-32 object-cover"
                          />
                        </CardHeader>
                        <CardContent className="p-3 flex-grow">
                          <CardTitle className="text-sm mb-1">
                            {product.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mb-2">
                            {product.description}
                          </p>
                          <Badge
                            variant="secondary"
                            className="text-xs py-0.5 px-1"
                          >
                            {product.releaseDate}
                          </Badge>
                        </CardContent>
                        <CardFooter className="bg-secondary p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                          >
                            Notify Me <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            </FadeInSection>

            <FadeInSection>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Shop Sale</h2>
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-3xl font-bold mb-4">
                    Summer Gaming Blowout!
                  </h3>
                  <p className="text-xl mb-6">
                    Up to 50% off on selected gaming gear. Limited time offer!
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-red-500 hover:bg-gray-100"
                  >
                    Shop Now <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </section>
            </FadeInSection>

            <FadeInSection>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Tech News</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {techNews.map((news) => (
                    <Card key={news.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <Image
                          src={news.image}
                          alt={news.title}
                          width={500}
                          height={300}
                          quality={100}
                          className="w-full h-40 object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {news.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter className="bg-secondary p-4">
                        <Button variant="outline" size="sm" className="w-full">
                          Read More <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            </FadeInSection>
          </div>
        )}
      </div>
    </>
  );
}
