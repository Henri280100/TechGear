import { ProductPreview } from "@/modules/shop/interfaces";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Dialog, DialogTrigger } from "./dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

const ProductCard = React.memo(
  ({
    product,
    onAddToCart,
    onPreview,
  }: {
    product: ProductPreview;
    onAddToCart: (productId: number) => void;
    onPreview: (product: ProductPreview) => void;
  }) => {
    return (
      <Card className="overflow-hidden h-full flex flex-col group hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            <div className="relative h-40 w-full transition-transform duration-300 group-hover:scale-105">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="absolute top-0 right-0 p-1 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="text-xs bg-primary text-primary-foreground">
                  New
                </Badge>
              )}
              {product.discount && (
                <Badge className="text-xs bg-red-500 text-white">
                  {product.discount?.[0]?.discountPercentage}% Off
                </Badge>
              )}
            </div>
            <div className="absolute top-1 left-1 flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-primary"
                    onClick={() => onPreview(product)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Quick preview</span>
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <CardTitle className="text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {product.specs}
          </p>
          <div className="flex items-center mb-2">
            {product.rating ? (
              <>
                {[...Array(5)].map((_: unknown, index: number) => (
                  <Star
                    key={`star-${index}`}
                    className={`w-3 h-3 ${
                      index < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </>
            ) : (
              <Star className="w-3 h-3 text-gray-300" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-bold text-primary">
              ${product.productDetails?.[0]?.finalPrice.toFixed(2)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-2 bg-secondary/50 flex justify-center items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary w-full transition-colors"
                  onClick={() => onAddToCart(product.productId)}
                >
                  <ShoppingCart className="mr-1 h-3 w-3" /> Add to Cart
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add {product.name} to your cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
