import { addDays, isSameDay, isWithinInterval, startOfDay } from 'date-fns'

export function generateOccupiedDates(apartmentId: string): Date[] {
  const seed = parseInt(apartmentId) * 7
  const today = startOfDay(new Date())
  const occupied: Date[] = []

  for (let i = 0; i < 8; i++) {
    const offset = ((seed + i * 13) % 45) + 1
    const start = addDays(today, offset)
    const length = 2 + ((seed + i) % 4)
    for (let d = 0; d < length; d++) {
      occupied.push(addDays(start, d))
    }
  }

  return occupied
}

export function isDateRangeOverlappingOccupied(
  start: Date,
  end: Date,
  occupiedDates: Date[]
): boolean {
  return occupiedDates.some(
    (od) => isWithinInterval(od, { start, end }) || isSameDay(od, start) || isSameDay(od, end)
  )
}
