import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { destinations } from '@/data/destinations'
import type { Destination } from '@/types'

interface DestinationCardProps {
  destination: Destination
}

function DestinationCard({ destination }: DestinationCardProps) {
  const { t } = useTranslation()

  return (
    <li className="min-w-[260px] sm:min-w-0">
      <article className="group relative block rounded-xl overflow-hidden aspect-4/3 transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
          <p className="text-white/80 text-sm mb-2">{destination.country}</p>
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
            {destination.apartmentCount} {t('destinations.apartments')}
          </span>
        </div>
        <Link
          to={`/search?location=${encodeURIComponent(destination.name)}`}
          className="absolute inset-0"
          aria-label={`Explore ${destination.name}`}
        />
      </article>
    </li>
  )
}

export default function FeaturedDestinations() {
  const { t } = useTranslation()

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
            {t('destinations.title')}
          </h2>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">{t('destinations.subtitle')}</p>
        </div>

        <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 sm:gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </ul>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/search"
            className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary-light transition-colors"
          >
            {t('common.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
