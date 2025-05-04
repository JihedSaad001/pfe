"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react"
import { useBasket } from "@/hooks/use-basket"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import BasketItem from "@/components/basket/basket-item"
import EmptyBasket from "@/components/basket/empty-basket"

export default function BasketPage() {
  const { basket, removeItem, clearBasket, isLoading } = useBasket()
  const { toast } = useToast()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)

    try {
      // Implement checkout logic
      toast({
        title: "Checkout successful",
        description: "Your order has been placed successfully!",
      })
      await clearBasket()
      router.push("/checkout/success")
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[50vh] items-center justify-center py-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  const totalItems = basket.items.length
  const subtotal = basket.items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="ml-4 text-3xl font-bold">Your Basket</h1>
      </div>

      {totalItems === 0 ? (
        <EmptyBasket />
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {basket.items.map((item) => (
              <BasketItem key={item.id} item={item} onRemove={() => removeItem(item.id)} />
            ))}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>{formatCurrency(subtotal * 0.1)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(subtotal * 1.1)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>
                <Button variant="outline" className="w-full" onClick={clearBasket}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Basket
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
