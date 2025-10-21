import { atom } from 'jotai'

/**
 * User Type
 */
export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'BUYER' | 'SUPPLIER'
  company?: string
  avatar?: string
}

/**
 * Auth State Atom
 */
export const userAtom = atom<User | null>(null)

/**
 * Is Authenticated Atom (derived)
 */
export const isAuthenticatedAtom = atom((get) => {
  return get(userAtom) !== null
})

/**
 * Is Admin Atom (derived)
 */
export const isAdminAtom = atom((get) => {
  const user = get(userAtom)
  return user?.role === 'ADMIN'
})

/**
 * Is Supplier Atom (derived)
 */
export const isSupplierAtom = atom((get) => {
  const user = get(userAtom)
  return user?.role === 'SUPPLIER'
})
