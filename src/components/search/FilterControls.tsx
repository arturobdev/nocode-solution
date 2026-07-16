import { Star, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ApartmentType } from '@/types'
import { APARTMENT_TYPES } from './filterConstants'
import type { FilterState } from './filterConstants'

interface FilterControlsProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState | ((prev: FilterState) => FilterState)) => void
  onToggleType: (type: ApartmentType) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  inDialog?: boolean
}

export default function FilterControls({
  filters,
  onFiltersChange,
  onToggleType,
  onClearFilters,
  hasActiveFilters,
  inDialog,
}: FilterControlsProps) {
  const { t } = useTranslation()

  const typeLabels: Record<ApartmentType, string> = {
    apartment: t('searchPage.apartment'),
    villa: t('searchPage.villa'),
    cabin: t('searchPage.cabin'),
    loft: t('searchPage.loft'),
    house: t('searchPage.house'),
    penthouse: t('searchPage.penthouse'),
  }

  return (
    <div className={cn('space-y-6', inDialog ? 'pt-4' : '')}>
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">{t('searchPage.priceRange')}</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            min="0"
            value={filters.minPrice}
            onChange={(e) => {
              const raw = e.target.value
              if (raw !== '' && Number(raw) < 0) return
              onFiltersChange((f) => {
                const next = { ...f, minPrice: raw }
                if (raw !== '' && f.maxPrice !== '' && Number(raw) > Number(f.maxPrice)) {
                  next.maxPrice = raw
                }
                return next
              })
            }}
            className="h-9"
          />
          <span className="flex items-center text-neutral-600">-</span>
          <Input
            type="number"
            placeholder="Max"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => {
              const raw = e.target.value
              if (raw !== '' && Number(raw) < 0) return
              onFiltersChange((f) => {
                const next = { ...f, maxPrice: raw }
                if (raw !== '' && f.minPrice !== '' && Number(raw) < Number(f.minPrice)) {
                  next.minPrice = raw
                }
                return next
              })
            }}
            className="h-9"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">{t('searchPage.guestsLabel')}</h3>
        <Select
          value={String(filters.guests)}
          onValueChange={(v) => onFiltersChange((f) => ({ ...f, guests: Number(v) }))}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('searchPage.any')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{t('searchPage.any')}</SelectItem>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+ {t('common.guests')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">{t('searchPage.minRating')}</h3>
        <Select
          value={String(filters.minRating)}
          onValueChange={(v) => onFiltersChange((f) => ({ ...f, minRating: Number(v) }))}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('searchPage.any')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{t('searchPage.any')}</SelectItem>
            {[1, 2, 3, 4, 5].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+ <Star className="inline h-3 w-3 fill-warning text-warning ml-0.5 -mt-0.5" />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-primary mb-3">
          {t('searchPage.apartmentType')}
        </legend>
        <div className="space-y-2">
          {APARTMENT_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer hover:text-primary"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type.value)}
                onChange={() => onToggleType(type.value)}
                className="h-4 w-4 rounded border-neutral-200 text-primary focus:ring-primary/50"
              />
              {typeLabels[type.value]}
            </label>
          ))}
        </div>
      </fieldset>

      {hasActiveFilters && (
        <Button variant="outline" onClick={onClearFilters} className="w-full">
          <X className="h-4 w-4 mr-1" />
          {t('common.clearFilters')}
        </Button>
      )}
    </div>
  )
}
