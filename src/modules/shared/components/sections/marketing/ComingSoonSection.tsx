"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Bell, ChevronRight, Clock, Star } from "lucide-react";
import { UpComingProductPreview } from "@/modules/shop/interfaces";

const upcomingProducts = [
  {
    productId: 1,
    name: "Smart Fitness Tracker",
    productDescription: "Track your health and fitness with our latest smart device.",
    imageUrl: "/placeholder.svg?height=150&width=150",
    releaseDate: "Coming in June",
  },
  {
    productId: 2,
    name: "Eco-Friendly Water Bottle",
    productDescription:
      "Stay hydrated and eco-conscious with our new insulated bottle.",
    imageUrl: "/placeholder.svg?height=150&width=150",
    releaseDate: "Available in July",
  },
  {
    productId: 3,
    name: "Wireless Charging Pad",
    productDescription:
      "Charge multiple devices at once with our sleek, fast-charging pad.",
    imageUrl: "/placeholder.svg?height=150&width=150",
    releaseDate: "Coming in August",
  },
];

const ComingSoonCard = ({ product }: { product: UpComingProductPreview }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="absolute -right-3 top-3 z-10">
        <div className="bg-[#4F709C] text-white text-xs font-bold px-4 py-1 rounded-l-md shadow-md transform -skew-x-12">
          UPCOMING
        </div>
      </div>

      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={300}
              quality={100}
              className="w-full h-48 object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 mr-1" />
            <span>{product.daysLeft} days left</span>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center bg-[#4F709C]/90 text-white text-xs px-2 py-1 rounded-full">
            <Star className="h-3 w-3 mr-1 fill-white" />
            <span>{product.hype} Hype</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-grow">
        <CardTitle className="text-lg font-bold mb-2 line-clamp-1">
          {product.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.productDescription}
        </p>
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-slate-100 text-slate-800 border-slate-200 font-medium"
          >
            {product.releaseDate}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          size="lg"
          className="w-full relative overflow-hidden group border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-[#213555] text-white"
        >
          <span className="absolute inset-0 w-0 bg-red-600 transition-all duration-500 ease-out group-hover:w-full"></span>
          <span className="relative flex items-center justify-center w-full transition-colors duration-300 ease-out">
            <Bell className="mr-2 h-4 w-4" />
            Notify Me
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

function ComingSoonSection() {
  return (
    <section className="mb-16 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-[#4F709C]/5 rounded-xl -z-10" />

      {/* Heading with animated underline */}
      <div className="flex flex-col items-center text-center mb-10 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-[#4F709C] absolute -top-2"
        />
        <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#213555] to-[#4F709C]">
          Coming Soon
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-[#4F709C]"
        />
        <p className="text-muted-foreground mt-3 max-w-md">
          Be the first to know when these exciting new products hit our shelves
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {upcomingProducts.map((product, index) => (
          <motion.div
            key={product.productId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.2 },
            }}
            className="h-full"
          >
            <ComingSoonCard product={product} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-8 text-center"
      >
        <Button
          variant="outline"
          className="border-dashed border-[#4F709C]/50 text-[#4F709C] hover:bg-[#4F709C]/5"
        >
          View All Upcoming Products
        </Button>
      </motion.div>
    </section>
  );
}

export default ComingSoonSection;
