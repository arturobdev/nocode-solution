import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from './useStore'
import type { Booking } from '@/types'

const mockBooking: Booking = {
  id: 'test-1',
  bookingNumber: 'SF-TEST1234',
  apartmentId: '1',
  apartmentName: 'Test Apartment',
  apartmentImage: '/test.jpg',
  guestName: 'Jane Doe',
  guestEmail: 'jane@example.com',
  guestPhone: '+1 555-0000',
  checkIn: '2026-09-01',
  checkOut: '2026-09-05',
  guests: 2,
  nights: 4,
  pricePerNight: 100,
  taxes: 48,
  fees: 45,
  total: 493,
  status: 'confirmed',
  createdAt: new Date().toISOString(),
}

function resetStore() {
  useStore.setState({
    bookings: [],
    isAdminAuthenticated: false,
    searchFilters: {
      query: '',
      minPrice: 0,
      maxPrice: 1000,
      guests: 0,
      minRating: 0,
      types: [],
    },
    searchParams: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
    },
  })
}

describe('useStore - bookings', () => {
  beforeEach(() => {
    resetStore()
  })

  it('starts with an empty bookings array', () => {
    expect(useStore.getState().bookings).toEqual([])
  })

  it('adds a booking to the store', () => {
    useStore.getState().addBooking(mockBooking)
    expect(useStore.getState().bookings).toHaveLength(1)
    expect(useStore.getState().bookings[0]).toEqual(mockBooking)
  })

  it('appends multiple bookings without overwriting existing ones', () => {
    useStore.getState().addBooking(mockBooking)
    useStore.getState().addBooking({ ...mockBooking, id: 'test-2', bookingNumber: 'SF-TEST5678' })
    expect(useStore.getState().bookings).toHaveLength(2)
  })

  it('includes bookings in the persisted (partialized) state', () => {
    useStore.getState().addBooking(mockBooking)
    const persistOptions = useStore.persist.getOptions()
    const partialized = persistOptions.partialize?.(useStore.getState()) as {
      bookings?: Booking[]
    }
    expect(partialized.bookings).toBeDefined()
    expect(partialized.bookings).toHaveLength(1)
  })
})

describe('useStore - admin auth', () => {
  beforeEach(() => {
    resetStore()
  })

  it('starts unauthenticated', () => {
    expect(useStore.getState().isAdminAuthenticated).toBe(false)
  })

  it('authenticates with the correct credentials', () => {
    const result = useStore.getState().loginAdmin('admin@mail.com', 'Pa55word')
    expect(result).toBe(true)
    expect(useStore.getState().isAdminAuthenticated).toBe(true)
  })

  it('rejects an incorrect password', () => {
    const result = useStore.getState().loginAdmin('admin@mail.com', 'wrongpassword')
    expect(result).toBe(false)
    expect(useStore.getState().isAdminAuthenticated).toBe(false)
  })

  it('rejects an incorrect email', () => {
    const result = useStore.getState().loginAdmin('notadmin@mail.com', 'Pa55word')
    expect(result).toBe(false)
    expect(useStore.getState().isAdminAuthenticated).toBe(false)
  })

  it('is case-sensitive on credentials', () => {
    const result = useStore.getState().loginAdmin('Admin@Mail.com', 'Pa55word')
    expect(result).toBe(false)
  })

  it('logs out an authenticated admin', () => {
    useStore.getState().loginAdmin('admin@mail.com', 'Pa55word')
    expect(useStore.getState().isAdminAuthenticated).toBe(true)
    useStore.getState().logoutAdmin()
    expect(useStore.getState().isAdminAuthenticated).toBe(false)
  })

  it('includes isAdminAuthenticated in the persisted state', () => {
    useStore.getState().loginAdmin('admin@mail.com', 'Pa55word')
    const persistOptions = useStore.persist.getOptions()
    const partialized = persistOptions.partialize?.(useStore.getState()) as {
      isAdminAuthenticated?: boolean
    }
    expect(partialized.isAdminAuthenticated).toBe(true)
  })
})

describe('useStore - search params and filters', () => {
  beforeEach(() => {
    resetStore()
  })

  it('updates search params partially without losing other fields', () => {
    useStore.getState().setSearchParams({ location: 'Buenos Aires' })
    const { searchParams } = useStore.getState()
    expect(searchParams.location).toBe('Buenos Aires')
    expect(searchParams.guests).toBe(2)
  })

  it('updates search filters partially without losing other fields', () => {
    useStore.getState().setSearchFilters({ minPrice: 100, maxPrice: 500 })
    const { searchFilters } = useStore.getState()
    expect(searchFilters.minPrice).toBe(100)
    expect(searchFilters.maxPrice).toBe(500)
    expect(searchFilters.minRating).toBe(0)
  })
})
