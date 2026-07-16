import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AmenitiesSectionProps {
  amenities: string[]
}

const PREVIEW_COUNT = 6

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const visibleAmenities = expanded ? amenities : amenities.slice(0, PREVIEW_COUNT)
  const hasMore = amenities.length > PREVIEW_COUNT

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4">
        {t('apartmentDetails.whatThisPlaceOffers')}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3" role="list">
        {visibleAmenities.map((amenity) => (
          <li
            key={amenity}
            className="flex items-center gap-2.5 md:gap-3 p-2.5 md:p-3 rounded-lg bg-neutral-50 border border-neutral-200"
          >
            <AmenityIcon name={amenity} />
            <span className="text-xs md:text-sm text-neutral-600">{amenity}</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-medium text-primary hover:text-primary-dark transition-colors underline underline-offset-2"
        >
          {expanded
            ? t('common.showLess')
            : t('common.viewAllAmenities', { count: amenities.length })}
        </button>
      )}
    </div>
  )
}

function AmenityIcon({ name }: { name: string }) {
  const iconMap: Record<string, string> = {
    WiFi: 'M12 20h.01',
    'Air Conditioning':
      'M3 12h1m8-9v1m8 8h1M5.6 5.6l.7.7m12.1-.7l-.7.7M12 20a8 8 0 100-16 8 8 0 000 16z',
    Parking: 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
    Pool: 'M2 12h20M2 12c0-4 4-6 4-6s4 2 4 6M10 12c0-4 4-6 4-6s4 2 4 6M18 12c0-4 4-6 4-6s4 2 4 6',
    Kitchen: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l3-4h12l3 4',
    'Beach Access': 'M3 20h18M3 20c2-4 5-6 9-6s7 2 9 6',
    TV: 'M4 5a2 2 0 012-2h12a2 2 0 012 2v10H4V5zM2 17h20',
    Balcony: 'M4 20V8l8-4 8 4v12M4 20h16',
    'Ocean View': 'M2 16c2-3 4-4 6-4s4 1 6 4M14 12c2-3 4-4 6-4M2 20h20',
  }

  return (
    <div className="size-9 md:size-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
      <svg
        className="h-4 w-4 md:h-5 md:w-5 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconMap[name] || 'M5 13l4 4L19 7'} />
      </svg>
    </div>
  )
}
