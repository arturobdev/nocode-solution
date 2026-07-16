import { useState } from 'react'
import { Star } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { getInitials } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarRating } from '@/components/ui/star-rating'
import type { Review } from '@/types'

interface ReviewsSectionProps {
  reviews: Review[]
  avgRating: number
}

const PREVIEW_COUNT = 2

export default function ReviewsSection({ reviews, avgRating }: ReviewsSectionProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const visibleReviews = expanded ? reviews : reviews.slice(0, PREVIEW_COUNT)
  const hasMore = reviews.length > PREVIEW_COUNT

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-primary">
          {t('apartmentDetails.reviews')}
        </h2>
        <Badge variant="secondary">
          <Star className="h-3 w-3 fill-warning text-warning mr-1" />
          {avgRating.toFixed(1)}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mb-5 md:mb-6 p-3 md:p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <span className="text-3xl md:text-4xl font-bold text-primary">{avgRating.toFixed(1)}</span>
        <div>
          <StarRating rating={avgRating} size="lg" className="mb-1" />
          <span className="text-xs md:text-sm text-neutral-600">
            {t('apartmentDetails.basedOn')} {reviews.length} {t('common.review')}
            {reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-neutral-600 text-center py-8">{t('apartmentDetails.noReviews')}</p>
      ) : (
        <>
          <div className="space-y-4 md:space-y-6">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg border border-neutral-200 p-4 md:p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-secondary">
                      {getInitials(review.guestName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-primary text-sm">{review.guestName}</h4>
                      <span className="text-xs text-neutral-500 shrink-0">
                        {format(parseISO(review.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <StarRating rating={review.rating} size="sm" className="mt-1" />
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-sm font-medium text-primary hover:text-primary-dark transition-colors underline underline-offset-2"
            >
              {expanded
                ? t('common.showLess')
                : t('common.viewAllReviews', { count: reviews.length })}
            </button>
          )}
        </>
      )}
    </div>
  )
}
