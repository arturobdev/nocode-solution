import { MapPin } from 'lucide-react'
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
  const coords = CITY_COORDS[city] || { lat: 39.8283, lng: -98.5795, landmarks: [] }
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.02}%2C${coords.lat - 0.015}%2C${coords.lng + 0.02}%2C${coords.lat + 0.015}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`

  return (
    <section aria-labelledby="location-heading" className="mb-8">
      <h2
        id="location-heading"
        className="text-xl font-semibold text-primary mb-4 flex items-center gap-2"
      >
        <MapPin className="h-5 w-5" />
        {t('location.title')}
      </h2>

      <div className="rounded-xl overflow-hidden border border-neutral-200">
        <div className="relative aspect-video w-full">
          <iframe
            title={`${city}, ${country} location map`}
            src={mapUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
        <MapPin className="h-3 w-3" />
        {t('location.approximate')}
      </p>

      {coords.landmarks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-primary mb-2">{t('location.nearbyLandmarks')}</h3>
          <ul className="flex flex-wrap gap-2" role="list">
            {coords.landmarks.map((landmark) => (
              <li
                key={landmark}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-600"
              >
                <MapPin className="h-3 w-3 text-primary" />
                {landmark}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
