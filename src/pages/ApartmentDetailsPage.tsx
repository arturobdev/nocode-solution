import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Star, MapPin, Users, Bed, Bath, Search, ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { calculateNights } from '@/lib/utils'
import { apartments } from '@/data/apartments'
import { getReviewsByApartmentId } from '@/data/reviews'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import ImageGallery from '@/components/apartment/ImageGallery'
import BookingSidebar from '@/components/apartment/BookingSidebar'
import ReviewsSection from '@/components/apartment/ReviewsSection'
import AmenitiesSection from '@/components/apartment/AmenitiesSection'
import AvailabilityCalendar from '@/components/apartment/AvailabilityCalendar'
import HostSection from '@/components/apartment/HostSection'
import LocationMap from '@/components/apartment/LocationMap'
import CancellationPolicy from '@/components/apartment/CancellationPolicy'
import HouseRules from '@/components/apartment/HouseRules'
import SafetySection from '@/components/apartment/SafetySection'
import { ApartmentDetailsSkeleton } from '@/components/skeletons/ApartmentDetailsSkeleton'
import type { GuestInfo } from '@/types'

export default function ApartmentDetailsPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const apartment = apartments.find((a) => a.id === id)
  const apartmentReviews = useMemo(() => (id ? getReviewsByApartmentId(id) : []), [id])

  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [id])

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const n = calculateNights(checkIn, checkOut)
    return n > 0 ? n : 0
  }, [checkIn, checkOut])

  const subtotal = useMemo(() => (apartment ? apartment.price * nights : 0), [apartment, nights])
  const taxes = Math.round(subtotal * 0.12)
  const fees = nights > 0 ? 45 : 0
  const total = subtotal + taxes + fees

  const canReserve = checkIn !== '' && checkOut !== '' && nights > 0 && guests >= 1

  if (loading) return <ApartmentDetailsSkeleton />

  const handleReserve = (guestInfo: GuestInfo) => {
    if (!apartment || !canReserve) return
    const bookingData = {
      id: crypto.randomUUID(),
      bookingNumber: '',
      apartmentId: apartment.id,
      apartmentName: apartment.name,
      apartmentImage: apartment.image,
      guestName: guestInfo.fullName,
      guestEmail: guestInfo.email,
      guestPhone: guestInfo.phone,
      checkIn,
      checkOut,
      guests,
      nights,
      pricePerNight: apartment.price,
      taxes,
      fees,
      total,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
    }
    navigate('/booking-confirmation', { state: { booking: bookingData } })
  }

  if (!apartment) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Search className="h-16 w-16 mx-auto text-neutral-200 mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">{t('common.notFound')}</h1>
          <p className="text-neutral-600 mb-6">{t('common.notFoundDesc')}</p>
          <Link to="/search">
            <Button>{t('common.backToSearchBtn')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  const avgRating =
    apartmentReviews.length > 0
      ? apartmentReviews.reduce((sum, r) => sum + r.rating, 0) / apartmentReviews.length
      : apartment.rating

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/search"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('common.backToSearch')}
          </Link>
        </div>

        <ImageGallery images={apartment.images} name={apartment.name} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-primary mb-2">{apartment.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {apartment.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium text-primary">{apartment.rating}</span>(
                {apartment.reviewCount} {t('common.reviews')})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 mb-6">
              <span className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                {apartment.bedrooms}{' '}
                {apartment.bedrooms !== 1 ? t('common.bedrooms') : t('common.bedroom')}
              </span>
              <span className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                {apartment.bathrooms}{' '}
                {apartment.bathrooms !== 1 ? t('common.bathrooms') : t('common.bathroom')}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t('common.guests').charAt(0).toUpperCase() + t('common.guests').slice(1)}{' '}
                {apartment.guests}
              </span>
            </div>

            <Separator className="my-8" />

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                {t('apartmentDetails.aboutThisPlace')}
              </h2>
              <p className="text-neutral-600 leading-relaxed">{apartment.description}</p>
            </div>

            <Separator className="my-8" />

            <AmenitiesSection amenities={apartment.amenities} />

            <Separator className="my-8" />

            <AvailabilityCalendar
              apartmentId={apartment.id}
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
            />

            <Separator className="my-8" />

            <HostSection
              host={apartment.host}
              rating={avgRating}
              reviewCount={apartmentReviews.length}
            />

            <Separator className="my-8" />

            <LocationMap city={apartment.city} country={apartment.country} />

            <Separator className="my-8" />

            <CancellationPolicy />

            <Separator className="my-8" />

            <HouseRules />

            <Separator className="my-8" />

            <SafetySection />

            <Separator className="my-8" />

            <ReviewsSection reviews={apartmentReviews} avgRating={avgRating} />
          </div>

          <BookingSidebar
            apartment={apartment}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            nights={nights}
            subtotal={subtotal}
            taxes={taxes}
            fees={fees}
            total={total}
            canReserve={canReserve}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
            onGuestsChange={setGuests}
            onReserve={handleReserve}
          />
        </div>
      </div>
    </div>
  )
}
