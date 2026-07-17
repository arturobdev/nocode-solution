import { useState, useEffect, useCallback } from 'react'
import { Calendar, X } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import CalendarGrid from '@/components/apartment/CalendarGrid'
import { calculateNights } from '@/lib/utils'

interface BookingDatePickerProps {
  apartmentId: string
  checkIn: string
  checkOut: string
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
}

function formatDate(dateStr: string) {
  return format(parseISO(dateStr), 'MMM d, yyyy')
}

export default function BookingDatePicker({
  apartmentId,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: BookingDatePickerProps) {
  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = open ? 'hidden' : ''
      return () => {
        document.body.style.overflow = ''
      }
    }
    return undefined
  }, [isMobile, open])

  const handleCheckInChange = useCallback(
    (value: string) => {
      onCheckInChange(value)
    },
    [onCheckInChange]
  )

  const handleCheckOutChange = useCallback(
    (value: string) => {
      onCheckOutChange(value)
      if (value) setOpen(false)
    },
    [onCheckOutChange]
  )

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0

  const handleClear = () => {
    onCheckInChange('')
    onCheckOutChange('')
  }

  const trigger = (
    <div className="grid grid-cols-2 border border-neutral-200 rounded-lg overflow-hidden cursor-pointer hover:border-neutral-300 transition-colors">
      <div className="px-3 py-2.5 text-left border-r border-neutral-200">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
          {t('apartmentDetails.from', 'From')}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Calendar className="h-3.5 w-3.5 text-neutral-400" />
          <p className={`text-sm ${checkIn ? 'text-primary' : 'text-neutral-400'}`}>
            {checkIn ? formatDate(checkIn) : t('apartmentDetails.selectDate', 'Select date')}
          </p>
        </div>
      </div>
      <div className="px-3 py-2.5 text-left">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
          {t('apartmentDetails.to', 'To')}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Calendar className="h-3.5 w-3.5 text-neutral-400" />
          <p className={`text-sm ${checkOut ? 'text-primary' : 'text-neutral-400'}`}>
            {checkOut ? formatDate(checkOut) : t('apartmentDetails.selectDate', 'Select date')}
          </p>
        </div>
      </div>
    </div>
  )

  const header = (
    <div className="px-5 pt-5 pb-3 border-b border-neutral-200">
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-base font-semibold text-primary">
            {nights > 0
              ? `${nights} night${nights !== 1 ? 's' : ''}`
              : t('apartmentDetails.selectDates', 'Select dates')}
          </p>
          {(checkIn || checkOut) && (
            <p className="text-xs text-neutral-500 mt-0.5">
              {checkIn ? formatDate(checkIn) : '—'} → {checkOut ? formatDate(checkOut) : '—'}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {checkIn && (
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onCheckInChange('')
                }}
                className="p-0.5 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Clear check-in"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <span>{formatDate(checkIn)}</span>
            </div>
          )}
          {checkOut && (
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onCheckOutChange('')
                }}
                className="p-0.5 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Clear check-out"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <span>{formatDate(checkOut)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const footer = (
    <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-200">
      <Button variant="ghost" size="sm" onClick={handleClear} className="text-xs">
        {t('apartmentDetails.clear', 'Clear dates')}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="text-xs">
        {t('apartmentDetails.close', 'Close')}
      </Button>
    </div>
  )

  const grid = (
    <CalendarGrid
      apartmentId={apartmentId}
      checkIn={checkIn}
      checkOut={checkOut}
      onCheckInChange={handleCheckInChange}
      onCheckOutChange={handleCheckOutChange}
    />
  )

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="inset-0 m-0 h-full max-h-full w-full max-w-full rounded-none border-0 p-0 gap-0 flex flex-col translate-none data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full">
          <DialogTitle className="sr-only">Select dates</DialogTitle>
          <DialogDescription className="sr-only">
            Choose your check-in and check-out dates
          </DialogDescription>
          {header}
          <div className="flex-1 overflow-y-auto px-5 py-4">{grid}</div>
          {footer}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[660px] p-0 shadow-xl" align="start" side="bottom">
        {header}
        <div className="px-5 py-4">{grid}</div>
        {footer}
      </PopoverContent>
    </Popover>
  )
}
