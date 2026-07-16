import type { ApartmentType } from '@/types'

export const APARTMENT_TYPES: { value: ApartmentType; label: string }[] = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'cabin', label: 'Cabin' },
  { value: 'loft', label: 'Loft' },
  { value: 'house', label: 'House' },
  { value: 'penthouse', label: 'Penthouse' },
]

export interface FilterState {
  minPrice: string
  maxPrice: string
  guests: number
  minRating: number
  types: ApartmentType[]
}

export const DEFAULT_FILTERS: FilterState = {
  minPrice: '',
  maxPrice: '',
  guests: 0,
  minRating: 0,
  types: [],
}
