// This file interfaces with your backend API for rooms

export interface Room {
  id: string
  name: string
  description: string
  price: number
  image?: string
  type: "standard" | "deluxe" | "suite" | "penthouse"
  maxGuests: number
  amenities: string[]
  rating: number
  isPromoted?: boolean
}

export async function getRooms(params?: {
  checkIn?: string
  checkOut?: string
  guests?: string
  type?: string
  page?: number
}): Promise<Room[]> {
  // In a real app, this would call your backend API
  // For now, we'll return mock data

  // This would be a fetch to your backend
  // const res = await fetch(`/api/rooms?${new URLSearchParams(params as Record<string, string>)}`)
  // return res.json()

  // Mock data for demonstration
  return [
    {
      id: "1",
      name: "Deluxe Ocean View",
      description: "Spacious room with breathtaking ocean views and a private balcony.",
      price: 350,
      image: "/placeholder.svg?height=300&width=500",
      type: "deluxe",
      maxGuests: 2,
      amenities: ["Ocean View", "King Bed", "Mini Bar", "Free Wi-Fi", "Room Service"],
      rating: 4.8,
      isPromoted: true,
    },
    {
      id: "2",
      name: "Executive Suite",
      description: "Luxury suite with separate living area and premium amenities.",
      price: 550,
      image: "/placeholder.svg?height=300&width=500",
      type: "suite",
      maxGuests: 3,
      amenities: ["City View", "King Bed", "Living Area", "Jacuzzi", "Free Wi-Fi"],
      rating: 4.9,
    },
    {
      id: "3",
      name: "Standard Garden Room",
      description: "Comfortable room with garden views and essential amenities.",
      price: 250,
      image: "/placeholder.svg?height=300&width=500",
      type: "standard",
      maxGuests: 2,
      amenities: ["Garden View", "Queen Bed", "Free Wi-Fi", "Coffee Maker"],
      rating: 4.5,
    },
  ]
}

export async function getRoomById(id: string): Promise<Room | null> {
  // In a real app, this would call your backend API
  // const res = await fetch(`/api/rooms/${id}`)
  // if (!res.ok) return null
  // return res.json()

  // Mock data
  const rooms = await getRooms()
  return rooms.find((room) => room.id === id) || null
}

export async function getFeaturedRooms(): Promise<Room[]> {
  const rooms = await getRooms()
  return rooms.filter((room) => room.isPromoted)
}

export async function checkRoomAvailability(params: {
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
}): Promise<boolean> {
  // In a real app, this would check availability through your backend
  // const res = await fetch(`/api/rooms/${params.roomId}/availability`, {
  //   method: 'POST',
  //   body: JSON.stringify(params),
  //   headers: { 'Content-Type': 'application/json' }
  // })
  // return res.json()

  // Mock response (always available for demo)
  return true
}
