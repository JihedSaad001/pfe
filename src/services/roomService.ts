// This is a mock service that simulates API calls
// In a real application, this would make actual API requests to your backend

interface Room {
  id: string
  name: string
  description: string
  price: number
  image: string
  capacity: number
  amenities: string[]
  featured?: boolean
  type: string
  status: string
}

interface GetRoomsOptions {
  featured?: boolean
  limit?: number
  type?: string
  status?: string
}

// Mock data
const mockRooms: Room[] = [
  {
    id: "1",
    name: "Deluxe King Room",
    description: "Spacious room with king-sized bed, work desk, and city views.",
    price: 199,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 2,
    amenities: ["wifi", "breakfast", "tv", "ac"],
    featured: true,
    type: "Deluxe",
    status: "available",
  },
  {
    id: "2",
    name: "Executive Suite",
    description: "Luxurious suite with separate living area and premium amenities.",
    price: 349,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 2,
    amenities: ["wifi", "breakfast", "bathtub", "minibar", "workspace"],
    featured: true,
    type: "Suite",
    status: "available",
  },
  {
    id: "3",
    name: "Family Room",
    description: "Comfortable room for families with two queen beds and extra space.",
    price: 279,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 4,
    amenities: ["wifi", "breakfast", "tv", "ac"],
    featured: true,
    type: "Standard",
    status: "available",
  },
  {
    id: "4",
    name: "Presidential Suite",
    description: "Our most luxurious accommodation with panoramic views and butler service.",
    price: 599,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 2,
    amenities: ["wifi", "breakfast", "bathtub", "minibar", "workspace", "butler", "oceanview"],
    featured: false,
    type: "Suite",
    status: "available",
  },
  {
    id: "5",
    name: "Twin Room",
    description: "Cozy room with two single beds, perfect for friends traveling together.",
    price: 179,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 2,
    amenities: ["wifi", "tv", "ac"],
    featured: false,
    type: "Standard",
    status: "available",
  },
  {
    id: "6",
    name: "Ocean View Suite",
    description: "Elegant suite with breathtaking ocean views and premium amenities.",
    price: 429,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 2,
    amenities: ["wifi", "breakfast", "bathtub", "minibar", "oceanview", "balcony"],
    featured: false,
    type: "Suite",
    status: "available",
  },
  {
    id: "7",
    name: "Penthouse Suite",
    description: "Exclusive top-floor suite with panoramic views and luxury furnishings.",
    price: 899,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 4,
    amenities: ["wifi", "breakfast", "bathtub", "minibar", "workspace", "butler", "cityview", "balcony"],
    featured: false,
    type: "Penthouse",
    status: "available",
  },
  {
    id: "8",
    name: "Standard Queen Room",
    description: "Comfortable room with a queen-sized bed and essential amenities.",
    price: 149,
    image: "/placeholder.svg?height=400&width=600",
    capacity: 2,
    amenities: ["wifi", "tv", "ac"],
    featured: false,
    type: "Standard",
    status: "available",
  },
]

export async function getRooms(options: GetRoomsOptions = {}): Promise<Room[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredRooms = [...mockRooms]

  if (options.featured !== undefined) {
    filteredRooms = filteredRooms.filter((room) => room.featured === options.featured)
  }

  if (options.type) {
    filteredRooms = filteredRooms.filter((room) => room.type === options.type)
  }

  if (options.status) {
    filteredRooms = filteredRooms.filter((room) => room.status === options.status)
  }

  if (options.limit) {
    filteredRooms = filteredRooms.slice(0, options.limit)
  }

  return filteredRooms
}

export async function getRoom(id: string): Promise<Room | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const room = mockRooms.find((room) => room.id === id)
  return room || null
}
