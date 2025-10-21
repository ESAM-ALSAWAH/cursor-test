import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

/**
 * Cart Item Type
 */
export interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  sku: string
  moq: number
}

/**
 * Cart State Atom (persisted to localStorage)
 */
export const cartAtom = atomWithStorage<CartItem[]>('cart', [])

/**
 * Cart Count Atom (derived)
 */
export const cartCountAtom = atom((get) => {
  const cart = get(cartAtom)
  return cart.reduce((total, item) => total + item.quantity, 0)
})

/**
 * Cart Total Atom (derived)
 */
export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom)
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
})

/**
 * Add to Cart Atom (write-only)
 */
export const addToCartAtom = atom(
  null,
  (get, set, item: CartItem) => {
    const cart = get(cartAtom)
    const existingItem = cart.find((i) => i.productId === item.productId)

    if (existingItem) {
      // Update quantity if item exists
      set(
        cartAtom,
        cart.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      )
    } else {
      // Add new item
      set(cartAtom, [...cart, item])
    }
  }
)

/**
 * Remove from Cart Atom (write-only)
 */
export const removeFromCartAtom = atom(
  null,
  (get, set, productId: string) => {
    const cart = get(cartAtom)
    set(
      cartAtom,
      cart.filter((item) => item.productId !== productId)
    )
  }
)

/**
 * Update Cart Item Quantity Atom (write-only)
 */
export const updateCartQuantityAtom = atom(
  null,
  (get, set, { productId, quantity }: { productId: string; quantity: number }) => {
    const cart = get(cartAtom)
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      set(
        cartAtom,
        cart.filter((item) => item.productId !== productId)
      )
    } else {
      set(
        cartAtom,
        cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      )
    }
  }
)

/**
 * Clear Cart Atom (write-only)
 */
export const clearCartAtom = atom(null, (get, set) => {
  set(cartAtom, [])
})
