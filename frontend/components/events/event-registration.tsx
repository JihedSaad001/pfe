"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useBasket } from "@/hooks/use-basket"
import { formatCurrency } from "@/lib/utils"
import { checkEventAvailability, getEventById } from "@/lib/api/events"

interface EventRegistrationProps {
  eventId: string
  defaultDate: string
}

export default function EventRegistration({ eventId, defaultDate }: EventRegistrationProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [availabilityResult, setAvailabilityResult] = useState<{
    available: boolean
    remainingSpots: number
  } | null>(null)
  const [isAddingToBasket, setIsAddingToBasket] = useState(false)
  const { addItem } = useBasket()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: defaultDate || "",
      attendees: "1",
    },
  })

  const date = watch("date")
  const attendees = Number.parseInt(watch("attendees") || "1")

  const onSubmit = async (data: any) => {
    setIsChecking(true)
    try {
      const result = await checkEventAvailability(eventId, data.date)
      setAvailabilityResult(result)
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not check availability. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const handleAddToBasket = async () => {
    setIsAddingToBasket(true)
    try {
      const event = await getEventById(eventId)
      if (!event) throw new Error("Event not found")

      await addItem({
        id: `event-${eventId}-${date}`,
        type: "event",
        name: event.name,
        price: event.price * attendees,
        image: event.image,
        dateFrom: date,
      })

      toast({
        title: "Success",
        description: "Event added to your basket",
      })

      router.push("/basket")
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add to basket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToBasket(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message?.toString()}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Number of Attendees</Label>
              <Select value={attendees.toString()} onValueChange={(value) => setValue("attendees", value)}>
                <SelectTrigger id="attendees">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Attendee" : "Attendees"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {attendees > 0 && (
            <div className="mt-4 rounded-lg bg-muted p-4">
              <div className="flex justify-between font-medium">
                <span>Total for {attendees} attendees:</span>
                <span>{formatCurrency(attendees * 120)}</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isChecking}>
            {isChecking ? "Checking..." : "Check Availability"}
          </Button>
        </form>

        {availabilityResult?.available && (
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-950">
            <p className="text-center font-medium text-green-800 dark:text-green-300">
              This event is available! {availabilityResult.remainingSpots} spots remaining.
            </p>
            <Button className="mt-4 w-full" onClick={handleAddToBasket} disabled={isAddingToBasket}>
              {isAddingToBasket ? "Adding..." : "Reserve Now"}
            </Button>
          </div>
        )}

        {availabilityResult && !availabilityResult.available && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-950">
            <p className="text-center font-medium text-red-800 dark:text-red-300">
              Sorry, this event is fully booked for the selected date.
            </p>
            <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">
              Please try a different date or browse other events.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
