import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wifi, Tv, Coffee, Users, Bath, BedDouble, UtensilsCrossed, Waves, SunSnow, Car, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Room } from "@/lib/api/rooms"

interface RoomDetailProps {
  room: Room
}

export default function RoomDetail({ room }: RoomDetailProps) {
  const amenityIcons: Record<string, React.ReactNode> = {
    "King Bed": <BedDouble className="h-5 w-5" />,
    "Queen Bed": <BedDouble className="h-5 w-5" />,
    "Ocean View": <Waves className="h-5 w-5" />,
    "City View": <Car className="h-5 w-5" />,
    "Garden View": <Waves className="h-5 w-5" />,
    "Mini Bar": <UtensilsCrossed className="h-5 w-5" />,
    "Free Wi-Fi": <Wifi className="h-5 w-5" />,
    "Room Service": <UtensilsCrossed className="h-5 w-5" />,
    "Coffee Maker": <Coffee className="h-5 w-5" />,
    Jacuzzi: <Bath className="h-5 w-5" />,
    TV: <Tv className="h-5 w-5" />,
    "Air Conditioning": <SunSnow className="h-5 w-5" />,
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Image
            src={room.image || "/placeholder.svg?height=600&width=800"}
            alt={room.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-3xl font-bold">{room.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(room.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({room.rating} out of 5)</span>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {formatCurrency(room.price)}
              <span className="text-sm font-normal text-muted-foreground">/night</span>
            </div>
          </div>

          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Accommodates up to {room.maxGuests} guests
          </Badge>

          <p className="text-muted-foreground">{room.description}</p>

          <Separator />

          <div>
            <h3 className="mb-3 text-lg font-medium">Room Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {room.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  {amenityIcons[amenity] || <Coffee className="h-5 w-5" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Room Details</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Room Type</h3>
            <p className="capitalize text-muted-foreground">{room.type}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Bed Configuration</h3>
            <p className="text-muted-foreground">{room.amenities.find((a) => a.includes("Bed")) || "King Bed"}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Room Size</h3>
            <p className="text-muted-foreground">
              {room.type === "standard"
                ? "28-32 m²"
                : room.type === "deluxe"
                  ? "35-40 m²"
                  : room.type === "suite"
                    ? "50-60 m²"
                    : "80-100 m²"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
