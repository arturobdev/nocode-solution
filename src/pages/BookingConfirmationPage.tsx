import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CircleCheckBig, Home, LayoutDashboard } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Booking } from '@/types'
import { useStore } from '@/store/useStore'
import { generateBookingNumber } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import BookingDetailsCard from '@/components/apartment/BookingDetailsCard'
import SEO from '@/components/seo/SEO'
import { BookingConfirmationSkeleton } from '@/components/skeletons/BookingConfirmationSkeleton'

export default function BookingConfirmationPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const booking = location.state?.booking as Booking | undefined
  const { addBooking } = useStore()
  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated)
  const addedRef = useRef(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (booking && !addedRef.current) {
      addedRef.current = true
      const bookingNumber = booking.bookingNumber || generateBookingNumber()
      addBooking({ ...booking, bookingNumber })
    }
  }, [booking, addBooking])

  if (loading) return <BookingConfirmationSkeleton />

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <SEO title="Booking Not Found" noindex />
        <p className="text-xl text-neutral-600">{t('bookingConfirmation.noBooking')}</p>
        <Button asChild variant="outline">
          <Link to="/">
            <Home className="h-4 w-4" />
            {t('bookingConfirmation.returnHome')}
          </Link>
        </Button>
      </div>
    )
  }

  const bookingNumber = booking.bookingNumber || generateBookingNumber()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <SEO title="Booking Confirmed" noindex />
      <div className="flex flex-col items-center text-center">
        <CircleCheckBig className="text-success mb-6" size={80} strokeWidth={1.5} />
        <h1 className="text-3xl font-bold text-primary">{t('bookingConfirmation.title')}</h1>
        <p className="text-neutral-600 mt-2">{t('bookingConfirmation.subtitle')}</p>
      </div>

      <BookingDetailsCard booking={{ ...booking, bookingNumber }} />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link to="/">
            <Home className="h-4 w-4" />
            {t('bookingConfirmation.returnHome')}
          </Link>
        </Button>
        {isAdminAuthenticated && (
          <Button asChild className="w-full sm:w-auto">
            <Link to="/admin">
              <LayoutDashboard className="h-4 w-4" />
              {t('bookingConfirmation.viewInAdmin')}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
