import { Suspense } from "react"
import type { Metadata } from "next"
import RoomSearch from "@/components/rooms/room-search"
import RoomList from "@/components/rooms/room-list"
import Loading from "@/app/loading"

export const metadata: Metadata = {
  title: "Rooms & Suites | Luxury Hotel & Resort",
  description: "Browse our luxury accommodations and book your perfect stay",
}

export default function RoomsPage({
  searchParams,
}: {
  searchParams?: {
    checkIn?: string
    checkOut?: string
    guests?: string
    page?: string
    type?: string
  }
}) {
  const checkIn = searchParams?.checkIn || ""
  const checkOut = searchParams?.checkOut || ""
  const guests = searchParams?.guests || "1"
  const page = Number(searchParams?.page) || 1
  const type = searchParams?.type || ""

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Rooms & Suites</h1>

      <RoomSearch
        defaultValues={{
          checkIn,
          checkOut,
          guests,
          type,
        }}
      />

      <Suspense fallback={<Loading />}>
        <RoomList checkIn={checkIn} checkOut={checkOut} guests={guests} page={page} type={type} />
      </Suspense>
    </div>
  )
}
