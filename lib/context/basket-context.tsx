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
      const res = await fetch("/api/basket")
      if (res.ok) {
        const data = await res.json()
        setBasket(data)
      }
    } catch (error) {
      console.error("Failed to fetch basket:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBasket()
  }, [])

  const addItem = async (item: Omit<BasketItem, "quantity">) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/basket/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, quantity: 1 }),
      })

      if (res.ok) {
        await fetchBasket()
      }
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
      }
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
      }
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
      }
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
