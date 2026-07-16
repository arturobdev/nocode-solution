import { useState, useEffect } from 'react'
import HeroSection from '@/components/home/HeroSection'
import FeaturedDestinations from '@/components/home/FeaturedDestinations'
import PopularApartments from '@/components/home/PopularApartments'
import BenefitsSection from '@/components/home/BenefitsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import SEO from '@/components/seo/SEO'
import { HomeSkeleton } from '@/components/skeletons/HomeSkeleton'
import { apartments } from '@/data/apartments'

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <HomeSkeleton />

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'StayFinder',
    url: 'https://www.stayfinder.com',
    description:
      'Find your perfect vacation rental. Browse unique apartments, villas, cabins, and lofts worldwide.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.stayfinder.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured StayFinder Apartments',
    itemListElement: apartments
      .filter((a) => a.featured)
      .map((apt, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.stayfinder.com/apartment/${apt.id}`,
        name: apt.name,
      })),
  }

  return (
    <div>
      <SEO canonicalPath="/" structuredData={[structuredData, itemListStructuredData]} />
      <HeroSection />
      <FeaturedDestinations />
      <PopularApartments />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  )
}
