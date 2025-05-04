import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import RoomDetail from "@/components/rooms/room-detail"
import RoomAvailability from "@/components/rooms/room-availability"
import Loading from "@/app/loading"
import { getRoomById } from "@/lib/api/rooms"

interface RoomPageProps {
  params: {
    id: string
  }
  searchParams?: {
    checkIn?: string
    checkOut?: string
    guests?: string
  }
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const room = await getRoomById(params.id)

  if (!room) {
    return {
      title: "Room Not Found",
    }
  }

  return {
    title: `${room.name} | Luxury Hotel & Resort`,
    description: room.description,
  }
}

export default async function RoomPage({ params, searchParams }: RoomPageProps) {
  const room = await getRoomById(params.id)

  if (!room) {
    notFound()
  }

  const checkIn = searchParams?.checkIn || ""
  const checkOut = searchParams?.checkOut || ""
  const guests = searchParams?.guests || "1"

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/rooms">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Rooms
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Loading />}>
        <RoomDetail room={room} />
      </Suspense>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Check Availability</h2>
        <Suspense fallback={<Loading />}>
          <RoomAvailability
            roomId={params.id}
            defaultValues={{
              checkIn,
              checkOut,
              guests,
            }}
          />
        </Suspense>
      </div>
    </div>
  )
}
