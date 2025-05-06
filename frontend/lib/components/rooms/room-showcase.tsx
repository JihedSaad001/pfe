import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { getFeaturedRooms } from "@/lib/api/rooms"

export default async function RoomShowcase() {
  const rooms = await getFeaturedRooms()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <Card key={room.id} className="overflow-hidden">
          <div className="relative">
            <Image
              src={room.image || "/placeholder.svg?height=300&width=500"}
              alt={room.name}
              width={500}
              height={300}
              className="aspect-[5/3] w-full object-cover"
            />
            {room.isPromoted && <Badge className="absolute left-2 top-2">Featured</Badge>}
          </div>
          <CardContent className="grid gap-2 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{room.name}</h3>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{room.rating}</span>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">{room.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="font-medium">
                {formatCurrency(room.price)} <span className="text-xs text-muted-foreground">/night</span>
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/rooms/${room.id}`}>
                  View Room <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
