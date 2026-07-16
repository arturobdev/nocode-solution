import { Shield, Clock, Headphones, DollarSign } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description:
      'Your payments and personal information are protected with industry-leading encryption and security measures.',
  },
  {
    icon: Clock,
    title: 'Instant Confirmation',
    description:
      'No waiting around. Get immediate booking confirmation and start planning your trip right away.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our dedicated support team is available around the clock to help with any questions or issues.',
  },
  {
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description:
      'Find a lower price elsewhere? We will match it and give you an additional discount on your booking.',
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-16 lg:py-20 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">Why StayFinder?</h2>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">
            Everything you need for a seamless booking experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center size-14 rounded-xl bg-primary/10 text-primary mb-5">
                  <Icon className="size-7" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
