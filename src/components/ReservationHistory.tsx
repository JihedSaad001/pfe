"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface Reservation {
  id: string
  roomName: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  status: "completed" | "cancelled"
}

export default function ReservationHistory() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch reservation history
    const fetchReservations = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockReservations: Reservation[] = [
          {
            id: "res-001",
            roomName: "Deluxe King Room",
            roomType: "Deluxe",
            checkInDate: "2023-03-15",
            checkOutDate: "2023-03-18",
            totalPrice: 597,
            status: "completed",
          },
          {
            id: "res-002",
            roomName: "Executive Suite",
            roomType: "Suite",
            checkInDate: "2023-01-10",
            checkOutDate: "2023-01-15",
            totalPrice: 1745,
            status: "completed",
          },
          {
            id: "res-003",
            roomName: "Family Room",
            roomType: "Standard",
            checkInDate: "2022-12-24",
            checkOutDate: "2022-12-26",
            totalPrice: 558,
            status: "cancelled",
          },
        ]

        setReservations(mockReservations)
      } catch (error) {
        console.error("Error fetching reservations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservations()
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">Loading your reservation history...</div>
  }

  if (reservations.length === 0) {
    return <div className="text-center py-8">You don't have any past reservations.</div>
  }

  return (
    <div className="space-y-6">
      {reservations.map((reservation) => (
        <Card key={reservation.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{reservation.roomName}</CardTitle>
                <CardDescription>{reservation.roomType}</CardDescription>
              </div>
              <Badge variant={reservation.status === "completed" ? "default" : "destructive"}>
                {reservation.status === "completed" ? "Completed" : "Cancelled"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Check-in</p>
                <p className="font-medium">{formatDate(reservation.checkInDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Check-out</p>
                <p className="font-medium">{formatDate(reservation.checkOutDate)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="font-medium">${reservation.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
