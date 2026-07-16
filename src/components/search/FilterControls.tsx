import { Star, X } from 'lucide-react'
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
  return (
    <div className={cn('space-y-6', inDialog ? 'pt-4' : '')}>
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Price Range</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            min="0"
            value={filters.minPrice}
            onChange={(e) => onFiltersChange((f) => ({ ...f, minPrice: e.target.value }))}
            className="h-9"
          />
          <span className="flex items-center text-neutral-600">-</span>
          <Input
            type="number"
            placeholder="Max"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => onFiltersChange((f) => ({ ...f, maxPrice: e.target.value }))}
            className="h-9"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Guests</h3>
        <Select
          value={String(filters.guests)}
          onValueChange={(v) => onFiltersChange((f) => ({ ...f, guests: Number(v) }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any</SelectItem>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+ guests
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Minimum Rating</h3>
        <Select
          value={String(filters.minRating)}
          onValueChange={(v) => onFiltersChange((f) => ({ ...f, minRating: Number(v) }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any</SelectItem>
            {[1, 2, 3, 4, 5].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+ <Star className="inline h-3 w-3 fill-warning text-warning ml-0.5 -mt-0.5" />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-primary mb-3">Apartment Type</legend>
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
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      {hasActiveFilters && (
        <Button variant="outline" onClick={onClearFilters} className="w-full">
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
