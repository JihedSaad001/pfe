// This is a mock service that simulates API calls
// In a real application, this would make actual API requests to your backend

interface Reservation {
  id: string
  roomId: string
  roomName: string
  roomType: string
  userId: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  specialRequests?: string
}

// Mock data
const mockReservations: Reservation[] = [
  {
    id: "res-001",
    roomId: "1",
    roomName: "Deluxe King Room",
    roomType: "Deluxe",
    userId: "1",
    checkInDate: "2023-07-20",
    checkOutDate: "2023-07-25",
    numberOfGuests: 2,
    totalPrice: 995,
    status: "confirmed",
    specialRequests: "Early check-in if possible",
  },
  {
    id: "res-002",
    roomId: "4",
    roomName: "Presidential Suite",
    roomType: "Suite",
    userId: "1",
    checkInDate: "2023-08-15",
    checkOutDate: "2023-08-20",
    numberOfGuests: 2,
    totalPrice: 2995,
    status: "pending",
  },
  {
    id: "res-003",
    roomId: "2",
    roomName: "Executive Suite",
    roomType: "Suite",
    userId: "1",
    checkInDate: "2023-03-15",
    checkOutDate: "2023-03-18",
    numberOfGuests: 2,
    totalPrice: 1047,
    status: "completed",
  },
  {
    id: "res-004",
    roomId: "3",
    roomName: "Family Room",
    roomType: "Standard",
    userId: "1",
    checkInDate: "2022-12-24",
    checkOutDate: "2022-12-26",
    numberOfGuests: 4,
    totalPrice: 558,
    status: "cancelled",
  },
]

export async function getUserReservations(userId: string, status?: string): Promise<Reservation[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  let filteredReservations = mockReservations.filter((res) => res.userId === userId)

  if (status) {
    filteredReservations = filteredReservations.filter((res) => res.status === status)
  }

  return filteredReservations
}

export async function getUpcomingReservations(userId: string): Promise<Reservation[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Get reservations that are pending or confirmed
  return mockReservations.filter(
    (res) =>
      res.userId === userId &&
      (res.status === "pending" || res.status === "confirmed") &&
      new Date(res.checkInDate) >= new Date(),
  )
}

export async function getPastReservations(userId: string): Promise<Reservation[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Get reservations that are completed or cancelled
  return mockReservations.filter(
    (res) => res.userId === userId && (res.status === "completed" || res.status === "cancelled"),
  )
}

export async function createReservation(reservationData: Omit<Reservation, "id">): Promise<Reservation> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Create new reservation
  const newReservation: Reservation = {
    id: `res-${Math.floor(Math.random() * 1000)}`,
    ...reservationData,
  }

  return newReservation
}

export async function cancelReservation(id: string): Promise<boolean> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would update the reservation status in the database
  return true
}
