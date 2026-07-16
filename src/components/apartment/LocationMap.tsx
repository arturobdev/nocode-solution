import { useState } from 'react'
import { MapPin, Maximize2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const CITY_COORDS: Record<string, { lat: number; lng: number; landmarks: string[] }> = {
  'New York': {
    lat: 40.758,
    lng: -73.9855,
    landmarks: ['Times Square', 'Central Park', 'Empire State Building'],
  },
  Miami: {
    lat: 25.7907,
    lng: -80.13,
    landmarks: ['South Beach', 'Art Deco District', 'Ocean Drive'],
  },
  Aspen: {
    lat: 39.1911,
    lng: -106.8175,
    landmarks: ['Aspen Mountain', 'Maroon Bells', 'Independence Pass'],
  },
  'San Francisco': {
    lat: 37.7749,
    lng: -122.4194,
    landmarks: ['Golden Gate Bridge', "Fisherman's Wharf", 'Chinatown'],
  },
  'Lake Tahoe': {
    lat: 39.0968,
    lng: -120.0324,
    landmarks: ['Emerald Bay', 'Heavenly Ski Resort', 'Sand Harbor'],
  },
  Brooklyn: {
    lat: 40.6782,
    lng: -73.9442,
    landmarks: ['Prospect Park', 'Brooklyn Bridge', 'DUMBO'],
  },
  Scottsdale: {
    lat: 33.4942,
    lng: -111.9261,
    landmarks: ['Old Town Scottsdale', 'Camelback Mountain', 'Desert Botanical Garden'],
  },
  Portland: {
    lat: 45.5155,
    lng: -122.6789,
    landmarks: ['Pearl District', "Powell's Books", 'Japanese Garden'],
  },
  'San Diego': {
    lat: 32.7157,
    lng: -117.1611,
    landmarks: ['Balboa Park', 'Gaslamp Quarter', 'La Jolla Cove'],
  },
  Asheville: {
    lat: 35.5951,
    lng: -82.5515,
    landmarks: ['Biltmore Estate', 'Blue Ridge Parkway', 'Downtown Arts District'],
  },
  'Cannon Beach': {
    lat: 45.8918,
    lng: -123.9613,
    landmarks: ['Haystack Rock', 'Ecola State Park', 'Oswald West State Park'],
  },
}

interface LocationMapProps {
  city: string
  country: string
}

export default function LocationMap({ city, country }: LocationMapProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const coords = CITY_COORDS[city] || { lat: 39.8283, lng: -98.5795, landmarks: [] }
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.02}%2C${coords.lat - 0.015}%2C${coords.lng + 0.02}%2C${coords.lat + 0.015}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`
  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}#map=15/${coords.lat}/${coords.lng}`

  return (
    <section aria-labelledby="location-heading" className="mb-6 md:mb-8">
      <h2
        id="location-heading"
        className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4 flex items-center gap-2"
      >
        <MapPin className="h-5 w-5" />
        {t('location.title')}
      </h2>

      <div className="rounded-xl overflow-hidden border border-neutral-200">
        <div
          className={`relative w-full transition-all duration-300 ${expanded ? 'aspect-video' : 'aspect-[2/1] md:aspect-[3/1]'}`}
        >
          <iframe
            title={`${city}, ${country} location map`}
            src={mapUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-neutral-500 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {t('location.approximate')}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
        >
          <Maximize2 className="h-3 w-3" />
          {expanded ? t('common.showLess') : t('common.viewLargerMap')}
        </button>
      </div>

      {coords.landmarks.length > 0 && (
        <div className="mt-3">
          <h3 className="text-xs md:text-sm font-medium text-primary mb-2">
            {t('location.nearbyLandmarks')}
          </h3>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {coords.landmarks.map((landmark) => (
              <span
                key={landmark}
                className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-600"
              >
                <MapPin className="h-3 w-3 text-primary" />
                {landmark}
              </span>
            ))}
          </div>
        </div>
      )}

      {expanded && (
        <a
          href={fullMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          <Maximize2 className="h-4 w-4" />
          {t('common.openInMap')}
        </a>
      )}
    </section>
  )
}
