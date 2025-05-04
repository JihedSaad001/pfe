"use client"

import { useContext } from "react"
import { BasketContext } from "@/context/basket-context"

export function useBasket() {
  const context = useContext(BasketContext)
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider")
  }
  return context
}
