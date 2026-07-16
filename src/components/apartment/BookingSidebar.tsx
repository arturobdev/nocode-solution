import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Users, Calendar, Shield, Mail, Phone, User } from 'lucide-react'
import { formatPrice, getInitials } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Apartment } from '@/types'

const guestInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
})

type GuestInfoValues = z.infer<typeof guestInfoSchema>

interface BookingSidebarProps {
  apartment: Apartment
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  subtotal: number
  taxes: number
  fees: number
  total: number
  canReserve: boolean
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
  onGuestsChange: (value: number) => void
  onReserve: (guestInfo: GuestInfoValues) => void
}

export default function BookingSidebar({
  apartment,
  checkIn,
  checkOut,
  guests,
  nights,
  subtotal,
  taxes,
  fees,
  total,
  canReserve,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onReserve,
}: BookingSidebarProps) {
  const checkInId = useId()
  const checkOutId = useId()
  const guestsId = useId()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestInfoValues>({
    resolver: zodResolver(guestInfoSchema),
  })

  const onSubmit = (data: GuestInfoValues) => {
    onReserve(data)
  }

  return (
    <div className="w-full lg:w-96 shrink-0">
      <div className="sticky top-24">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-bold text-primary">{formatPrice(apartment.price)}</span>
              <span className="text-neutral-600">/night</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor={checkInId} className="mb-1.5 block">
                  Check-in
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />
                  <Input
                    id={checkInId}
                    type="date"
                    value={checkIn}
                    onChange={(e) => onCheckInChange(e.target.value)}
                    className="pl-10"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={checkOutId} className="mb-1.5 block">
                  Check-out
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />
                  <Input
                    id={checkOutId}
                    type="date"
                    value={checkOut}
                    onChange={(e) => onCheckOutChange(e.target.value)}
                    className="pl-10"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={guestsId} className="mb-1.5 block">
                  Guests
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />
                  <Input
                    id={guestsId}
                    type="number"
                    min={1}
                    max={apartment.guests}
                    value={guests}
                    onChange={(e) =>
                      onGuestsChange(Math.max(1, Math.min(apartment.guests, Number(e.target.value))))
                    }
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4 mb-4">
              <h3 className="text-sm font-semibold text-primary">Guest Information</h3>
              <div>
                <Label htmlFor="fullName" className="mb-1.5 block">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />
                  <Input
                    id="fullName"
                    placeholder="John Smith"
                    className="pl-10"
                    {...register('fullName')}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-error mt-1">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="mb-1.5 block">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-error mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="mb-1.5 block">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 555-0123"
                    className="pl-10"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-error mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">
                  {formatPrice(apartment.price)} x {nights} night{nights !== 1 ? 's' : ''}
                </span>
                <span className="text-primary font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Taxes (12%)</span>
                <span className="text-primary font-medium">{formatPrice(taxes)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Service fee</span>
                <span className="text-primary font-medium">{formatPrice(fees)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-primary">Total</span>
              <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
            </div>

            <Button
              type="submit"
              disabled={!canReserve}
              className="w-full py-3 text-base rounded-lg"
            >
              Reserve Now
            </Button>
            <p className="text-center text-xs text-neutral-600 mt-3">You won't be charged yet</p>
          </div>
        </form>

        <div className="mt-6 bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-secondary">
                {getInitials(apartment.host.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-primary">{apartment.host.name}</h4>
              <p className="text-xs text-neutral-600">Host since {apartment.host.since}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Shield className="h-4 w-4 text-success" />
            <span>Identity verified</span>
          </div>
        </div>
      </div>
    </div>
  )
}
