// This is a mock service that simulates API calls
// In a real application, this would make actual API requests to your backend

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  image: string
  location: string
  price: number
  capacity: number
  featured?: boolean
}

interface GetEventsOptions {
  featured?: boolean
  limit?: number
  date?: string
}

// Mock data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Gala Dinner",
    description: "Join us for an elegant evening of fine dining and entertainment.",
    date: "2023-07-15",
    time: "19:00",
    image: "/placeholder.svg?height=400&width=600",
    location: "Grand Ballroom",
    price: 150,
    capacity: 200,
    featured: true,
  },
  {
    id: "2",
    title: "Wine Tasting Experience",
    description: "Sample premium wines from around the world with our sommelier.",
    date: "2023-07-22",
    time: "18:00",
    image: "/placeholder.svg?height=400&width=600",
    location: "Wine Cellar",
    price: 85,
    capacity: 30,
    featured: true,
  },
  {
    id: "3",
    title: "Wedding Showcase",
    description: "Explore our wedding venues and meet with our event planners.",
    date: "2023-08-05",
    time: "11:00",
    image: "/placeholder.svg?height=400&width=600",
    location: "Garden Terrace",
    price: 0,
    capacity: 100,
    featured: true,
  },
  {
    id: "4",
    title: "Business Conference",
    description: "Annual business leadership conference with keynote speakers.",
    date: "2023-09-10",
    time: "09:00",
    image: "/placeholder.svg?height=400&width=600",
    location: "Conference Center",
    price: 299,
    capacity: 500,
    featured: false,
  },
  {
    id: "5",
    title: "Cooking Class with Chef Marco",
    description: "Learn to prepare gourmet dishes with our executive chef.",
    date: "2023-07-29",
    time: "15:00",
    image: "/placeholder.svg?height=400&width=600",
    location: "Hotel Kitchen",
    price: 120,
    capacity: 20,
    featured: false,
  },
  {
    id: "6",
    title: "Jazz Night",
    description: "Enjoy an evening of live jazz music and cocktails.",
    date: "2023-08-12",
    time: "20:00",
    image: "/placeholder.svg?height=400&width=600",
    location: "Skyline Lounge",
    price: 45,
    capacity: 80,
    featured: false,
  },
  {
    id: "7",
    title: "Wellness Retreat Weekend",
    description: "A weekend of yoga, meditation, and wellness activities.",
    date: "2023-08-19",
    time: "09:00",
    image: "/placeholder.svg?height=400&width=600",
    location: "Spa & Wellness Center",
    price: 350,
    capacity: 40,
    featured: false,
  },
  {
    id: "8",
    title: "Charity Gala",
    description: "Annual charity fundraiser with dinner and auction.",
    date: "2023-10-05",
    time: "18:30",
    image: "/placeholder.svg?height=400&width=600",
    location: "Grand Ballroom",
    price: 200,
    capacity: 300,
    featured: false,
  },
]

export async function getEvents(options: GetEventsOptions = {}): Promise<Event[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredEvents = [...mockEvents]

  if (options.featured !== undefined) {
    filteredEvents = filteredEvents.filter((event) => event.featured === options.featured)
  }

  if (options.date) {
    filteredEvents = filteredEvents.filter((event) => event.date === options.date)
  }

  if (options.limit) {
    filteredEvents = filteredEvents.slice(0, options.limit)
  }

  return filteredEvents
}

export async function getEvent(id: string): Promise<Event | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const event = mockEvents.find((event) => event.id === id)
  return event || null
}
