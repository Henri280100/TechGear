"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Heart,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/modules/shared/components/ui/button";
import { Separator } from "@/modules/shared/components/ui/separator";
import Link from "next/link";
import { toast } from "@/modules/shared/hooks";
import { ICartItem } from "../interfaces/ICartItems";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/modules/shared/components/ui/alert-dialog";
import { Input } from "@/modules/shared/components/ui/input";

// Sample cart data - in a real app, this would come from a state management solution or API
const initialItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
    color: "Black",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 2,
    color: "Silver",
  },
  {
    id: 3,
    name: "Portable Charger",
    price: 49.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
    color: "White",
  },
];

export function CartPage() {
  const [items, setItems] = useState<ICartItem[]>(initialItems);
  const [savedItems, setSavedItems] = useState<ICartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    toast({
      title: "Quantity updated",
      description: "Your cart has been updated",
      duration: 2000,
    });
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      variant: "destructive",
      duration: 2000,
    });
  };

  const saveForLater = (id: number) => {
    const itemToSave = items.find((item) => item.id === id);
    if (itemToSave) {
      setSavedItems([...savedItems, itemToSave]);
      setItems(items.filter((item) => item.id !== id));

      toast({
        title: "Saved for later",
        description: `${itemToSave.name} has been saved for later`,
        duration: 2000,
      });
    }
  };

  const moveToCart = (id: number) => {
    const itemToMove = savedItems.find((item) => item.id === id);
    if (itemToMove) {
      setItems([...items, itemToMove]);
      setSavedItems(savedItems.filter((item) => item.id !== id));

      toast({
        title: "Added to cart",
        description: `${itemToMove.name} has been moved to your cart`,
        duration: 2000,
      });
    }
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      variant: "destructive",
      duration: 2000,
    });
  };

  const applyPromoCode = () => {
    setIsApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "discount20") {
        const discountAmount = subtotal * 0.2;
        setDiscount(discountAmount);
        toast({
          title: "Promo code applied",
          description: "20% discount has been applied to your order",
          duration: 2000,
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: "Please try a different code",
          variant: "destructive",
          duration: 2000,
        });
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 10.0 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax - discount;

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-sm mb-6">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 h-auto rounded-xl shadow-md hover:shadow-lg transition-all">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-red-600" />
                  Your Shopping Bag (
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </h2>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all items from your cart. This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearCart}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Clear Cart
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row gap-6 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border"
                    >
                      <div className="flex-shrink-0 bg-white p-2 rounded-lg border shadow-sm">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => saveForLater(item.id)}
                              className="text-foreground bg-white hover:text-red-500 transition-colors"
                              size="sm"
                              variant="ghost"
                              aria-label="Save for later"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => removeItem(item.id)}
                              className="text-foreground bg-white hover:text-rose-500 transition-colors"
                              size="sm"
                              variant="ghost"
                              aria-label="Remove item"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          Color: {item.color}
                        </p>
                        {item.size && (
                          <p className="text-muted-foreground mb-1">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="text-red-600 font-medium mb-4">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center">
                          <Button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                            disabled={item.quantity === 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-4 font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 rounded-md border bg-slate-50 text-foreground border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right sm:min-w-[100px] flex sm:block items-center justify-between mt-4 sm:mt-0">
                        <span className="text-sm text-muted-foreground sm:hidden">
                          Subtotal:
                        </span>
                        <p className="font-medium text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {savedItems.length > 0 && (
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden mt-8">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-600" />
                  Saved for Later ({savedItems.length} items)
                </h2>
                <div className="space-y-6">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-6 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border"
                    >
                      <div className="flex-shrink-0 bg-white p-2 rounded-lg border shadow-sm">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <Button
                            onClick={() =>
                              setSavedItems(
                                savedItems.filter((i) => i.id !== item.id)
                              )
                            }
                            className="text-foreground bg-white hover:text-rose-500 transition-colors"
                            size="sm"
                            variant="ghost"
                            aria-label="Remove saved item"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          Color: {item.color}
                        </p>
                        {item.size && (
                          <p className="text-muted-foreground mb-1">
                            Size: {item.size}
                          </p>
                        )}
                        <p className="text-red-600 font-medium mb-4">
                          ${item.price.toFixed(2)}
                        </p>
                        <Button
                          onClick={() => moveToCart(item.id)}
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          Move to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="rounded-xl border bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 sticky top-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}

              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="pt-4">
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-grow">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Promo code"
                      className="pl-10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={applyPromoCode}
                    disabled={isApplyingPromo || !promoCode}
                    className="shrink-0"
                  >
                    {isApplyingPromo ? "Applying..." : "Apply"}
                  </Button>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 h-auto rounded-xl shadow-md hover:shadow-lg transition-all">
                  Proceed to Checkout
                </Button>
              </div>

              <div className="bg-white rounded-lg p-4 mt-4 border">
                <p className="text-sm text-center text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                <Image
                  src="/placeholder.svg"
                  alt="Visa"
                  width={40}
                  height={25}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                <Image
                  src="/placeholder.svg"
                  alt="Mastercard"
                  width={40}
                  height={25}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                <Image
                  src="/placeholder.svg"
                  alt="PayPal"
                  width={40}
                  height={25}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                <Image
                  src="/placeholder.svg"
                  alt="Apple Pay"
                  width={40}
                  height={25}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
