"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, useRef } from "react";
import { Plus } from "lucide-react";
import FreshArrivalsSectionSkeleton from "./FreshArrivalsSectionSkeleton";

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

export default function FreshArrivalsSection() {
  const plugins = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  return (
    <Suspense fallback={<FreshArrivalsSectionSkeleton />}>
      <section className="my-4">
        <h2 className="text-3xl font-bold mb-6 text-center bg-[#3E5879] text-slate-100 py-2 rounded-lg">
          Fresh Arrivals and New Selections
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
              {freshArrivals.map((item, index) => (
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
                          quality={index === 0 ? 90 : 75} // 👈 priority to first
                          loading={index === 0 ? "eager" : "lazy"}
                          priority={index === 0}
                          placeholder="blur"
                          
                          className="w-full h-[400px] object-cover"
                          blurDataURL={item.image}
                        />
                        <div className="absolute top-2 right-2">
                          <Button variant="secondary" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="text-xs">
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
    </Suspense>
  );
}
