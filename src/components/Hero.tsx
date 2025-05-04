import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Luxury hotel"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Experience Luxury Like Never Before</h1>
          <p className="text-lg md:text-xl mb-8">
            Indulge in premium accommodations, world-class amenities, and exceptional service at our luxury hotel and
            resort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/rooms">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                Explore Rooms
              </Button>
            </Link>
            <Link href="/booking">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
