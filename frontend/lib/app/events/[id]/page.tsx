import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import EventDetail from "@/components/events/event-detail"
import EventRegistration from "@/components/events/event-registration"
import Loading from "@/app/loading"
import { getEventById } from "@/lib/api/events"

interface EventPageProps {
  params: {
    id: string
  }
  searchParams?: {
    date?: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventById(params.id)

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: `${event.name} | Luxury Hotel & Resort`,
    description: event.description,
  }
}

export default async function EventPage({ params, searchParams }: EventPageProps) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  const date = searchParams?.date || ""

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Events
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Loading />}>
        <EventDetail event={event} />
      </Suspense>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Reserve Your Spot</h2>
        <Suspense fallback={<Loading />}>
          <EventRegistration eventId={params.id} defaultDate={date} />
        </Suspense>
      </div>
    </div>
  )
}
