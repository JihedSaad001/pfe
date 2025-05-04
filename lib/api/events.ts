// This file interfaces with your backend API for events

export interface Event {
  id: string
  name: string
  description: string
  date: string
  time: string
  price: number
  image?: string
  type: "conference" | "wedding" | "dinner" | "celebration" | "workshop"
  capacity: number
  location: string
}

export async function getEvents(params?: {
  date?: string
  type?: string
  page?: number
}): Promise<Event[]> {
  // In a real app, this would call your backend API
  // const res = await fetch(`/api/events?${new URLSearchParams(params as Record<string, string>)}`)
  // return res.json()

  // Mock data for demonstration
  return [
    {
      id: "1",
      name: "Wine Tasting Evening",
      description: "Experience an exquisite selection of wines paired with gourmet appetizers.",
      date: "2025-06-15",
      time: "19:00",
      price: 120,
      image: "/placeholder.svg?height=300&width=500",
      type: "dinner",
      capacity: 50,
      location: "Grand Ballroom",
    },
    {
      id: "2",
      name: "Executive Business Conference",
      description: "A premier networking event for business professionals.",
      date: "2025-07-10",
      time: "09:00",
      price: 350,
      image: "/placeholder.svg?height=300&width=500",
      type: "conference",
      capacity: 200,
      location: "Conference Center",
    },
    {
      id: "3",
      name: "Sunset Yoga Retreat",
      description: "Rejuvenate with a yoga session overlooking the ocean as the sun sets.",
      date: "2025-06-20",
      time: "17:30",
      price: 75,
      image: "/placeholder.svg?height=300&width=500",
      type: "workshop",
      capacity: 30,
      location: "Ocean Terrace",
    },
  ]
}

export async function getEventById(id: string): Promise<Event | null> {
  // In a real app, this would call your backend API
  // const res = await fetch(`/api/events/${id}`)
  // if (!res.ok) return null
  // return res.json()

  // Mock data
  const events = await getEvents()
  return events.find((event) => event.id === id) || null
}

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  const events = await getEvents()
  const now = new Date()

  return events
    .filter((event) => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit)
}

export async function checkEventAvailability(
  eventId: string,
  date: string,
): Promise<{
  available: boolean
  remainingSpots: number
}> {
  // In a real app, this would check availability through your backend
  // const res = await fetch(`/api/events/${eventId}/availability?date=${date}`)
  // return res.json()

  // Mock response
  return {
    available: true,
    remainingSpots: 15,
  }
}
