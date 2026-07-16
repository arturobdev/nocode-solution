import { useState, useEffect } from 'react'
import HeroSection from '@/components/home/HeroSection'
import FeaturedDestinations from '@/components/home/FeaturedDestinations'
import PopularApartments from '@/components/home/PopularApartments'
import BenefitsSection from '@/components/home/BenefitsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import { HomeSkeleton } from '@/components/skeletons/HomeSkeleton'

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <HomeSkeleton />

  return (
    <div>
      <HeroSection />
      <FeaturedDestinations />
      <PopularApartments />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  )
}
