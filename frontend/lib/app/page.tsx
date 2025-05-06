import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bookmark, Utensils, Calendar, SparklesIcon as Champagne } from "lucide-react"
import RoomShowcase from "@/components/rooms/room-showcase"
import EventsHighlight from "@/components/events/events-highlight"
import Loading from "./loading"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Luxury hotel view"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Experience Luxury <br /> Like Never Before
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Indulge in our world-class accommodations, exquisite dining, and unforgettable events
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/rooms">
                Book a Room <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-black/30 text-white" asChild>
              <Link href="/events">
                Explore Events <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Booking */}
      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="rounded-xl bg-card p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold">Quick Booking</h2>
          <Suspense fallback={<Loading />}>
            <div className="grid gap-6 md:grid-cols-[1fr_1fr_auto]">
              <div className="grid gap-2">
                <label htmlFor="check-in" className="text-sm font-medium">
                  Check-in
                </label>
                <input
                  type="date"
                  id="check-in"
                  className="rounded-md border border-input bg-background px-3 py-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="check-out" className="text-sm font-medium">
                  Check-out
                </label>
                <input
                  type="date"
                  id="check-out"
                  className="rounded-md border border-input bg-background px-3 py-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <Button className="self-end" size="lg">
                Search Availability
              </Button>
            </div>
          </Suspense>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold">Our Offerings</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Bookmark className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Luxury Rooms</h3>
            <p className="text-muted-foreground">
              Elegantly designed rooms and suites with premium amenities for a comfortable stay.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Utensils className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Fine Dining</h3>
            <p className="text-muted-foreground">
              Exquisite culinary experiences from world-class chefs using locally sourced ingredients.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Champagne className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Special Events</h3>
            <p className="text-muted-foreground">
              Host memorable celebrations, conferences, and gatherings in our elegant venues.
            </p>
          </div>
        </div>
      </section>

      {/* Room Showcase */}
      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">Featured Accommodations</h2>
          <Button variant="outline" asChild>
            <Link href="/rooms">
              View All Rooms <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<Loading />}>
          <RoomShowcase />
        </Suspense>
      </section>

      {/* Events Highlight */}
      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Button variant="outline" asChild>
            <Link href="/events">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<Loading />}>
          <EventsHighlight />
        </Suspense>
      </section>
    </div>
  )
}
