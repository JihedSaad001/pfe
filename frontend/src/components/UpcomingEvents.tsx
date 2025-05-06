import { getEvents } from "@/services/eventService"
import EventCard from "@/components/EventCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function UpcomingEvents() {
  const events = await getEvents({ featured: true, limit: 3 })

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground">Join us for special events and experiences</p>
        </div>
        <Link href="/events" className="mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
