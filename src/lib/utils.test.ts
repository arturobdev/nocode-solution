import { describe, it, expect } from 'vitest'
import {
  calculateNights,
  calculateBookingPrice,
  formatPrice,
  generateBookingNumber,
  slugify,
  getInitials,
} from './utils'

describe('calculateNights', () => {
  it('calculates the correct number of nights between two dates', () => {
    expect(calculateNights('2026-08-04', '2026-08-06')).toBe(2)
  })

  it('handles a single night stay', () => {
    expect(calculateNights('2026-08-04', '2026-08-05')).toBe(1)
  })

  it('handles a stay spanning a month boundary', () => {
    expect(calculateNights('2026-07-30', '2026-08-02')).toBe(3)
  })

  it('returns a negative number when checkout is before checkin', () => {
    expect(calculateNights('2026-08-06', '2026-08-04')).toBe(-2)
  })

  it('returns 0 for the same check-in and check-out date', () => {
    expect(calculateNights('2026-08-04', '2026-08-04')).toBe(0)
  })
})

describe('calculateBookingPrice', () => {
  it('calculates subtotal, taxes, fees and total for a valid stay', () => {
    const result = calculateBookingPrice(100, 3)
    expect(result.subtotal).toBe(300)
    expect(result.taxes).toBe(36)
    expect(result.fees).toBe(45)
    expect(result.total).toBe(381)
  })

  it('rounds taxes to the nearest integer', () => {
    const result = calculateBookingPrice(99, 1)
    expect(result.taxes).toBe(12)
  })

  it('returns all zeros when nights is 0', () => {
    const result = calculateBookingPrice(250, 0)
    expect(result).toEqual({ subtotal: 0, taxes: 0, fees: 0, total: 0 })
  })

  it('returns all zeros when nights is negative', () => {
    const result = calculateBookingPrice(250, -2)
    expect(result).toEqual({ subtotal: 0, taxes: 0, fees: 0, total: 0 })
  })

  it('does not charge the service fee when there are no nights', () => {
    const result = calculateBookingPrice(250, 0)
    expect(result.fees).toBe(0)
  })
})

describe('formatPrice', () => {
  it('formats a number as USD currency with no decimals', () => {
    expect(formatPrice(250)).toBe('$250')
  })

  it('formats large numbers with thousands separators', () => {
    expect(formatPrice(1200)).toBe('$1,200')
  })

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0')
  })
})

describe('generateBookingNumber', () => {
  it('starts with the SF- prefix', () => {
    expect(generateBookingNumber()).toMatch(/^SF-/)
  })

  it('generates an 8-character alphanumeric suffix', () => {
    const bookingNumber = generateBookingNumber()
    expect(bookingNumber).toMatch(/^SF-[A-Z0-9]{8}$/)
  })

  it('generates unique values across multiple calls', () => {
    const numbers = new Set(Array.from({ length: 50 }, () => generateBookingNumber()))
    expect(numbers.size).toBe(50)
  })
})

describe('slugify', () => {
  it('lowercases and hyphenates a simple string', () => {
    expect(slugify('Buenos Aires')).toBe('buenos-aires')
  })

  it('strips non-alphanumeric characters', () => {
    expect(slugify("St. Tropez's Villa!")).toBe('st-tropez-s-villa')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  --Skyline Penthouse--  ')).toBe('skyline-penthouse')
  })
})

describe('getInitials', () => {
  it('returns initials for a two-word name', () => {
    expect(getInitials('John Smith')).toBe('JS')
  })

  it('uppercases initials', () => {
    expect(getInitials('john smith')).toBe('JS')
  })

  it('truncates to 2 characters for multi-word names', () => {
    expect(getInitials('John Michael Smith')).toBe('JM')
  })

  it('handles a single-word name', () => {
    expect(getInitials('Cher')).toBe('C')
  })
})
