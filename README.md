# B2B eCommerce Platform

A modern, scalable B2B eCommerce platform built with **Next.js 14**, **TypeScript**, **Shadcn/UI**, **Jotai**, and **Framer Motion**.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router + Server Components)
- **Language:** TypeScript
- **UI Components:** Shadcn/UI
- **State Management:** Jotai (atomic state)
- **Animations:** Framer Motion
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS

## ✨ Features

### Core Functionality
- ✅ **Product Catalog** with advanced filtering and search
- ✅ **Shopping Cart** with tiered pricing support
- ✅ **B2B Specific Features:**
  - Minimum Order Quantities (MOQ)
  - Tiered pricing based on quantity
  - Bulk ordering capabilities
- ✅ **User Roles:** Admin, Buyer, Supplier
- ✅ **Order Management** system
- ✅ **Supplier Dashboard** for managing products
- ✅ **Admin Dashboard** with analytics

### Technical Features
- 🎨 Modern, responsive UI with Shadcn components
- ⚡ Server-side rendering for optimal SEO
- 🔄 Client-side state management with Jotai
- ✨ Smooth animations with Framer Motion
- 📱 Mobile-first responsive design
- 🔒 Type-safe API routes
- 🗄️ Robust database schema with Prisma

## 📁 Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── products/      # Product endpoints
│   │   └── orders/        # Order endpoints
│   ├── dashboard/         # Admin/Supplier dashboard
│   ├── products/          # Product catalog
│   ├── cart/              # Shopping cart
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── product-card.tsx  # Product display
│   ├── navigation.tsx    # Navigation bar
│   ├── cart-sheet.tsx    # Shopping cart
│   └── providers.tsx     # App providers
├── lib/                   # Utilities
│   ├── utils.ts          # Helper functions
│   └── prisma.ts         # Prisma client
├── store/                 # Jotai state atoms
│   ├── cart.ts           # Cart state
│   └── auth.ts           # Auth state
├── prisma/
│   └── schema.prisma     # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- pnpm/npm/yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd b2b-ecommerce
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/b2b_ecommerce"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. **Initialize the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Core Models
- **User** - Customers, suppliers, and admins
- **Supplier** - Supplier/vendor profiles
- **Product** - Product catalog with variants
- **PricingTier** - Tiered pricing for bulk orders
- **Category** - Product categorization
- **Cart** - Shopping cart items
- **Order** - Order records
- **OrderItem** - Individual order line items
- **Address** - Shipping addresses
- **Review** - Product reviews

## 🎯 Key Features Explained

### Tiered Pricing
Products support multiple pricing tiers based on quantity:
```typescript
{
  basePrice: 149.99,
  pricingTiers: [
    { minQuantity: 100, maxQuantity: 499, price: 139.99 },
    { minQuantity: 500, maxQuantity: 999, price: 129.99 },
    { minQuantity: 1000, maxQuantity: null, price: 119.99 }
  ]
}
```

### State Management with Jotai
```typescript
// Cart state is persisted to localStorage
const [cart] = useAtom(cartAtom)
const [cartTotal] = useAtom(cartTotalAtom)
const [, addToCart] = useAtom(addToCartAtom)
```

### Animations with Framer Motion
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -5 }}
>
  <ProductCard />
</motion.div>
```

## 📊 API Endpoints

### Products
- `GET /api/products` - List products with filters
- `POST /api/products` - Create product (Supplier/Admin)
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - List user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order status

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: "hsl(221.2 83.2% 53.3%)", // Blue
  secondary: "hsl(210 40% 96.1%)",    // Light gray
  // ... customize as needed
}
```

### Animation Styles
Modify `components/product-card.tsx` for different animations:
```typescript
// Change animation type
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ type: "spring", duration: 0.5 }}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
vercel deploy
```

### Environment Variables (Production)
Ensure these are set in your production environment:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## 📝 Development Roadmap

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-currency support
- [ ] Quote request system
- [ ] Supplier verification process
- [ ] Advanced search with Algolia
- [ ] Inventory management alerts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Jotai](https://jotai.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma](https://www.prisma.io/)

---

**Made with ❤️ by EcomForge**
