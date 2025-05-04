"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

interface BasketItem {
  id: string
  type: "room" | "event" | "product"
  name: string
  price: number
  image?: string
  quantity: number
  dateFrom?: string
  dateTo?: string
}

interface Basket {
  id: string
  items: BasketItem[]
}

interface BasketContextType {
  basket: Basket
  addItem: (item: Omit<BasketItem, "quantity">) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  removeItem: (id: string) => Promise<void>
  clearBasket: () => Promise<void>
  isLoading: boolean
}

export const BasketContext = createContext<BasketContextType>({
  basket: { id: "", items: [] },
  addItem: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearBasket: async () => {},
  isLoading: true,
})

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<Basket>({ id: "", items: [] })
  const [isLoading, setIsLoading] = useState(true)

  const fetchBasket = async () => {
    try {
      // Try to fetch from API
      const res = await fetch("/api/basket")

      // Check if response is JSON
      const contentType = res.headers.get("content-type")
      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json()
        setBasket(data)
      } else {
        // If API is not available or returns non-JSON, use local storage as fallback
        const storedBasket = localStorage.getItem("hotel-basket")
        if (storedBasket) {
          setBasket(JSON.parse(storedBasket))
        } else {
          // Initialize with empty basket
          setBasket({ id: "local-basket", items: [] })
          localStorage.setItem("hotel-basket", JSON.stringify({ id: "local-basket", items: [] }))
        }
        console.warn("API endpoint not available, using local storage fallback")
      }
    } catch (error) {
      console.error("Failed to fetch basket:", error)
      // Initialize with empty basket on error
      setBasket({ id: "local-basket", items: [] })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBasket()
  }, [])

  // Add this useEffect to handle browser storage
  useEffect(() => {
    // Skip during SSR
    if (typeof window === "undefined") return

    // Initialize localStorage listener for cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "hotel-basket" && e.newValue) {
        try {
          setBasket(JSON.parse(e.newValue))
        } catch (error) {
          console.error("Failed to parse basket from storage", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const addItem = async (item: Omit<BasketItem, "quantity">) => {
    setIsLoading(true)
    try {
      // Try API first
      const res = await fetch("/api/basket/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, quantity: 1 }),
      })

      if (res.ok) {
        await fetchBasket()
      } else {
        // Fallback to local storage
        const newItem = { ...item, quantity: 1 }
        const updatedItems = [...basket.items, newItem]
        const updatedBasket = { ...basket, items: updatedItems }
        setBasket(updatedBasket)
        localStorage.setItem("hotel-basket", JSON.stringify(updatedBasket))
      }
    } catch (error) {
      // Fallback to local storage on error
      const newItem = { ...item, quantity: 1 }
      const updatedItems = [...basket.items, newItem]
      const updatedBasket = { ...basket, items: updatedItems }
      setBasket(updatedBasket)
      localStorage.setItem("hotel-basket", JSON.stringify(updatedBasket))
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/basket/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      })

      if (res.ok) {
        await fetchBasket()
      } else {
        // Fallback to local storage
        const updatedItems = basket.items.map((item) => (item.id === id ? { ...item, quantity } : item))
        const updatedBasket = { ...basket, items: updatedItems }
        setBasket(updatedBasket)
        localStorage.setItem("hotel-basket", JSON.stringify(updatedBasket))
      }
    } catch (error) {
      // Fallback to local storage on error
      const updatedItems = basket.items.map((item) => (item.id === id ? { ...item, quantity } : item))
      const updatedBasket = { ...basket, items: updatedItems }
      setBasket(updatedBasket)
      localStorage.setItem("hotel-basket", JSON.stringify(updatedBasket))
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/basket/items/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        await fetchBasket()
      } else {
        // Fallback to local storage
        const updatedItems = basket.items.filter((item) => item.id !== id)
        const updatedBasket = { ...basket, items: updatedItems }
        setBasket(updatedBasket)
        localStorage.setItem("hotel-basket", JSON.stringify(updatedBasket))
      }
    } catch (error) {
      // Fallback to local storage on error
      const updatedItems = basket.items.filter((item) => item.id !== id)
      const updatedBasket = { ...basket, items: updatedItems }
      setBasket(updatedBasket)
      localStorage.setItem("hotel-basket", JSON.stringify(updatedBasket))
    } finally {
      setIsLoading(false)
    }
  }

  const clearBasket = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/basket", {
        method: "DELETE",
      })

      if (res.ok) {
        setBasket({ id: basket.id, items: [] })
      } else {
        // Fallback to local storage
        const emptyBasket = { id: "local-basket", items: [] }
        setBasket(emptyBasket)
        localStorage.setItem("hotel-basket", JSON.stringify(emptyBasket))
      }
    } catch (error) {
      // Fallback to local storage on error
      const emptyBasket = { id: "local-basket", items: [] }
      setBasket(emptyBasket)
      localStorage.setItem("hotel-basket", JSON.stringify(emptyBasket))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <BasketContext.Provider
      value={{
        basket,
        addItem,
        updateQuantity,
        removeItem,
        clearBasket,
        isLoading,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}
