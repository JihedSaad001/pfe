"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RoomSearchProps {
  defaultValues?: {
    checkIn: string
    checkOut: string
    guests: string
    type: string
  }
}

export default function RoomSearch({ defaultValues }: RoomSearchProps) {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      checkIn: defaultValues?.checkIn || "",
      checkOut: defaultValues?.checkOut || "",
      guests: defaultValues?.guests || "1",
      type: defaultValues?.type || "",
    },
  })

  const onSubmit = (data: any) => {
    setIsSearching(true)

    const params = new URLSearchParams()
    if (data.checkIn) params.append("checkIn", data.checkIn)
    if (data.checkOut) params.append("checkOut", data.checkOut)
    if (data.guests) params.append("guests", data.guests)
    if (data.type) params.append("type", data.type)

    router.push(`/rooms?${params.toString()}`)
    setIsSearching(false)
  }

  return (
    <Card className="mb-8 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-4 md:gap-6">
        <div className="grid gap-2">
          <Label htmlFor="checkIn">Check-in Date</Label>
          <Input id="checkIn" type="date" {...register("checkIn")} min={new Date().toISOString().split("T")[0]} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="checkOut">Check-out Date</Label>
          <Input
            id="checkOut"
            type="date"
            {...register("checkOut")}
            min={watch("checkIn") || new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guests">Guests</Label>
          <Select value={watch("guests")} onValueChange={(value) => setValue("guests", value)}>
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

        <div className="grid gap-2">
          <Label htmlFor="roomType">Room Type</Label>
          <Select value={watch("type")} onValueChange={(value) => setValue("type", value)}>
            <SelectTrigger id="roomType">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mt-4 md:col-span-4" disabled={isSearching}>
          {isSearching ? "Searching..." : "Search Rooms"}
        </Button>
      </form>
    </Card>
  )
}
