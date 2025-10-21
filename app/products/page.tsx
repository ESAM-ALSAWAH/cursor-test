import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/components/product-card"

// Mock data - in production, this would come from API/database
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Industrial Steel Pipes (100 Pack)",
    description: "High-quality steel pipes for industrial applications. Corrosion-resistant finish.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    sku: "PIPE-001",
    moq: 100,
    stock: 500,
    rating: 4.8,
    category: "Industrial",
  },
  {
    id: "2",
    name: "Premium Office Chairs (Bulk Order)",
    description: "Ergonomic office chairs with lumbar support. Perfect for corporate offices.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
    sku: "CHAIR-002",
    moq: 50,
    stock: 200,
    rating: 4.6,
    category: "Furniture",
  },
  {
    id: "3",
    name: "LED Light Bulbs (500 Pack)",
    description: "Energy-efficient LED bulbs. 10,000 hour lifespan. Warm white.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&q=80",
    sku: "LED-003",
    moq: 500,
    stock: 2000,
    rating: 4.9,
    category: "Electronics",
  },
  {
    id: "4",
    name: "Warehouse Shelving Units",
    description: "Heavy-duty industrial shelving. 2000 lbs capacity per shelf.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    sku: "SHELF-004",
    moq: 10,
    stock: 50,
    rating: 4.7,
    category: "Industrial",
  },
  {
    id: "5",
    name: "Safety Equipment Package",
    description: "Complete safety gear including helmets, vests, and gloves.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
    sku: "SAFE-005",
    moq: 100,
    stock: 300,
    rating: 4.8,
    category: "Safety",
  },
  {
    id: "6",
    name: "Laptop Computers (Business Grade)",
    description: "High-performance business laptops. Intel i7, 16GB RAM, 512GB SSD.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    sku: "LAPTOP-006",
    moq: 10,
    stock: 75,
    rating: 4.9,
    category: "Electronics",
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Product Catalog</h1>
          <p className="text-muted-foreground">
            Browse our extensive selection of wholesale products
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {["All", "Industrial", "Furniture", "Electronics", "Safety"].map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked={category === "All"} />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  {["Under $50", "$50 - $100", "$100 - $500", "Over $500"].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Low Stock</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {mockProducts.length} products
              </p>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Rating</option>
              </select>
            </div>

            <Suspense fallback={<div>Loading products...</div>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
