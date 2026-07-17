import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface MobileBookingBarProps {
  price: number
  rating: number
  reviewCount: number
  onReserve: () => void
}

export default function MobileBookingBar({
  price,
  rating,
  reviewCount,
  onReserve,
}: MobileBookingBarProps) {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
            <span className="text-xs text-neutral-500">{t('common.perNight')}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-xs font-medium text-primary">{rating.toFixed(1)}</span>
            <span className="text-xs text-neutral-500">({reviewCount})</span>
          </div>
        </div>
        <Button
          onClick={onReserve}
          className="shrink-0 px-6 py-2.5 text-sm font-semibold rounded-lg"
        >
          {t('common.reserveNow')}
        </Button>
      </div>
    </div>
  )
}
