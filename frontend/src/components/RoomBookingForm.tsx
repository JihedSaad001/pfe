"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoomBookingFormProps {
  roomId: string
}

export default function RoomBookingForm({ roomId }: RoomBookingFormProps) {
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState("1")
  const [specialRequests, setSpecialRequests] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates")
      return
    }

    setIsSubmitting(true)

    try {
      // This would be replaced with an actual API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to confirmation page (in a real app)
      alert("Booking successful! You would be redirected to a confirmation page.")

      // Reset form
      setCheckInDate(undefined)
      setCheckOutDate(undefined)
      setGuests("1")
      setSpecialRequests("")
    } catch (error) {
      console.error("Booking failed:", error)
      alert("There was an error processing your booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Check-in Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !checkInDate && "text-muted-foreground")}
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
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Check-out Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !checkOutDate && "text-muted-foreground")}
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
              disabled={(date) => date < (checkInDate || new Date())}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Number of Guests</label>
        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger>
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
        <label className="text-sm font-medium">Special Requests (Optional)</label>
        <Textarea
          placeholder="Any special requests or preferences?"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Book Now"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By clicking "Book Now", you agree to our terms and conditions.
      </p>
    </form>
  )
}
