import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import { getEvents } from "@/lib/api/events"
import { formatCurrency, formatDate, formatTime } from "@/lib/utils"

interface EventListProps {
  date: string
  type: string
  page: number
}

export default async function EventList({ date, type, page }: EventListProps) {
  const events = await getEvents({
    date,
    type,
    page,
  })

  if (!events.length) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold">No Events Found</h3>
        <p className="mb-6 text-muted-foreground">Try adjusting your search criteria or date.</p>
        <Button asChild>
          <Link href="/events">Reset Filters</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
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
              <Badge className="absolute left-2 top-2" variant="secondary">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
            <CardContent className="grid gap-4 p-6">
              <div>
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <time>{formatTime(event.time)}</time>
                  </div>
                </div>
              </div>
              <p className="line-clamp-2 text-muted-foreground">{event.description}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Capacity: {event.capacity}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-medium">
                  {formatCurrency(event.price)}
                  <span className="text-xs text-muted-foreground">/person</span>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/events/${event.id}${date ? `?date=${date}` : ""}`}>
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/events?${new URLSearchParams({
                ...(date ? { date } : {}),
                ...(type ? { type } : {}),
                page: Math.max(1, page - 1).toString(),
              })}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`/events?${new URLSearchParams({
                ...(date ? { date } : {}),
                ...(type ? { type } : {}),
                page: "1",
              })}`}
              isActive={page === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/events?${new URLSearchParams({
                ...(date ? { date } : {}),
                ...(type ? { type } : {}),
                page: (page + 1).toString(),
              })}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
