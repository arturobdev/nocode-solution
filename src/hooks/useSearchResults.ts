import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apartments } from '@/data/apartments'
import { useStore } from '@/store/useStore'
import type { ApartmentType } from '@/types'
import { DEFAULT_FILTERS } from '@/components/search/filterConstants'
import type { FilterState } from '@/components/search/filterConstants'

export type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating'

export function useSearchResults() {
  const [searchParams] = useSearchParams()
  const store = useStore()

  const locationParam = searchParams.get('location') || store.searchParams.location
  const guestsParam = parseInt(searchParams.get('guests') || String(store.searchParams.guests), 10)

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleType = useCallback((type: ApartmentType) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }))
  }, [])

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const hasActiveFilters =
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.guests > 0 ||
    filters.minRating > 0 ||
    filters.types.length > 0

  const filteredApartments = useMemo(() => {
    let result = [...apartments]

    if (locationParam) {
      const q = locationParam.toLowerCase()
      result = result.filter(
        (a) =>
          a.location.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q)
      )
    }

    if (guestsParam > 0) {
      result = result.filter((a) => a.guests >= guestsParam)
    }

    if (filters.minPrice !== '') {
      const min = parseFloat(filters.minPrice)
      if (!isNaN(min)) result = result.filter((a) => a.price >= min)
    }
    if (filters.maxPrice !== '') {
      const max = parseFloat(filters.maxPrice)
      if (!isNaN(max)) result = result.filter((a) => a.price <= max)
    }
    if (filters.guests > 0) {
      result = result.filter((a) => a.guests >= filters.guests)
    }
    if (filters.minRating > 0) {
      result = result.filter((a) => a.rating >= filters.minRating)
    }
    if (filters.types.length > 0) {
      result = result.filter((a) => filters.types.includes(a.type))
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [locationParam, guestsParam, filters, sortBy])

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    likedIds,
    toggleLike,
    toggleType,
    clearFilters,
    hasActiveFilters,
    filteredApartments,
  }
}
