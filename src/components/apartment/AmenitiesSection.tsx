import {
  Wifi,
  Snowflake,
  ParkingCircle,
  Waves,
  Anchor,
  Tv,
  Eye,
  Sailboat,
  Flame,
  Mountain,
  Droplets,
  MountainSnow,
  Gamepad2,
  Shirt,
  Building2,
  Sun,
  DoorOpen,
  Dumbbell,
  UtensilsCrossed,
  MonitorSmartphone,
  Bike,
  Lock,
  Paintbrush,
  Lightbulb,
  Coffee,
  Ship,
  Star,
  TreePine,
  CookingPot,
  Compass,
  Binoculars,
  Utensils,
  ShoppingCart,
  CircleCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  'Air Conditioning': Snowflake,
  Parking: ParkingCircle,
  Pool: Waves,
  'Beach Access': Anchor,
  TV: Tv,
  Balcony: Eye,
  'Ocean View': Sailboat,
  'BBQ Grill': Flame,
  BBQ: Flame,
  'Mountain View': Mountain,
  Fireplace: Flame,
  'Hot Tub': Droplets,
  'Ski-in/Ski-out': MountainSnow,
  'Game Room': Gamepad2,
  'Mud Room': Shirt,
  'City View': Building2,
  'Smart Home': MonitorSmartphone,
  'Rooftop Access': Sun,
  Doorman: DoorOpen,
  Elevator: Building2,
  Gym: Dumbbell,
  Washer: Shirt,
  Dryer: Shirt,
  Kitchen: UtensilsCrossed,
  Workspace: MonitorSmartphone,
  'Bike Storage': Bike,
  'Smart Lock': Lock,
  'Art Studio': Paintbrush,
  'Natural Light': Lightbulb,
  'Coffee Maker': Coffee,
  'Harbor View': Ship,
  Concierge: Star,
  'Lake View': TreePine,
  'Private Dock': Anchor,
  Kayaks: Sailboat,
  'Outdoor Kitchen': CookingPot,
  'Fire Pit': Flame,
  'Gas Grill': Flame,
  Deck: Eye,
  Kitchenette: Utensils,
  'Hiking Access': Compass,
  Wildlife: Binoculars,
  Stargazing: Star,
  'Shopping Access': ShoppingCart,
  'Historic Building': Building2,
  'Bike Friendly': Bike,
  'Board Games': Gamepad2,
  Garden: TreePine,
  'Infinity Pool': Waves,
  'River View': Eye,
}

interface AmenitiesSectionProps {
  amenities: string[]
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-primary mb-4">
        {t('apartmentDetails.whatThisPlaceOffers')}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3" role="list">
        {amenities.map((amenity) => {
          const Icon = AMENITY_ICONS[amenity] || CircleCheck
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
