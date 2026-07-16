import { Link } from 'react-router-dom'
import { Star, MapPin, Users, Bed, Bath, Heart } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import type { Apartment } from '@/types'

interface ApartmentCardProps {
  apartment: Apartment
  isLiked: boolean
  onToggleLike: (id: string) => void
}

export default function ApartmentCard({ apartment, isLiked, onToggleLike }: ApartmentCardProps) {
  return (
    <Link
      to={`/apartment/${apartment.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-neutral-200 overflow-hidden"
    >
      <article>
        <div className="relative aspect-video">
          <img
            src={apartment.image}
            alt={apartment.name}
            className="w-full h-full object-cover rounded-t"
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggleLike(apartment.id)
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                isLiked ? 'fill-error text-error' : 'text-neutral-600'
              )}
            />
          </button>
          {apartment.featured && (
            <span className="absolute top-3 left-3 bg-primary text-secondary text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors mb-1">
            {apartment.name}
          </h3>
          <div className="flex items-center text-neutral-600 text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
            {apartment.location}
          </div>
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-primary">{apartment.rating}</span>
            <span className="text-sm text-neutral-600">({apartment.reviewCount} reviews)</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mb-3 line-clamp-2">
            {apartment.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {apartment.bedrooms} bed{apartment.bedrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {apartment.bathrooms} bath{apartment.bathrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {apartment.guests} guests
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatPrice(apartment.price)}
              <span className="text-sm font-normal text-neutral-600">/night</span>
            </span>
            <span className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-secondary">
              View Details
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
