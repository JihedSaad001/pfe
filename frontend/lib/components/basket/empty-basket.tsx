import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function EmptyBasket() {
  return (
    <div className="my-12 flex flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-muted p-6">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">Your basket is empty</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        Looks like you haven't added anything to your basket yet. Browse our rooms, events, or dining options to find
        something you'll love.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/rooms">Browse Rooms</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    </div>
  )
}
