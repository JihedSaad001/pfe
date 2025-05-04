import { Suspense } from "react"
import type { Metadata } from "next"
import EventSearch from "@/components/events/event-search"
import EventList from "@/components/events/event-list"
import Loading from "@/app/loading"

export const metadata: Metadata = {
  title: "Events | Luxury Hotel & Resort",
  description: "Discover and book special events at our luxury hotel",
}

export default function EventsPage({
  searchParams,
}: {
  searchParams?: {
    date?: string
    type?: string
    page?: string
  }
}) {
  const date = searchParams?.date || ""
  const type = searchParams?.type || ""
  const page = Number(searchParams?.page) || 1

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Events & Experiences</h1>

      <EventSearch
        defaultValues={{
          date,
          type,
        }}
      />

      <Suspense fallback={<Loading />}>
        <EventList date={date} type={type} page={page} />
      </Suspense>
    </div>
  )
}
