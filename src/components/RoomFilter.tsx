"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function RoomFilter() {
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <div className="bg-muted/40 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Filter Rooms</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="room-type">Room Type</Label>
          <Select defaultValue="all">
            <SelectTrigger id="room-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="standard">Standard Room</SelectItem>
              <SelectItem value="deluxe">Deluxe Room</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="executive">Executive Suite</SelectItem>
              <SelectItem value="presidential">Presidential Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <Select defaultValue="1">
            <SelectTrigger id="guests">
              <SelectValue placeholder="Number of Guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5+">5+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between">
            <Label>Price Range</Label>
            <span className="text-sm">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider defaultValue={[0, 1000]} max={1000} step={50} onValueChange={setPriceRange} className="py-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by room name or features..." />
        </div>

        <div className="flex items-end">
          <Button className="w-full">Apply Filters</Button>
        </div>
      </div>
    </div>
  )
}
