import { useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react'
import { format, addDays, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

function getToday() {
  return format(new Date(), 'yyyy-MM-dd')
}

function getTomorrow() {
  return format(addDays(new Date(), 1), 'yyyy-MM-dd')
}

function getMinCheckout(checkIn: string) {
  if (!checkIn) return getTomorrow()
  return format(addDays(parseISO(checkIn), 1), 'yyyy-MM-dd')
}

export default function SearchForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const destinationId = useId()
  const checkInId = useId()
  const checkOutId = useId()
  const guestsId = useId()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const today = getToday()
  const minCheckout = getMinCheckout(checkIn)

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('location', destination)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    params.set('guests', String(guests))
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-end gap-4"
    >
      <div className="flex-1 min-w-0">
        <label
          htmlFor={destinationId}
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          {t('hero.destination')}
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
          <input
            id={destinationId}
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder={t('hero.destinationPlaceholder')}
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <label htmlFor={checkInId} className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t('hero.checkIn')}
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
          <input
            id={checkInId}
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => {
              setCheckIn(e.target.value)
              if (checkOut && e.target.value >= checkOut) {
                setCheckOut('')
              }
            }}
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <label htmlFor={checkOutId} className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t('hero.checkOut')}
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
          <input
            id={checkOutId}
            type="date"
            value={checkOut}
            min={minCheckout}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <label htmlFor={guestsId} className="block text-sm font-medium text-neutral-700 mb-1.5">
          {t('hero.guestsLabel')}
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
          <select
            id={guestsId}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors appearance-none cursor-pointer"
          >
            {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? t('common.guest') : t('common.guests')}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500 pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        className={cn(
          'flex items-center justify-center gap-2 bg-primary text-white font-medium cursor-pointer',
          'rounded-lg px-8 py-2.5 text-sm hover:bg-primary-dark transition-colors',
          'md:w-auto w-full'
        )}
      >
        <Search className="size-4" />
        {t('common.search')}
      </button>
    </form>
  )
}
