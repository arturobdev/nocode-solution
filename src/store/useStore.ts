import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Booking, SearchParams, SearchFilters } from '@/types'

const ADMIN_EMAIL = 'admin@mail.com'
const ADMIN_PASSWORD = 'Pa55word'

interface AppState {
  bookings: Booking[]
  searchParams: SearchParams
  searchFilters: SearchFilters
  isAdminAuthenticated: boolean
  addBooking: (booking: Booking) => void
  setSearchParams: (params: Partial<SearchParams>) => void
  setSearchFilters: (filters: Partial<SearchFilters>) => void
  loginAdmin: (email: string, password: string) => boolean
  logoutAdmin: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
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
      isAdminAuthenticated: false,
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      setSearchParams: (params) =>
        set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
      setSearchFilters: (filters) =>
        set((state) => ({ searchFilters: { ...state.searchFilters, ...filters } })),
      loginAdmin: (email, password) => {
        const isValid = email === ADMIN_EMAIL && password === ADMIN_PASSWORD
        if (isValid) {
          set({ isAdminAuthenticated: true })
        }
        return isValid
      },
      logoutAdmin: () => {
        set({ isAdminAuthenticated: false })
      },
    }),
    {
      name: 'stayfinder-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isAdminAuthenticated: state.isAdminAuthenticated }),
    }
  )
)
