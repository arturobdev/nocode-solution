import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Booking, BookingStatus } from '@/types'

const ROWS_PER_PAGE = 8

const statusFilters: (BookingStatus | 'all')[] = [
  'all',
  'confirmed',
  'pending',
  'cancelled',
  'completed',
]

const statusBadgeVariant: Record<BookingStatus, 'success' | 'warning' | 'destructive' | 'info'> = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'destructive',
  completed: 'info',
}

interface BookingsTableProps {
  bookings: Booking[]
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<BookingStatus | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = activeFilter === 'all' || b.status === activeFilter
    const matchesSearch = searchQuery.trim()
      ? b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.apartmentName.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesFilter && matchesSearch
  })

  const totalPages = Math.ceil(filteredBookings.length / ROWS_PER_PAGE)
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )

  const handleFilterChange = (filter: BookingStatus | 'all') => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  return (
    <Card className="shadow-sm rounded-xl border border-neutral-200">
      <CardHeader className="space-y-4">
        <CardTitle className="text-lg">Recent Bookings</CardTitle>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search by guest or apartment..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              aria-pressed={activeFilter === filter}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize',
                activeFilter === filter
                  ? 'bg-primary text-secondary'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Recent bookings</caption>
            <thead>
              <tr className="border-b border-neutral-200">
                <th scope="col" className="text-left py-3 px-4 font-medium text-neutral-600">
                  Booking #
                </th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-neutral-600">
                  Apartment
                </th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-neutral-600">
                  Guest
                </th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-neutral-600">
                  Check-in
                </th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-neutral-600">
                  Check-out
                </th>
                <th scope="col" className="text-center py-3 px-4 font-medium text-neutral-600">
                  Guests
                </th>
                <th scope="col" className="text-right py-3 px-4 font-medium text-neutral-600">
                  Total
                </th>
                <th scope="col" className="text-center py-3 px-4 font-medium text-neutral-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-primary">{booking.bookingNumber}</td>
                  <td className="py-3 px-4 text-neutral-600 max-w-50 truncate">
                    {booking.apartmentName}
                  </td>
                  <td className="py-3 px-4 text-neutral-600">{booking.guestName}</td>
                  <td className="py-3 px-4 text-neutral-600">{booking.checkIn}</td>
                  <td className="py-3 px-4 text-neutral-600">{booking.checkOut}</td>
                  <td className="py-3 px-4 text-neutral-600 text-center">{booking.guests}</td>
                  <td className="py-3 px-4 text-primary font-medium text-right">
                    {formatPrice(booking.total)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={statusBadgeVariant[booking.status]} className="capitalize">
                      {booking.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedBookings.length === 0 && (
            <p className="text-center text-neutral-600 py-8">No bookings found.</p>
          )}
        </div>

        <div className="md:hidden space-y-3">
          {paginatedBookings.map((booking) => (
            <div key={booking.id} className="border border-neutral-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary text-sm">{booking.bookingNumber}</span>
                <Badge variant={statusBadgeVariant[booking.status]} className="capitalize">
                  {booking.status}
                </Badge>
              </div>
              <p className="text-sm text-neutral-600 truncate">{booking.apartmentName}</p>
              <p className="text-sm text-neutral-600">{booking.guestName}</p>
              <div className="flex justify-between text-xs text-neutral-600">
                <span>
                  {booking.checkIn} - {booking.checkOut}
                </span>
                <span>{booking.guests} guests</span>
              </div>
              <p className="text-sm font-medium text-primary">{formatPrice(booking.total)}</p>
            </div>
          ))}
          {paginatedBookings.length === 0 && (
            <p className="text-center text-neutral-600 py-8">No bookings found.</p>
          )}
        </div>

        {filteredBookings.length > ROWS_PER_PAGE && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
