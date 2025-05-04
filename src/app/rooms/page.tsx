import { getRooms } from "@/services/roomService"
import RoomCard from "@/components/RoomCard"
import RoomFilter from "@/components/RoomFilter"

export default async function RoomsPage() {
  const rooms = await getRooms()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Rooms & Suites</h1>

      <RoomFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  )
}
