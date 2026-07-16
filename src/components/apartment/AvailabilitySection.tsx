import { useMemo } from 'react'
import { CalendarDays, CircleCheck, CircleX } from 'lucide-react'
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
  parseISO,
} from 'date-fns'

interface AvailabilitySectionProps {
  apartmentId: string
  checkIn: string
  checkOut: string
}

function generateOccupiedDates(apartmentId: string): Date[] {
  const seed = parseInt(apartmentId) * 7
  const today = startOfDay(new Date())
  const occupied: Date[] = []

  for (let i = 0; i < 8; i++) {
    const offset = ((seed + i * 13) % 45) + 1
    const start = addDays(today, offset)
    const length = 2 + ((seed + i) % 4)
    for (let d = 0; d < length; d++) {
      occupied.push(addDays(start, d))
    }
  }

  return occupied
}

export default function AvailabilitySection({
  apartmentId,
  checkIn,
  checkOut,
}: AvailabilitySectionProps) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const occupiedDates = useMemo(() => generateOccupiedDates(apartmentId), [apartmentId])

  const currentMonth = today
  const nextMonth = addDays(startOfMonth(today), 32)
  const monthEnd = endOfMonth(currentMonth)
  const nextMonthEnd = endOfMonth(nextMonth)

  const currentMonthDays = eachDayOfInterval({ start: currentMonth, end: monthEnd })
  const nextMonthDays = eachDayOfInterval({
    start: startOfMonth(nextMonth),
    end: nextMonthEnd,
  })

  const startPad = currentMonth.getDay()

  const isOccupied = (date: Date) => occupiedDates.some((d) => isSameDay(d, date))
  const isPast = (date: Date) => date < today && !isSameDay(date, today)
  const isSelected = (date: Date) => {
    if (!checkIn || !checkOut) return false
    const ci = parseISO(checkIn)
    const co = parseISO(checkOut)
    return date >= ci && date <= co
  }

  const renderDay = (date: Date) => {
    const occupied = isOccupied(date)
    const past = isPast(date)
    const selected = isSelected(date)

    return (
      <div
        key={format(date, 'yyyy-MM-dd')}
        className={`flex items-center justify-center size-9 rounded-full text-sm transition-colors ${
          selected
            ? 'bg-primary text-secondary font-medium'
            : occupied
              ? 'bg-error-light text-error'
              : past
                ? 'text-neutral-300 cursor-not-allowed'
                : 'text-neutral-700 hover:bg-neutral-100'
        }`}
      >
        {date.getDate()}
      </div>
    )
  }

  return (
    <section aria-labelledby="availability-heading">
      <h2
        id="availability-heading"
        className="text-xl font-semibold text-primary mb-4 flex items-center gap-2"
      >
        <CalendarDays className="h-5 w-5" />
        Availability
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm font-medium text-primary mb-3">
            {format(currentMonth, 'MMMM yyyy')}
          </p>
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
            {currentMonthDays.map(renderDay)}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-primary mb-3">{format(nextMonth, 'MMMM yyyy')}</p>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className="text-xs text-neutral-500 text-center py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startOfMonth(nextMonth).getDay() }).map((_, i) => (
              <div key={`pad-next-${i}`} />
            ))}
            {nextMonthDays.map(renderDay)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-primary" />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <CircleX className="size-3.5 text-error" />
          Occupied
        </span>
        <span className="flex items-center gap-1.5">
          <CircleCheck className="size-3.5 text-success" />
          Available
        </span>
      </div>
    </section>
  )
}
