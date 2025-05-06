"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar, Hotel } from "lucide-react"
import { useBasket } from "@/hooks/use-basket"
import { formatCurrency, formatDate } from "@/lib/utils"

interface BasketItemProps {
  item: {
    id: string
    type: "room" | "event" | "product"
    name: string
    price: number
    image?: string
    quantity: number
    dateFrom?: string
    dateTo?: string
  }
  onRemove: () => void
}

export default function BasketItem({ item, onRemove }: BasketItemProps) {
  const { updateQuantity } = useBasket()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (quantity: number) => {
    if (quantity < 1 || quantity > 10) return
    if (quantity === item.quantity) return

    setIsUpdating(true)
    try {
      await updateQuantity(item.id, quantity)
    } finally {
      setIsUpdating(false)
    }
  }

  const getItemLink = () => {
    if (item.type === "room") {
      return `/rooms/${item.id.split("-")[1]}`
    } else if (item.type === "event") {
      return `/events/${item.id.split("-")[1]}`
    } else {
      return `/products/${item.id.split("-")[1]}`
    }
  }

  return (
    <div className="flex flex-col gap-4 border-b py-6 sm:flex-row">
      <div className="relative aspect-square h-24 w-24 min-w-24 overflow-hidden rounded-md">
        <Image
          src={item.image || "/placeholder.svg?height=100&width=100"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <Link href={getItemLink()} className="text-lg font-semibold hover:underline">
            {item.name}
          </Link>
          <div className="font-medium">{formatCurrency(item.price)}</div>
        </div>

        {item.dateFrom && (
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            {item.type === "room" ? (
              <>
                <Hotel className="mr-1 h-4 w-4" />
                <span>
                  {formatDate(item.dateFrom)} to {formatDate(item.dateTo || "")}
                </span>
              </>
            ) : (
              <>
                <Calendar className="mr-1 h-4 w-4" />
                <span>{formatDate(item.dateFrom)}</span>
              </>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-4">
          {item.type === "product" ? (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
              >
                -
              </Button>
              <Input
                type="number"
                min="1"
                max="10"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value))}
                className="h-8 w-16 rounded-none text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= 10 || isUpdating}
              >
                +
              </Button>
            </div>
          ) : (
            <span className="text-muted-foreground">
              {item.type === "room" ? "Room booking" : "Event registration"}
            </span>
          )}
          <Button variant="ghost" size="sm" className="h-8 text-muted-foreground" onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
            <span className="ml-1 sr-only sm:not-sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
