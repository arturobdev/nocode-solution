import { useMemo, useCallback } from 'react'
import { CalendarDays, CircleCheck, CircleX } from 'lucide-react'
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfDay,
  parseISO,
  getDate,
} from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { generateOccupiedDates, isDateRangeOverlappingOccupied } from '@/lib/availabilityUtils'

function toLocalDate(dateStr: string): Date {
  return startOfDay(parseISO(dateStr))
}

function todayStart(): Date {
  return startOfDay(new Date())
}

interface AvailabilityCalendarProps {
  apartmentId: string
  checkIn: string
  checkOut: string
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
}

export default function AvailabilityCalendar({
  apartmentId,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: AvailabilityCalendarProps) {
  const { t } = useTranslation()
  const today = useMemo(() => todayStart(), [])
  const occupiedDates = useMemo(() => generateOccupiedDates(apartmentId), [apartmentId])

  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const nextMonthStart = startOfMonth(addMonths(today, 1))
  const nextMonthEnd = endOfMonth(addMonths(today, 1))

  const currentMonthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const nextMonthDays = eachDayOfInterval({ start: nextMonthStart, end: nextMonthEnd })

  const startPad = monthStart.getDay()
  const nextStartPad = nextMonthStart.getDay()

  const isOccupied = useCallback(
    (date: Date) => occupiedDates.some((d) => isSameDay(d, date)),
    [occupiedDates]
  )

  const isPast = useCallback(
    (date: Date) => isBefore(date, today) && !isSameDay(date, today),
    [today]
  )

  const isSelectable = useCallback(
    (date: Date) => !isPast(date) && !isOccupied(date),
    [isPast, isOccupied]
  )

  const checkInDate = useMemo(() => (checkIn ? toLocalDate(checkIn) : null), [checkIn])
  const checkOutDate = useMemo(() => (checkOut ? toLocalDate(checkOut) : null), [checkOut])

  const isInRange = useCallback(
    (date: Date) => {
      if (!checkInDate || !checkOutDate) return false
      return date > checkInDate && date < checkOutDate
    },
    [checkInDate, checkOutDate]
  )

  const isSelected = useCallback(
    (date: Date) => {
      if (!checkInDate && !checkOutDate) return false
      if (checkInDate && isSameDay(date, checkInDate)) return true
      if (checkOutDate && isSameDay(date, checkOutDate)) return true
      return false
    },
    [checkInDate, checkOutDate]
  )

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!isSelectable(date)) return

      const dateStr = format(date, 'yyyy-MM-dd')

      if (!checkIn || (checkIn && checkOut)) {
        onCheckInChange(dateStr)
        onCheckOutChange('')
      } else {
        const startDate = toLocalDate(checkIn)
        if (date <= startDate) {
          onCheckInChange(dateStr)
          onCheckOutChange('')
        } else {
          if (isDateRangeOverlappingOccupied(startDate, date, occupiedDates)) {
            onCheckInChange(dateStr)
            onCheckOutChange('')
          } else {
            onCheckOutChange(dateStr)
          }
        }
      }
    },
    [checkIn, checkOut, isSelectable, onCheckInChange, onCheckOutChange, occupiedDates]
  )

  const handleClearSelection = useCallback(() => {
    onCheckInChange('')
    onCheckOutChange('')
  }, [onCheckInChange, onCheckOutChange])

  const renderDay = (date: Date, prefix: string) => {
    const occupied = isOccupied(date)
    const past = isPast(date)
    const selected = isSelected(date)
    const inRange = isInRange(date)
    const selectable = isSelectable(date)

    return (
      <button
        key={`${prefix}-${format(date, 'yyyy-MM-dd')}`}
        type="button"
        onClick={() => handleDateClick(date)}
        disabled={!selectable}
        className={`relative flex items-center justify-center size-9 rounded-full text-sm transition-all ${
          selected
            ? 'bg-primary text-secondary font-medium ring-2 ring-primary/30'
            : inRange
              ? 'bg-primary/10 text-primary font-medium'
              : occupied
                ? 'bg-error-light text-error cursor-not-allowed line-through'
                : past
                  ? 'text-neutral-300 cursor-not-allowed'
                  : 'text-neutral-700 hover:bg-primary/10 cursor-pointer'
        }`}
        aria-label={`${format(date, 'MMMM d, yyyy')}${
          occupied ? ` - ${t('apartmentDetails.occupied')}` : ''
        }${selected ? ` - ${t('apartmentDetails.selected')}` : ''}`}
        aria-disabled={!selectable}
      >
        {getDate(date)}
      </button>
    )
  }

  return (
    <section aria-labelledby="availability-heading">
      <h2
        id="availability-heading"
        className="text-xl font-semibold text-primary mb-4 flex items-center gap-2"
      >
        <CalendarDays className="h-5 w-5" />
        {t('apartmentDetails.availability')}
      </h2>

      {(checkIn || checkOut) && (
        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex-1 text-sm">
            {checkIn && (
              <span className="text-primary">
                {t('apartmentDetails.checkIn')}:{' '}
                <strong>{format(toLocalDate(checkIn), 'MMM d, yyyy')}</strong>
              </span>
            )}
            {checkIn && checkOut && <span className="text-neutral-400 mx-2">→</span>}
            {checkOut && (
              <span className="text-primary">
                {t('apartmentDetails.checkOut')}:{' '}
                <strong>{format(toLocalDate(checkOut), 'MMM d, yyyy')}</strong>
              </span>
            )}
            {!checkOut && checkIn && (
              <span className="text-neutral-500 ml-2">— {t('apartmentDetails.checkOut')}...</span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearSelection} className="text-xs h-7">
            Clear
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm font-medium text-primary mb-3">{format(today, 'MMMM yyyy')}</p>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className="text-xs text-neutral-500 text-center py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startPad }).map((_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {currentMonthDays.map((d) => renderDay(d, 'cur'))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-primary mb-3">
            {format(nextMonthStart, 'MMMM yyyy')}
          </p>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className="text-xs text-neutral-500 text-center py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: nextStartPad }).map((_, i) => (
              <div key={`pad-next-${i}`} />
            ))}
            {nextMonthDays.map((d) => renderDay(d, 'next'))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-primary" />
          {t('apartmentDetails.selected')}
        </span>
        <span className="flex items-center gap-1.5">
          <CircleX className="size-3.5 text-error" />
          {t('apartmentDetails.occupied')}
        </span>
        <span className="flex items-center gap-1.5">
          <CircleCheck className="size-3.5 text-success" />
          {t('apartmentDetails.available')}
        </span>
      </div>
    </section>
  )
}
