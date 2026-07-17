import { useMemo, useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isBefore,
  startOfDay,
  parseISO,
  getDate,
} from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { generateOccupiedDates, isDateRangeOverlappingOccupied } from '@/lib/availabilityUtils'
import { cn } from '@/lib/utils'

function toLocalDate(dateStr: string): Date {
  return startOfDay(parseISO(dateStr))
}

function todayStart(): Date {
  return startOfDay(new Date())
}

interface CalendarGridProps {
  apartmentId: string
  checkIn: string
  checkOut: string
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
}

export default function CalendarGrid({
  apartmentId,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: CalendarGridProps) {
  const { t } = useTranslation()
  const today = useMemo(() => todayStart(), [])
  const occupiedDates = useMemo(() => generateOccupiedDates(apartmentId), [apartmentId])

  const [baseMonth, setBaseMonth] = useState(today)

  const leftMonth = startOfMonth(baseMonth)
  const rightMonth = startOfMonth(addMonths(baseMonth, 1))

  const leftDays = eachDayOfInterval({ start: leftMonth, end: endOfMonth(leftMonth) })
  const rightDays = eachDayOfInterval({ start: rightMonth, end: endOfMonth(rightMonth) })

  const leftPad = leftMonth.getDay()
  const rightPad = rightMonth.getDay()

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

  const isRangeStart = useCallback(
    (date: Date) => checkInDate !== null && isSameDay(date, checkInDate),
    [checkInDate]
  )

  const isRangeEnd = useCallback(
    (date: Date) => checkOutDate !== null && isSameDay(date, checkOutDate),
    [checkOutDate]
  )

  const isInRange = useCallback(
    (date: Date) => {
      if (!checkInDate || !checkOutDate) return false
      return date > checkInDate && date < checkOutDate
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

  const canGoBack = !isSameMonth(leftMonth, today)
  const canGoForward = !isSameMonth(rightMonth, startOfMonth(addMonths(today, 18)))

  const renderMonth = (days: Date[], monthStart: Date, pad: number, prefix: string) => (
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-center text-neutral-700 mb-3">
        {format(monthStart, 'MMMM yyyy')}
      </p>
      <div className="grid grid-cols-7 gap-y-0.5 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="text-xs text-neutral-500 text-center py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: pad }).map((_, i) => (
          <div key={`pad-${prefix}-${i}`} />
        ))}
        {days.map((date) => {
          const occupied = isOccupied(date)
          const past = isPast(date)
          const selected = isRangeStart(date) || isRangeEnd(date)
          const inRange = isInRange(date)
          const selectable = isSelectable(date)
          const rangeStart = isRangeStart(date)
          const rangeEnd = isRangeEnd(date)

          let bgPosition = ''
          if (selected || inRange) {
            if (checkInDate && checkOutDate) {
              if (rangeStart) bgPosition = 'left-1/2 right-0'
              else if (rangeEnd) bgPosition = 'left-0 right-1/2'
              else bgPosition = 'left-0 right-0'
            } else {
              bgPosition = 'left-0 right-0'
            }
          }

          return (
            <div
              key={`${prefix}-${format(date, 'yyyy-MM-dd')}`}
              className="relative flex items-center justify-center h-10"
            >
              {bgPosition && <div className={cn('absolute inset-y-0 bg-primary/5', bgPosition)} />}
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                disabled={!selectable}
                className={cn(
                  'relative z-10 flex items-center justify-center size-9 rounded-full text-sm transition-all',
                  selected
                    ? 'bg-primary text-secondary font-medium ring-2 ring-primary/30'
                    : inRange
                      ? 'text-primary font-medium'
                      : occupied
                        ? 'bg-error-light text-error cursor-not-allowed line-through'
                        : past
                          ? 'text-neutral-300 cursor-not-allowed'
                          : 'text-neutral-700 hover:bg-primary/10 cursor-pointer'
                )}
                aria-label={`${format(date, 'MMMM d, yyyy')}${
                  occupied ? ` - ${t('apartmentDetails.occupied')}` : ''
                }${selected ? ` - ${t('apartmentDetails.selected')}` : ''}`}
                aria-disabled={!selectable}
              >
                {getDate(date)}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => setBaseMonth((m) => subMonths(m, 1))}
          disabled={!canGoBack}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="text-sm font-medium text-neutral-700">
          {format(leftMonth, 'MMMM yyyy')} – {format(rightMonth, 'MMMM yyyy')}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => setBaseMonth((m) => addMonths(m, 1))}
          disabled={!canGoForward}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderMonth(leftDays, leftMonth, leftPad, 'left')}
        {renderMonth(rightDays, rightMonth, rightPad, 'right')}
      </div>
    </div>
  )
}
