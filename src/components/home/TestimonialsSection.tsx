import { Quote } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'London, UK',
    initials: 'SM',
    rating: 5,
    text: 'Absolutely loved our stay! The apartment was even better than the photos. The host was incredibly responsive and the location was perfect for exploring the city. Will definitely book again.',
  },
  {
    name: 'David Chen',
    location: 'Toronto, Canada',
    initials: 'DC',
    rating: 5,
    text: 'StayFinder made the whole process effortless. Found a beautiful villa for our family reunion in minutes. The instant confirmation and seamless check-in saved us so much time.',
  },
  {
    name: 'Maria Garcia',
    location: 'Barcelona, Spain',
    initials: 'MG',
    rating: 5,
    text: 'The best travel booking experience I have ever had. The variety of unique properties is amazing and the customer support team went above and beyond to help with our special requests.',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">What Our Guests Say</h2>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            Real experiences from travelers around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl shadow-md p-6 border border-neutral-200/60 flex flex-col"
            >
              <Quote className="size-8 text-primary/20 mb-4 -scale-x-100" />

              <p className="text-neutral-700 italic leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
                  {testimonial.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
                  <p className="text-neutral-600 text-xs">{testimonial.location}</p>
                </div>
                <div className="ml-auto shrink-0">
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
