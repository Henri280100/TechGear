"use client";

import { Card, CardContent } from "../../ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

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

function BestSellersSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {bestSellers.map((product) => (
          <Card key={product.id} className="overflow-hidden z-10 shadow-lg">
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
                <h3 className="font-semibold text-lg">{product.name}</h3>
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
  );
}

export default BestSellersSection;
