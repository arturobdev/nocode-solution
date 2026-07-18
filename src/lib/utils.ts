import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function generateBookingNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'SF-'
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = parseISO(checkIn)
  const end = parseISO(checkOut)
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export interface BookingPriceBreakdown {
  subtotal: number
  taxes: number
  fees: number
  total: number
}

const TAX_RATE = 0.12
const SERVICE_FEE = 45

export function calculateBookingPrice(
  pricePerNight: number,
  nights: number
): BookingPriceBreakdown {
  const subtotal = nights > 0 ? pricePerNight * nights : 0
  const taxes = Math.round(subtotal * TAX_RATE)
  const fees = nights > 0 ? SERVICE_FEE : 0
  const total = subtotal + taxes + fees

  return { subtotal, taxes, fees, total }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
