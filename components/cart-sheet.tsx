"use client"

import Image from "next/image"
import Link from "next/link"
import { useAtom } from "jotai"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import {
  cartAtom,
  cartTotalAtom,
  removeFromCartAtom,
  updateCartQuantityAtom,
} from "@/store/cart"

/**
 * Shopping Cart Component
 * Displays cart items with quantity controls
 */
export function CartSheet() {
  const [cart] = useAtom(cartAtom)
  const [total] = useAtom(cartTotalAtom)
  const [, removeFromCart] = useAtom(removeFromCartAtom)
  const [, updateQuantity] = useAtom(updateCartQuantityAtom)

  const handleIncrement = (productId: string, currentQuantity: number, moq: number) => {
    updateQuantity({ productId, quantity: currentQuantity + moq })
  }

  const handleDecrement = (productId: string, currentQuantity: number, moq: number) => {
    const newQuantity = currentQuantity - moq
    if (newQuantity >= moq) {
      updateQuantity({ productId, quantity: newQuantity })
    } else {
      removeFromCart(productId)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add items to get started
        </p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate mb-1">{item.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">
                SKU: {item.sku}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => handleDecrement(item.productId, item.quantity, item.moq)}
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="text-sm font-medium min-w-[2rem] text-center">
                  {item.quantity}
                </span>

                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => handleIncrement(item.productId, item.quantity, item.moq)}
                >
                  <Plus className="h-3 w-3" />
                </Button>

                <Badge variant="outline" className="ml-auto">
                  {formatCurrency(item.price * item.quantity)}
                </Badge>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => removeFromCart(item.productId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="border-t p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(total)}
          </span>
        </div>

        <Link href="/checkout" className="block">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </Link>

        <Link href="/products" className="block">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
