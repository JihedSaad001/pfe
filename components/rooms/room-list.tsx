import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Wifi, Tv, Coffee, Users, ArrowRight } from "lucide-react"
import { getRooms } from "@/lib/api/rooms"
import { formatCurrency } from "@/lib/utils"

interface RoomListProps {
  checkIn: string
  checkOut: string
  guests: string
  type: string
  page: number
}

export default async function RoomList({ checkIn, checkOut, guests, type, page }: RoomListProps) {
  const rooms = await getRooms({
    checkIn,
    checkOut,
    guests,
    type,
    page,
  })

  if (!rooms.length) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold">No Rooms Found</h3>
        <p className="mb-6 text-muted-foreground">Try adjusting your search criteria or dates.</p>
        <Button asChild>
          <Link href="/rooms">Reset Filters</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
              <div className="relative h-[200px] w-full md:h-full">
                <Image
                  src={room.image || "/placeholder.svg?height=300&width=500"}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                {room.isPromoted && <Badge className="absolute left-2 top-2">Featured</Badge>}
              </div>
              <CardContent className="flex flex-col p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <div className="text-xl font-bold">
                    {formatCurrency(room.price)}
                    <span className="text-sm font-normal text-muted-foreground">/night</span>
                  </div>
                </div>
                <p className="mb-6 text-muted-foreground">{room.description}</p>
                <div className="mb-6 flex flex-wrap gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Max {room.maxGuests} guests
                  </Badge>
                  {room.amenities.includes("Free Wi-Fi") && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Wifi className="h-3 w-3" />
                      Free Wi-Fi
                    </Badge>
                  )}
                  {room.amenities.includes("TV") && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Tv className="h-3 w-3" />
                      Smart TV
                    </Badge>
                  )}
                  {room.amenities.includes("Coffee Maker") && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Coffee className="h-3 w-3" />
                      Coffee Maker
                    </Badge>
                  )}
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <Button asChild>
                    <Link
                      href={`/rooms/${room.id}${
                        checkIn && checkOut ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}` : ""
                      }`}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/rooms?${new URLSearchParams({
                ...(checkIn ? { checkIn } : {}),
                ...(checkOut ? { checkOut } : {}),
                ...(guests ? { guests } : {}),
                ...(type ? { type } : {}),
                page: Math.max(1, page - 1).toString(),
              })}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`/rooms?${new URLSearchParams({
                ...(checkIn ? { checkIn } : {}),
                ...(checkOut ? { checkOut } : {}),
                ...(guests ? { guests } : {}),
                ...(type ? { type } : {}),
                page: "1",
              })}`}
              isActive={page === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/rooms?${new URLSearchParams({
                ...(checkIn ? { checkIn } : {}),
                ...(checkOut ? { checkOut } : {}),
                ...(guests ? { guests } : {}),
                ...(type ? { type } : {}),
                page: (page + 1).toString(),
              })}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
