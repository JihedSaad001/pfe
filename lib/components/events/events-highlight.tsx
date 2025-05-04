import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { getUpcomingEvents } from "@/lib/api/events"

export default async function EventsHighlight() {
  const events = await getUpcomingEvents()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="relative">
            <Image
              src={event.image || "/placeholder.svg?height=300&width=500"}
              alt={event.name}
              width={500}
              height={300}
              className="aspect-[5/3] w-full object-cover"
            />
          </div>
          <CardContent className="grid gap-2 p-4">
            <h3 className="font-semibold">{event.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
            <Button size="sm" className="mt-2 justify-self-start" variant="outline" asChild>
              <Link href={`/events/${event.id}`}>
                View Event <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
