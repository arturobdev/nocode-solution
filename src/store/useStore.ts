import { create } from 'zustand'
import type { Booking, SearchParams, SearchFilters } from '@/types'

interface AppState {
  bookings: Booking[]
  searchParams: SearchParams
  searchFilters: SearchFilters
  addBooking: (booking: Booking) => void
  setSearchParams: (params: Partial<SearchParams>) => void
  setSearchFilters: (filters: Partial<SearchFilters>) => void
}

export const useStore = create<AppState>((set) => ({
  bookings: [],
  searchParams: {
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  },
  searchFilters: {
    query: '',
    minPrice: 0,
    maxPrice: 1000,
    guests: 0,
    minRating: 0,
    types: [],
  },
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  setSearchParams: (params) =>
    set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
  setSearchFilters: (filters) =>
    set((state) => ({ searchFilters: { ...state.searchFilters, ...filters } })),
}))
