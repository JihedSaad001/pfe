import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Book your stay now and enjoy exclusive rates and special offers for direct bookings.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/rooms">
            <Button size="lg" variant="secondary">
              Explore Rooms
            </Button>
          </Link>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
