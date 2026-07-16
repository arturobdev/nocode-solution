import { Wifi, Car, Home, Check } from 'lucide-react'

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  'Air Conditioning': Home,
  Parking: Car,
}

interface AmenitiesSectionProps {
  amenities: string[]
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-primary mb-4">What this place offers</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3" role="list">
        {amenities.map((amenity) => {
          const Icon = AMENITY_ICONS[amenity] || Check
          return (
            <li
              key={amenity}
              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 border border-neutral-200"
            >
              <Icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm text-neutral-600">{amenity}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
