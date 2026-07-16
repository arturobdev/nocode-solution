import HeroSection from '@/components/home/HeroSection'
import FeaturedDestinations from '@/components/home/FeaturedDestinations'
import PopularApartments from '@/components/home/PopularApartments'
import BenefitsSection from '@/components/home/BenefitsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'

export default function HomePage() {
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
