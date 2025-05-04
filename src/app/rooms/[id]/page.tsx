import { getRoom } from "@/services/roomService"
import Image from "next/image"
import RoomAmenities from "@/components/RoomAmenities"
import RoomBookingForm from "@/components/RoomBookingForm"

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id)

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
          <div className="relative h-[400px] mb-6">
            <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover rounded-lg" />
          </div>

          <div className="prose max-w-none mb-8">
            <p>{room.description}</p>
          </div>

          <RoomAmenities amenities={room.amenities} />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <span className="text-2xl font-bold">${room.price}</span>
              <span className="text-gray-500"> / night</span>
            </div>

            <RoomBookingForm roomId={room.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
