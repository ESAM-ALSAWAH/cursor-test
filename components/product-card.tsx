"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { addToCartAtom } from "@/store/cart"
import type { CartItem } from "@/store/cart"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  sku: string
  moq: number
  stock: number
  rating?: number
  category?: string
}

interface ProductCardProps {
  product: Product
}

/**
 * Animated Product Card Component
 * Displays product information with add-to-cart functionality
 */
export function ProductCard({ product }: ProductCardProps) {
  const [, addToCart] = useAtom(addToCartAtom)

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: product.moq,
      sku: product.sku,
      moq: product.moq,
    }
    addToCart(cartItem)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {product.category && (
              <Badge className="absolute top-3 left-3" variant="secondary">
                {product.category}
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="absolute top-3 right-3" variant="destructive">
                Low Stock
              </Badge>
            )}
          </div>
        </Link>

        <CardContent className="flex-1 p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-2">
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
              </div>
            )}
            <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm text-muted-foreground">per unit</span>
            </div>
            <p className="text-xs text-muted-foreground">
              MOQ: {product.moq} units
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
