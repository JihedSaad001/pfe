import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, Coffee, Bath, Users } from "lucide-react"

interface RoomCardProps {
  room: {
    id: string
    name: string
    description: string
    price: number
    image: string
    capacity: number
    amenities: string[]
  }
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[200px]">
        <Image
          src={room.image || "/placeholder.svg?height=400&width=600"}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{room.name}</h3>
          <div>
            <span className="text-lg font-bold">${room.price}</span>
            <span className="text-muted-foreground text-sm"> / night</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">{room.description}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {room.capacity} Guests
          </div>
          {room.amenities.includes("wifi") && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Wifi className="h-4 w-4 mr-1" />
              WiFi
            </div>
          )}
          {room.amenities.includes("breakfast") && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Coffee className="h-4 w-4 mr-1" />
              Breakfast
            </div>
          )}
          {room.amenities.includes("bathtub") && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Bath className="h-4 w-4 mr-1" />
              Bathtub
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-4">
        <Link href={`/rooms/${room.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Link href={`/booking?room=${room.id}`} className="flex-1">
          <Button className="w-full">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
