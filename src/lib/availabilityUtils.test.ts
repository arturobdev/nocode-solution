import { describe, it, expect } from 'vitest'
import { addDays, startOfDay } from 'date-fns'
import { generateOccupiedDates, isDateRangeOverlappingOccupied } from './availabilityUtils'

describe('generateOccupiedDates', () => {
  it('is deterministic for the same apartment id', () => {
    const first = generateOccupiedDates('3')
    const second = generateOccupiedDates('3')
    expect(first.map((d) => d.getTime())).toEqual(second.map((d) => d.getTime()))
  })

  it('produces different occupied dates for different apartment ids', () => {
    const apartmentOne = generateOccupiedDates('1')
    const apartmentTwo = generateOccupiedDates('2')
    expect(apartmentOne.map((d) => d.getTime())).not.toEqual(apartmentTwo.map((d) => d.getTime()))
  })

  it('only generates dates in the future relative to today', () => {
    const today = startOfDay(new Date())
    const occupied = generateOccupiedDates('5')
    occupied.forEach((date) => {
      expect(date.getTime()).toBeGreaterThan(today.getTime())
    })
  })

  it('returns a non-empty array', () => {
    expect(generateOccupiedDates('1').length).toBeGreaterThan(0)
  })
})

describe('isDateRangeOverlappingOccupied', () => {
  const today = startOfDay(new Date())
  const occupiedDates = [addDays(today, 10), addDays(today, 11), addDays(today, 12)]

  it('returns true when the selected range fully contains an occupied date', () => {
    const start = addDays(today, 9)
    const end = addDays(today, 13)
    expect(isDateRangeOverlappingOccupied(start, end, occupiedDates)).toBe(true)
  })

  it('returns true when the range start lands exactly on an occupied date', () => {
    const start = addDays(today, 10)
    const end = addDays(today, 15)
    expect(isDateRangeOverlappingOccupied(start, end, occupiedDates)).toBe(true)
  })

  it('returns true when the range end lands exactly on an occupied date', () => {
    const start = addDays(today, 5)
    const end = addDays(today, 12)
    expect(isDateRangeOverlappingOccupied(start, end, occupiedDates)).toBe(true)
  })

  it('returns false when the range does not touch any occupied date', () => {
    const start = addDays(today, 1)
    const end = addDays(today, 5)
    expect(isDateRangeOverlappingOccupied(start, end, occupiedDates)).toBe(false)
  })

  it('returns false for an empty occupied dates list', () => {
    const start = addDays(today, 10)
    const end = addDays(today, 12)
    expect(isDateRangeOverlappingOccupied(start, end, [])).toBe(false)
  })

  it('returns true for a single-day range that lands on an occupied date', () => {
    const day = addDays(today, 11)
    expect(isDateRangeOverlappingOccupied(day, day, occupiedDates)).toBe(true)
  })
})
