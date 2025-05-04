import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { formatCurrency, formatDate, formatTime } from "@/lib/utils"
import type { Event } from "@/lib/api/events"

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <Badge className="absolute left-2 top-2" variant="secondary">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
          <Image
            src={event.image || "/placeholder.svg?height=600&width=800"}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <time dateTime={event.date}>{formatDate(event.date)}</time>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <time>{formatTime(event.time)}</time>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <span>Capacity: {event.capacity}</span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-2xl font-bold">
            {formatCurrency(event.price)}
            <span className="text-sm font-normal text-muted-foreground">/person</span>
          </div>

          <p className="text-muted-foreground">{event.description}</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Event Details</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Event Type</h3>
            <p className="capitalize text-muted-foreground">{event.type}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Duration</h3>
            <p className="text-muted-foreground">
              {event.type === "conference" ? "Full day" : event.type === "workshop" ? "3 hours" : "2 hours"}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Included</h3>
            <p className="text-muted-foreground">
              {event.type === "dinner" || event.type === "celebration"
                ? "Food & beverages"
                : event.type === "conference"
                  ? "Refreshments & lunch"
                  : "Refreshments"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
