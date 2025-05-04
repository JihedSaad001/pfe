"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EventSearchProps {
  defaultValues?: {
    date: string
    type: string
  }
}

export default function EventSearch({ defaultValues }: EventSearchProps) {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      date: defaultValues?.date || "",
      type: defaultValues?.type || "",
    },
  })

  const onSubmit = (data: any) => {
    setIsSearching(true)

    const params = new URLSearchParams()
    if (data.date) params.append("date", data.date)
    if (data.type) params.append("type", data.type)

    router.push(`/events?${params.toString()}`)
    setIsSearching(false)
  }

  return (
    <Card className="mb-8 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-3 md:gap-6">
        <div className="grid gap-2">
          <Label htmlFor="date">Event Date</Label>
          <Input id="date" type="date" {...register("date")} min={new Date().toISOString().split("T")[0]} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="eventType">Event Type</Label>
          <Select value={watch("type")} onValueChange={(value) => setValue("type", value)}>
            <SelectTrigger id="eventType">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="celebration">Celebration</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mt-8" disabled={isSearching}>
          {isSearching ? "Searching..." : "Search Events"}
        </Button>
      </form>
    </Card>
  )
}
