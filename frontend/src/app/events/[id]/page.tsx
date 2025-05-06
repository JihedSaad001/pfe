import { getEvent } from "../../../services/eventService"
import Image from "next/image"
import { Button } from "../../../components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id)

  if (!event) {
    return <div className="container mx-auto px-4 py-12">Event not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="relative h-[400px] mb-6">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover rounded-lg" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Calendar className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <MapPin className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="font-medium">{event.location}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Users className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm text-muted-foreground">Capacity</span>
              <span className="font-medium">{event.capacity} people</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2>About This Event</h2>
            <p>{event.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed
              erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
              Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
            <h2>What to Expect</h2>
            <p>
              Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna
              non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis
              porttitor posuere. Praesent id metus massa, ut blandit odio.
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              {event.price > 0 ? (
                <>
                  <span className="text-2xl font-bold">${event.price}</span>
                  <span className="text-gray-500"> / person</span>
                </>
              ) : (
                <span className="text-lg font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  Free Event
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Attendees</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                </select>
              </div>

              <Button className="w-full">Register for Event</Button>

              <p className="text-xs text-muted-foreground text-center">
                {event.price > 0
                  ? "Registration fee is non-refundable within 48 hours of the event."
                  : "Registration is free but required for capacity planning."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
