"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn, calculateNights } from "../../lib/utils"
import { getRoom } from "../../services/roomService"
import { isAuthenticated } from "../../services/authService"
import { createReservation } from "../../services/reservationService"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get("room")

  const [room, setRoom] = useState<any>(null)
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState("1")
  const [specialRequests, setSpecialRequests] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login?redirect=/booking" + (roomId ? `?room=${roomId}` : ""))
      return
    }

    const fetchRoom = async () => {
      if (roomId) {
        setIsLoading(true)
        try {
          const roomData = await getRoom(roomId)
          setRoom(roomData)
        } catch (error) {
          console.error("Error fetching room:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchRoom()
  }, [roomId, router])

  useEffect(() => {
    if (room && checkInDate && checkOutDate) {
      const nights = calculateNights(checkInDate.toISOString(), checkOutDate.toISOString())
      setTotalPrice(room.price * nights)
    }
  }, [room, checkInDate, checkOutDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!checkInDate || !checkOutDate || !room) {
      alert("Please select check-in and check-out dates and a room")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would send data to your backend
      await createReservation({
        roomId: room.id,
        roomName: room.name,
        roomType: room.type,
        userId: "1", // Mock user ID
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0],
        numberOfGuests: Number.parseInt(guests),
        totalPrice,
        status: "confirmed",
        specialRequests,
      })

      alert("Booking successful! You would be redirected to a confirmation page.")
      router.push("/account")
    } catch (error) {
      console.error("Booking failed:", error)
      alert("There was an error processing your booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Book Your Stay</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
              <CardDescription>Please fill in the details for your stay</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {!roomId && (
                  <div className="space-y-2">
                    <Label htmlFor="room">Select Room Type</Label>
                    <Select required>
                      <SelectTrigger id="room">
                        <SelectValue placeholder="Choose a room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deluxe">Deluxe King Room - $199/night</SelectItem>
                        <SelectItem value="executive">Executive Suite - $349/night</SelectItem>
                        <SelectItem value="family">Family Room - $279/night</SelectItem>
                        <SelectItem value="presidential">Presidential Suite - $599/night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkInDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                          disabled={(date:any) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOutDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                          disabled={(date:any) => date < (checkInDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input type="text" placeholder="Full Name" />
                    <Input type="email" placeholder="Email Address" />
                    <Input type="tel" placeholder="Phone Number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requests or preferences?"
                    value={specialRequests}
                    onChange={(e:any) => setSpecialRequests(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting || !checkInDate || !checkOutDate}>
                  {isSubmitting ? "Processing..." : "Complete Booking"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {room ? (
                <>
                  <div className="font-medium">{room.name}</div>
                  <div className="text-sm text-muted-foreground">{room.type}</div>
                </>
              ) : (
                <div className="text-muted-foreground">Please select a room</div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Room Rate:</span>
                  <span>${room?.price || 0}/night</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Nights:</span>
                  <span>
                    {checkInDate && checkOutDate
                      ? calculateNights(checkInDate.toISOString(), checkOutDate.toISOString())
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes & Fees:</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
