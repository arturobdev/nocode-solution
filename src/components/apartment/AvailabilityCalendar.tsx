import { useCallback, useMemo } from 'react'
import { CalendarDays, CircleCheck, CircleX } from 'lucide-react'
import { format, startOfDay, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import CalendarGrid from '@/components/apartment/CalendarGrid'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function toLocalDate(dateStr: string): Date {
  return startOfDay(parseISO(dateStr))
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
  const isMobile = useMediaQuery('(max-width: 767px)')

  const checkInDate = useMemo(() => (checkIn ? toLocalDate(checkIn) : null), [checkIn])
  const checkOutDate = useMemo(() => (checkOut ? toLocalDate(checkOut) : null), [checkOut])

  const handleClearSelection = useCallback(() => {
    onCheckInChange('')
    onCheckOutChange('')
  }, [onCheckInChange, onCheckOutChange])

  const datesSummary = useMemo(() => {
    if (checkInDate && checkOutDate) {
      return `${format(checkInDate, 'MMM d')} → ${format(checkOutDate, 'MMM d')}`
    }
    if (checkInDate) {
      return `${format(checkInDate, 'MMM d')} → ...`
    }
    return null
  }, [checkInDate, checkOutDate])

  const calendarContent = (
    <>
      {(checkIn || checkOut) && (
        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex-1 text-sm">
            {checkInDate && (
              <span className="text-primary">
                {t('apartmentDetails.checkIn')}:{' '}
                <strong>{format(checkInDate, 'MMM d, yyyy')}</strong>
              </span>
            )}
            {checkInDate && checkOutDate && <span className="text-neutral-400 mx-2">→</span>}
            {checkOutDate && (
              <span className="text-primary">
                {t('apartmentDetails.checkOut')}:{' '}
                <strong>{format(checkOutDate, 'MMM d, yyyy')}</strong>
              </span>
            )}
            {!checkOut && checkIn && (
              <span className="text-neutral-500 ml-2">— {t('apartmentDetails.checkOut')}...</span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearSelection} className="text-xs h-7">
            {t('apartmentDetails.clear')}
          </Button>
        </div>
      )}

      <div className="mb-6">
        <CalendarGrid
          apartmentId={apartmentId}
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={onCheckInChange}
          onCheckOutChange={onCheckOutChange}
        />
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
    </>
  )

  if (isMobile) {
    return (
      <section aria-labelledby="availability-heading">
        <Accordion type="single" collapsible defaultValue="">
          <AccordionItem value="availability" className="border-none">
            <AccordionTrigger className="py-3 text-xl font-semibold">
              <span id="availability-heading" className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                {t('apartmentDetails.availability')}
              </span>
              {datesSummary && (
                <span className="text-xs text-primary font-medium">{datesSummary}</span>
              )}
            </AccordionTrigger>
            <AccordionContent className="pt-2">{calendarContent}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
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
      {calendarContent}
    </section>
  )
}
