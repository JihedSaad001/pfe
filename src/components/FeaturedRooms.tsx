import { getRooms } from "@/services/roomService"
import RoomCard from "@/components/RoomCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function FeaturedRooms() {
  const rooms = await getRooms({ featured: true, limit: 3 })

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Rooms & Suites</h2>
          <p className="text-muted-foreground">Experience the best accommodations we have to offer</p>
        </div>
        <Link href="/rooms" className="mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            View All Rooms
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  )
}
