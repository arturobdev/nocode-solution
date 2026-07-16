import { Calendar, Users, Moon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Booking, BookingStatus } from '@/types'

interface BookingDetailsCardProps {
  booking: Booking
}

const statusBadgeVariant: Record<BookingStatus, 'success' | 'warning' | 'destructive' | 'info'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'destructive',
  completed: 'info',
}

export default function BookingDetailsCard({ booking }: BookingDetailsCardProps) {
  const checkIn = parseISO(booking.checkIn)
  const checkOut = parseISO(booking.checkOut)

  return (
    <Card className="mt-8 shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Booking Details</CardTitle>
        <Badge variant="secondary">{booking.bookingNumber}</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
                Apartment
              </p>
              <div className="flex items-center gap-3 mt-1">
                <img
                  src={booking.apartmentImage}
                  alt={booking.apartmentName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="font-medium text-primary">{booking.apartmentName}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">Guest</p>
              <p className="font-medium text-primary mt-1">{booking.guestName}</p>
              <p className="text-sm text-neutral-600">{booking.guestEmail}</p>
              {booking.guestPhone && (
                <p className="text-sm text-neutral-600">{booking.guestPhone}</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-neutral-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
                  Check-in
                </p>
                <p className="font-medium text-primary">{format(checkIn, 'MMM dd, yyyy')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-neutral-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
                  Check-out
                </p>
                <p className="font-medium text-primary">{format(checkOut, 'MMM dd, yyyy')}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-neutral-600" />
                <span className="text-sm text-neutral-600">
                  {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-neutral-600" />
                <span className="text-sm text-neutral-600">
                  {booking.nights} night{booking.nights !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">
              {formatPrice(booking.pricePerNight)} x {booking.nights} night
              {booking.nights !== 1 ? 's' : ''}
            </span>
            <span className="text-primary">
              {formatPrice(booking.pricePerNight * booking.nights)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Taxes</span>
            <span className="text-primary">{formatPrice(booking.taxes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Service fee</span>
            <span className="text-primary">{formatPrice(booking.fees)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-primary">Total</span>
            <span className="text-primary">{formatPrice(booking.total)}</span>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Badge
            variant={statusBadgeVariant[booking.status]}
            className="text-sm px-4 py-1 capitalize"
          >
            {booking.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
