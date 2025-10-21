import { Navigation } from "@/components/navigation"
import { CartSheet } from "@/components/cart-sheet"

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <CartSheet />
        </div>
      </main>
    </div>
  )
}
