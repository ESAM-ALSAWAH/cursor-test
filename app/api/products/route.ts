import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/products
 * Fetch products with optional filtering and pagination
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Build filter conditions
    const where: any = {
      status: "ACTIVE",
    }

    if (category) {
      where.category = { slug: category }
    }

    if (minPrice || maxPrice) {
      where.basePrice = {}
      if (minPrice) where.basePrice.gte = parseFloat(minPrice)
      if (maxPrice) where.basePrice.lte = parseFloat(maxPrice)
    }

    // Fetch products with relations
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          supplier: {
            select: {
              businessName: true,
              verified: true,
              rating: true,
            },
          },
          pricingTiers: {
            orderBy: {
              minQuantity: "asc",
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/products
 * Create a new product (Supplier/Admin only)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      sku,
      name,
      description,
      slug,
      images,
      categoryId,
      supplierId,
      basePrice,
      stock,
      moq,
      unit,
      pricingTiers,
    } = body

    // Create product with pricing tiers
    const product = await prisma.product.create({
      data: {
        sku,
        name,
        description,
        slug,
        images,
        categoryId,
        supplierId,
        basePrice,
        stock,
        moq,
        unit,
        pricingTiers: {
          create: pricingTiers,
        },
      },
      include: {
        pricingTiers: true,
        category: true,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}
