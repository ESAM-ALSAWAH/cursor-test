"use client"

import { Provider } from 'jotai'

/**
 * Root providers wrapper for the application
 * Currently includes Jotai Provider
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
