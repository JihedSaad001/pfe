import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Wifi, Car, Dumbbell, SpadeIcon as Spa, Coffee } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Utensils className="h-10 w-10" />,
      title: "Fine Dining",
      description: "Experience gourmet cuisine at our award-winning restaurants.",
    },
    {
      icon: <Wifi className="h-10 w-10" />,
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary high-speed internet throughout the hotel.",
    },
    {
      icon: <Car className="h-10 w-10" />,
      title: "Valet Parking",
      description: "Enjoy convenient valet parking service for all hotel guests.",
    },
    {
      icon: <Dumbbell className="h-10 w-10" />,
      title: "Fitness Center",
      description: "Maintain your fitness routine in our state-of-the-art gym.",
    },
    {
      icon: <Spa className="h-10 w-10" />,
      title: "Luxury Spa",
      description: "Relax and rejuvenate with our premium spa treatments.",
    },
    {
      icon: <Coffee className="h-10 w-10" />,
      title: "Room Service",
      description: "Enjoy 24/7 room service with a wide selection of food and beverages.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Our Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enjoy premium amenities and services designed to make your stay exceptional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="mb-4 text-primary">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
