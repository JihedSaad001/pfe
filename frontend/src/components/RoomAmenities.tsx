import { Check } from "lucide-react"

interface RoomAmenitiesProps {
  amenities: string[]
}

export default function RoomAmenities({ amenities }: RoomAmenitiesProps) {
  // Map of amenity keys to display names
  const amenityNames: Record<string, string> = {
    wifi: "Free WiFi",
    breakfast: "Complimentary Breakfast",
    tv: "Flat-screen TV",
    ac: "Air Conditioning",
    minibar: "Mini Bar",
    workspace: "Dedicated Workspace",
    bathtub: "Bathtub",
    shower: "Rain Shower",
    balcony: "Private Balcony",
    oceanview: "Ocean View",
    cityview: "City View",
    coffeemachine: "Coffee Machine",
    safe: "In-room Safe",
    iron: "Iron & Ironing Board",
    hairdryer: "Hair Dryer",
    butler: "Butler Service",
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Room Amenities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>{amenityNames[amenity] || amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
