// This is a mock service for frontend development
// In a real application, this would make actual API calls to your backend

interface BasketItem {
    id: string
    itemType: "room" | "event" | "service"
    itemId: string
    quantity: number
    price: number
    startDate?: string
    endDate?: string
    guests?: number
    specialRequests?: string
    details?: {
      name?: string
      title?: string
      type?: string
      location?: string
      image?: string
    }
  }
  
  interface Basket {
    id: string
    status: "active" | "converted" | "abandoned"
    totalAmount: number
    expiresAt: string
    items: BasketItem[]
  }
  
  // Mock data
  const mockBasket: Basket = {
    id: "basket-001",
    status: "active",
    totalAmount: 0,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    items: [],
  }
  
  export async function getUserBasket(): Promise<Basket> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    return mockBasket
  }
  
  export async function addRoomToBasket(
    roomId: string,
    startDate: string,
    endDate: string,
    guests: number,
    specialRequests?: string,
  ): Promise<BasketItem> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))
  
    // In a real app, this would call your API
    // For now, we'll simulate adding a room to the basket
    const newItem: BasketItem = {
      id: `item-${Date.now()}`,
      itemType: "room",
      itemId: roomId,
      quantity: 1,
      price: 199 * calculateNights(startDate, endDate), // Mock price calculation
      startDate,
      endDate,
      guests,
      specialRequests,
      details: {
        name: "Deluxe King Room", // Mock data
        type: "Deluxe",
        image: "/placeholder.svg?height=400&width=600",
      },
    }
  
    // Update mock basket
    mockBasket.items.push(newItem)
    mockBasket.totalAmount = mockBasket.items.reduce((total, item) => total + item.price, 0)
  
    return newItem
  }
  
  export async function addEventToBasket(
    eventId: string,
    quantity: number,
    specialRequests?: string,
  ): Promise<BasketItem> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))
  
    // In a real app, this would call your API
    // For now, we'll simulate adding an event to the basket
    const newItem: BasketItem = {
      id: `item-${Date.now()}`,
      itemType: "event",
      itemId: eventId,
      quantity,
      price: 150 * quantity, // Mock price
      startDate: "2023-07-15", // Mock date
      specialRequests,
      details: {
        title: "Summer Gala Dinner", // Mock data
        location: "Grand Ballroom",
        image: "/placeholder.svg?height=400&width=600",
      },
    }
  
    // Update mock basket
    mockBasket.items.push(newItem)
    mockBasket.totalAmount = mockBasket.items.reduce((total, item) => total + item.price, 0)
  
    return newItem
  }
  
  export async function updateBasketItem(
    itemId: string,
    quantity: number,
    specialRequests?: string,
  ): Promise<BasketItem | null> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    // Find the item in the mock basket
    const itemIndex = mockBasket.items.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) return null
  
    // Update the item
    const item = mockBasket.items[itemIndex]
    const oldTotal = item.price
  
    // Update quantity and recalculate price
    const pricePerUnit = item.price / item.quantity
    item.quantity = quantity
    item.price = pricePerUnit * quantity
  
    if (specialRequests !== undefined) {
      item.specialRequests = specialRequests
    }
  
    // Update basket total
    mockBasket.totalAmount = mockBasket.items.reduce((total, item) => total + item.price, 0)
  
    return mockBasket.items[itemIndex]
  }
  
  export async function removeBasketItem(itemId: string): Promise<boolean> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    // Find the item in the mock basket
    const itemIndex = mockBasket.items.findIndex((item) => item.id === itemId)
    if (itemIndex === -1) return false
  
    // Remove the item
    mockBasket.items.splice(itemIndex, 1)
  
    // Update basket total
    mockBasket.totalAmount = mockBasket.items.reduce((total, item) => total + item.price, 0)
  
    return true
  }
  
  export async function clearBasket(): Promise<boolean> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    // Clear the basket
    mockBasket.items = []
    mockBasket.totalAmount = 0
  
    return true
  }
  
  export async function confirmReservations(): Promise<{ reservationIds: string[] }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // In a real app, this would call your API to process the reservations
    // For now, we'll just simulate successful reservations
    const reservationIds = mockBasket.items.map((_, index) => `res-${Date.now()}-${index}`)
  
    // Clear the basket after confirmation
    mockBasket.items = []
    mockBasket.totalAmount = 0
    mockBasket.status = "converted"
  
    return { reservationIds }
  }
  
  // Helper function to calculate nights between two dates
  function calculateNights(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  