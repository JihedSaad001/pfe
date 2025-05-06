"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Reservation {
  id: string
  roomName: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  status: "pending" | "confirmed"
}

export default function UpcomingReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch upcoming reservations
    const fetchReservations = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockReservations: Reservation[] = [
          {
            id: "res-004",
            roomName: "Deluxe King Room",
            roomType: "Deluxe",
            checkInDate: "2023-07-20",
            checkOutDate: "2023-07-25",
            totalPrice: 995,
            status: "confirmed",
          },
          {
            id: "res-005",
            roomName: "Presidential Suite",
            roomType: "Suite",
            checkInDate: "2023-08-15",
            checkOutDate: "2023-08-20",
            totalPrice: 2995,
            status: "pending",
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

  const handleCancelReservation = async (id: string) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setReservations((prev) => prev.filter((reservation) => reservation.id !== id))
    } catch (error) {
      console.error("Error cancelling reservation:", error)
      alert("Failed to cancel reservation. Please try again.")
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading your upcoming reservations...</div>
  }

  if (reservations.length === 0) {
    return <div className="text-center py-8">You don't have any upcoming reservations.</div>
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
              <Badge variant={reservation.status === "confirmed" ? "default" : "outline"}>
                {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
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
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="font-medium">${reservation.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.open(`/reservations/${reservation.id}`, "_blank")}>
              View Details
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Cancel Reservation</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will cancel your reservation and may be subject to cancellation
                    fees according to our policy.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go Back</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleCancelReservation(reservation.id)}>
                    Yes, Cancel Reservation
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
