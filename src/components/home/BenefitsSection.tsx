import { Shield, Clock, Headphones, DollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function BenefitsSection() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: Shield,
      title: t('benefits.secureBooking'),
      description: t('benefits.secureBookingDesc'),
    },
    {
      icon: Clock,
      title: t('benefits.instantConfirmation'),
      description: t('benefits.instantConfirmationDesc'),
    },
    {
      icon: Headphones,
      title: t('benefits.support247'),
      description: t('benefits.support247Desc'),
    },
    {
      icon: DollarSign,
      title: t('benefits.bestPrice'),
      description: t('benefits.bestPriceDesc'),
    },
  ]

  return (
    <section className="py-16 lg:py-20 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
            {t('benefits.title')}
          </h2>
          <p className="text-neutral-600 text-lg max-w-xl mx-auto">{t('benefits.subtitle')}</p>
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
