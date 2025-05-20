"use client";

import { formatAvailability } from "@/app/utils/formatAvailability";
import { useAllProducts } from "@/modules/shop/hooks/useAllProducts";
import { ProductPreview } from "@/modules/shop/interfaces/IProduct";
import { Check, ChevronRight, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import ErrorMessage from "../../ui/ErrorMessage";
import Loading from "../../ui/Loading";
import ProductCard from "../../ui/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

interface ProductSectionProps {
  title: string;
  products: ProductPreview[];
  onAddToCart?: (productId: number) => void;
  onViewMore?: () => void;
  onRefetch?: (refetch: () => void) => void;
}

const ProductSection = React.memo(
  ({
    title,
    onAddToCart = () => {},
    onViewMore = () => {},
    onRefetch,
  }: Readonly<Omit<ProductSectionProps, "products">>) => {
    /**
     * Fetches all products with loading and error states.
     * @returns {Object} - Contains products array, loading state, and error state.
     */
    const {
      refetch,
      data: products = { getAllProducts: [] },
      isLoading,
      error,
    } = useAllProducts();

    /**
     * State to toggle the display of all brands.
     */
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [activeBrand, setActiveBrand] = useState("all");

    /**
     * Destructures product store for preview and brand management.
     */
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<ProductPreview | null>(
      null
    );

    /**
     * Ref for section div element.
     */
    const sectionRef = useRef<HTMLDivElement>(null);

    // Memoized brand extraction
    const brands = useMemo(() => {
      const brandSet: Set<string> = new Set(["all"]);
      products?.getAllProducts
        ?.filter((product: ProductPreview) =>
          product.category?.categoryName
            ? product.category.categoryName.toLowerCase() ===
              title.toLowerCase()
            : false
        )
        .forEach((product: ProductPreview) => {
          if (product.brand) {
            if (Array.isArray(product.brand)) {
              product.brand.forEach((b: string) => {
                if (b) {
                  brandSet.add(b);
                }
              });
            } else {
              brandSet.add(product.brand);
            }
          }
        });
      return Array.from(brandSet);
    }, [products, title]);

    const displayedBrands = showAllBrands ? brands : brands.slice(0, 5);

    // Filter products based on the local activeBrand
    const filteredProducts = useMemo(() => {
      return (
        products?.getAllProducts
          ?.filter((product: ProductPreview) =>
            product.category?.categoryName
              ? product.category.categoryName.toLowerCase() ===
                title.toLowerCase()
              : false
          )
          .filter((product: ProductPreview) =>
            activeBrand === "all"
              ? true
              : product.brand
              ? Array.isArray(product.brand)
                ? product.brand.includes(activeBrand)
                : product.brand === activeBrand
              : false
          ) ?? []
      );
    }, [title, activeBrand, products]);

    const handlePreview = (product: ProductPreview) => {
      setPreviewProduct(product);
      setIsDialogOpen(true);
    };

    // Intersection Observer for lazy loading
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Trigger any pre-fetching or additional loading here
          }
        },
        { threshold: 0.1 }
      );

      const currentRef = sectionRef.current; // Create a local variable

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, []);

    useEffect(() => {
      if (onRefetch) onRefetch(refetch);
    }, [onRefetch, refetch]);

    if (isLoading) {
      <Loading />;
    }

    if (error) {
      return (
        <ErrorMessage message="Failed to load tech news" onRetry={refetch} />
      );
    }

    return (
      <section className="mb-12">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold pb-2 border-b-2 border-primary">
              {title}
            </h2>

            <Button
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-colors hidden sm:flex"
              onClick={onViewMore}
            >
              View More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="overflow-x-auto pb-2 -mx-1 scrollbar-hide">
              <Tabs
                defaultValue="all"
                value={activeBrand}
                onValueChange={setActiveBrand}
                className="w-full"
              >
                <TabsList className="h-9 bg-muted/50">
                  {displayedBrands.map((brand) => (
                    <TabsTrigger
                      key={brand}
                      value={brand}
                      className="text-xs sm:text-sm capitalize px-3 py-1.5"
                    >
                      {brand}
                    </TabsTrigger>
                  ))}
                  {brands.length > 5 && !showAllBrands && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllBrands(true)}
                      className="text-xs sm:text-sm h-7 px-2"
                    >
                      More +
                    </Button>
                  )}
                </TabsList>
              </Tabs>
            </div>

            <Button
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-colors sm:hidden"
              size="sm"
              onClick={onViewMore}
            >
              View All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredProducts.slice(0, 6).map((product: ProductPreview) => (
            <ProductCard
              key={product.productId}
              product={product}
              onAddToCart={onAddToCart}
              onPreview={handlePreview}
            />
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            {previewProduct && (
              <DetailProductPreview
                product={previewProduct}
                onAddToCart={onAddToCart}
              />
            )}
          </DialogContent>
        </Dialog>

        <div className="mt-6 flex justify-center sm:hidden">
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={onViewMore}
          >
            View More Products <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>
    );
  }
);

ProductSection.displayName = "ProductSection";

const DetailProductPreview = React.memo(
  ({
    product,
    onAddToCart,
  }: Readonly<{
    product: ProductPreview;
    onAddToCart: (productId: number) => void;
  }>) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            priority
            quality={80}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )}
            {product.discount?.[0]?.discountPercentage ? (
              <Badge className="bg-red-500 text-white">
                {product.discount?.[0]?.discountPercentage}% Off
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {product.productDetails?.[0]?.specification
                ?.map(
                  (productSpec) =>
                    `${productSpec.specName}: ${productSpec.specValue}`
                )
                .map((spec, index) => (
                  <span key={index}>
                    {spec}
                    <br />
                  </span>
                )) || "No specifications available"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-3">
                <p className="text-sm">
                  {product.productDescription ||
                    "No detailed description available for this product."}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm font-medium">Availability:</span>
                  <span className="flex items-center text-sm">
                    {product.availability ? (
                      <>
                        <Check className="mr-1 h-4 w-4 text-green-500" />{" "}
                        {formatAvailability(product.availability) || "N/A"}
                      </>
                    ) : (
                      "Out of stock"
                    )}
                  </span>
                </div>

                {product.category?.categoryName === "EarBuds" &&
                  product.productDetails?.[0]?.colors &&
                  product.productDetails?.[0]?.colors.length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm font-medium">
                        Available Colors:
                      </span>
                      <div className="flex gap-2 mt-1">
                        {product.productDetails?.[0]?.colors.map(
                          (color: string) => (
                            <div
                              key={color}
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
              </TabsContent>
              <TabsContent value="features" className="mt-3">
                {product.features ? (
                  <p className="text-sm">{product.features}</p>
                ) : (
                  <p className="text-sm">
                    No feature details available for this product.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">
              ${product.productDetails?.[0]?.finalPrice.toFixed(2) ?? "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center">
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
          </div>

          <div className="mt-6">
            <Button
              className="w-full"
              onClick={() => onAddToCart(product.productId)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

DetailProductPreview.displayName = "DetailProductPreview";

export default ProductSection;
