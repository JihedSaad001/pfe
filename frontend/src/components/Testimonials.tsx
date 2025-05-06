import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "The service was impeccable and the room exceeded my expectations. Perfect for my business trip with great workspace and fast WiFi.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Family Vacation",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Our family had an amazing stay. The staff was incredibly accommodating to our children and the amenities were perfect for everyone.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Honeymoon",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "We couldn't have chosen a better place for our honeymoon. The romantic atmosphere and attention to detail made it unforgettable.",
      rating: 5,
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">What Our Guests Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Read testimonials from guests who have experienced our hospitality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
