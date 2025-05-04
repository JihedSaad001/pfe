import Hero from "../components/Hero"
import FeaturedRooms from "../components/FeaturedRooms"
import Services from "../components/Services"
import UpcomingEvents from "../components/UpcomingEvents"
import Testimonials from "../components/Testimonials"
import CTASection from "../components/CTASection"
import React from "react"

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <FeaturedRooms />
      <Services />
      <UpcomingEvents />
      <Testimonials />
      <CTASection />
    </div>
  )
}
