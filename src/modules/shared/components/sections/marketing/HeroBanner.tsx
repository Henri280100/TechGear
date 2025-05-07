"use client";

import { FeatureCardType } from "@/modules/shared/interfaces/FeatureCard";
import { Info, Monitor, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { FadeInSection } from "../../animations";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";

const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading after 2 seconds
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense>
      <FadeInSection>
        <section className="relative overflow-hidden">
          {/* Simplified background with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900/95"></div>
          </div>

          {/* Content container */}
          <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 min-h-[90vh] flex flex-col justify-center">
            {!isLoaded ? (
              // Simplified loading skeleton
              <div className="space-y-12">
                {/* Hero content skeleton */}
                <div className="text-center space-y-6">
                  <div className="flex flex-col items-center space-y-3">
                    <Skeleton className="h-12 w-64 sm:h-14 sm:w-80 md:h-16 md:w-96" />
                    <Skeleton className="h-12 w-48 sm:h-14 sm:w-64 md:h-16 md:w-72" />
                  </div>
                  <Skeleton className="h-6 w-full max-w-md mx-auto" />
                  <div className="flex justify-center">
                    <Skeleton className="h-12 w-40 rounded-full" />
                  </div>
                </div>

                {/* Feature cards skeleton */}
                <div className="grid gap-6 md:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/5"
                    >
                      <Skeleton className="h-48 w-full" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-10 w-full rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-16"
              >
                {/* Hero content */}
                <div className="text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
                  >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                      Epic Gaming
                    </span>
                    <span className="block mt-2">Awaits!</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="max-w-xl mx-auto mt-6 text-xl text-gray-300"
                  >
                    Experience the future of gaming with our latest products!
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="mt-8"
                  >
                    <Button
                      size="lg"
                      className="px-8 py-6 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/40"
                    >
                      Explore Now
                    </Button>
                  </motion.div>
                </div>

                {/* Feature cards */}
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Gaming PC Feature */}
                  <FeatureCard
                    image="https://images.unsplash.com/photo-1587202372775-e229f172b9d7"
                    title="Ultimate Gaming PC"
                    description="RTX 4090, Intel i9, 64GB RAM - Dominate every game!"
                    buttonText="Explore Gaming PC"
                    buttonIcon={<Monitor className="size-4" />}
                    buttonColor="bg-cyan-600 hover:bg-cyan-700"
                    saleTag={undefined}
                  />

                  {/* Upcoming Laptop Feature */}
                  <FeatureCard
                    image="https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
                    title="Next-Gen Laptop"
                    description="Elevate Your Game with Revolutionary Performance!"
                    buttonText="Learn More"
                    buttonIcon={<Info className="size-4" />}
                    buttonColor="bg-purple-600 hover:bg-purple-700"
                    saleTag={undefined}
                  />

                  {/* Sale Announcement */}
                  <FeatureCard
                    image="https://images.unsplash.com/photo-1593640408182-31c70c8268f5"
                    title="Limited Time Sale!"
                    description="Massive discounts on selected gaming gear!"
                    buttonText="Shop Now"
                    buttonIcon={<ShoppingCart className="size-4" />}
                    buttonColor="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                    saleTag="30% OFF"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </FadeInSection>
    </Suspense>
  );
};

const FeatureCard = ({ image, title, description, buttonText, buttonIcon, buttonColor, saleTag }: FeatureCardType) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          width={100}
          height={100}
          quality={75}
          priority
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {saleTag && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md font-bold text-sm">
            {saleTag}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
        </div>
        <Button className={`w-full ${buttonColor} flex items-center justify-center gap-2 mt-auto`}>
          {buttonIcon}
          {buttonText}
        </Button>
      </div>
    </motion.div>
  )
}

export default HeroBanner;
