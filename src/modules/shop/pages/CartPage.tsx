'use client';

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"

import { motion } from "framer-motion"
import { Button } from "@/modules/shared/components/ui/button";
import { Separator } from "@/modules/shared/components/ui/separator";
import Link from "next/link";



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
  ]

export function CartPage() {
    const [items, setItems] = useState(initialItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-sm mb-6">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 h-auto rounded-xl shadow-md hover:shadow-lg transition-all">
            <Link href='/'/> Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
      <div className="md:col-span-2">
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-red-600" />
              Your Shopping Bag
            </h2>
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-rose-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-1">Color: {item.color}</p>
                    <p className="text-red-600 font-medium mb-4">${item.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="mx-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right sm:min-w-[100px] flex sm:block items-center justify-between mt-4 sm:mt-0">
                    <span className="text-sm text-muted-foreground sm:hidden">Subtotal:</span>
                    <p className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="pt-4">
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 h-auto rounded-xl shadow-md hover:shadow-lg transition-all">
                Proceed to Checkout
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 mt-4 border">
              <p className="text-sm text-center text-muted-foreground">Shipping and taxes calculated at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}