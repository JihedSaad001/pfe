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
import { formatCurrency, calculateNights } from "@/lib/utils"
import { checkRoomAvailability, getRoomById } from "@/lib/api/rooms"

interface RoomAvailabilityProps {
  roomId: string
  defaultValues: {
    checkIn: string
    checkOut: string
    guests: string
  }
}

export default function RoomAvailability({ roomId, defaultValues }: RoomAvailabilityProps) {
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
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
      checkIn: defaultValues.checkIn || "",
      checkOut: defaultValues.checkOut || "",
      guests: defaultValues.guests || "1",
    },
  })

  const checkIn = watch("checkIn")
  const checkOut = watch("checkOut")
  const guests = watch("guests")
  const nights = calculateNights(checkIn, checkOut)

  const onSubmit = async (data: any) => {
    setIsChecking(true)
    try {
      const available = await checkRoomAvailability({
        roomId,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: Number(data.guests),
      })
      setIsAvailable(available)
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
      const room = await getRoomById(roomId)
      if (!room) throw new Error("Room not found")

      await addItem({
        id: `room-${roomId}-${checkIn}-${checkOut}`,
        type: "room",
        name: room.name,
        price: room.price * nights,
        image: room.image,
        dateFrom: checkIn,
        dateTo: checkOut,
      })

      toast({
        title: "Success",
        description: "Room added to your basket",
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                type="date"
                {...register("checkIn", { required: "Check-in date is required" })}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.checkIn && <p className="text-sm text-destructive">{errors.checkIn.message?.toString()}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                type="date"
                {...register("checkOut", { required: "Check-out date is required" })}
                min={checkIn || new Date().toISOString().split("T")[0]}
              />
              {errors.checkOut && <p className="text-sm text-destructive">{errors.checkOut.message?.toString()}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Select value={guests} onValueChange={(value) => setValue("guests", value)}>
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {nights > 0 && (
            <div className="mt-4 rounded-lg bg-muted p-4">
              <div className="flex justify-between font-medium">
                <span>Total for {nights} nights:</span>
                <span>{formatCurrency(nights * 350)}</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isChecking}>
            {isChecking ? "Checking..." : "Check Availability"}
          </Button>
        </form>

        {isAvailable === true && (
          <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-950">
            <p className="text-center font-medium text-green-800 dark:text-green-300">
              This room is available for your selected dates!
            </p>
            <Button className="mt-4 w-full" onClick={handleAddToBasket} disabled={isAddingToBasket}>
              {isAddingToBasket ? "Adding..." : "Reserve Now"}
            </Button>
          </div>
        )}

        {isAvailable === false && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-950">
            <p className="text-center font-medium text-red-800 dark:text-red-300">
              Sorry, this room is not available for your selected dates.
            </p>
            <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">
              Please try different dates or browse other rooms.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
