export interface Apartment {
  id: string
  name: string
  location: string
  city: string
  country: string
  image: string
  images: string[]
  price: number
  rating: number
  reviewCount: number
  guests: number
  bedrooms: number
  bathrooms: number
  type: ApartmentType
  description: string
  amenities: string[]
  featured: boolean
  host: {
    name: string
    avatar: string
    since: number
  }
}

export type ApartmentType = 'apartment' | 'villa' | 'cabin' | 'loft' | 'house' | 'penthouse'

export interface Review {
  id: string
  apartmentId: string
  guestName: string
  guestAvatar: string
  rating: number
  date: string
  comment: string
}

export interface Destination {
  id: string
  name: string
  country: string
  image: string
  apartmentCount: number
}

export interface Booking {
  id: string
  bookingNumber: string
  apartmentId: string
  apartmentName: string
  apartmentImage: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  pricePerNight: number
  taxes: number
  fees: number
  total: number
  status: BookingStatus
  createdAt: string
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed'

export interface SearchFilters {
  query: string
  minPrice: number
  maxPrice: number
  guests: number
  minRating: number
  types: ApartmentType[]
}

export interface SearchParams {
  location: string
  checkIn: string
  checkOut: string
  guests: number
}

export interface GuestInfo {
  fullName: string
  email: string
  phone: string
}

export interface BookingFormData {
  checkIn: string
  checkOut: string
  guests: number
  guestInfo: GuestInfo
}
