import { Link } from 'react-router-dom'
import { MapPin, Star, Users, Heart } from 'lucide-react'
import { featuredApartments } from '@/data/apartments'
import { formatPrice, cn } from '@/lib/utils'
import type { Apartment } from '@/types'

function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <li>
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col h-full">
        <div className="relative aspect-video">
          <img src={apartment.image} alt={apartment.name} className="w-full h-full object-cover" />
          <button
            type="button"
            className="absolute top-3 right-3 size-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white"
            aria-label="Add to favorites"
          >
            <Heart className="size-4 text-neutral-600" />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-primary text-lg leading-snug mb-1.5 line-clamp-2">
            {apartment.name}
          </h3>

          <div className="flex items-center gap-1 text-neutral-600 text-sm mb-2">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{apartment.location}</span>
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            <Star className="size-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{apartment.rating}</span>
            <span className="text-sm text-neutral-600">({apartment.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-neutral-600 mb-4">
            <Users className="size-3.5" />
            <span>Up to {apartment.guests} guests</span>
          </div>

          <div className="mt-auto">
            <p className="mb-3">
              <span className="text-lg font-bold text-primary">{formatPrice(apartment.price)}</span>
              <span className="text-sm text-neutral-600"> /night</span>
            </p>

            <Link
              to={`/apartment/${apartment.id}`}
              className={cn(
                'block w-full text-center py-2 rounded-lg text-sm font-medium',
                'border border-primary text-primary',
                'hover:bg-primary hover:text-white transition-colors'
              )}
            >
              View Details
            </Link>
          </div>
        </div>
      </article>
    </li>
  )
}

export default function PopularApartments() {
  return (
    <section className="py-16 lg:py-20 bg-neutral-50">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">Popular Apartments</h2>
            <p className="text-neutral-600 text-lg">Handpicked stays loved by our guests</p>
          </div>
          <Link
            to="/search"
            className="text-primary font-medium hover:text-primary-light transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredApartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </ul>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/search"
            className="text-primary font-medium hover:text-primary-light transition-colors"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  )
}
