import { CalendarX, Clock, Ban, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function CancellationPolicy() {
  const { t } = useTranslation()

  const policies = [
    {
      icon: CalendarX,
      title: t('cancellation.freeCancellation'),
      description: t('cancellation.freeCancellationDesc'),
      color: 'text-success',
      bgColor: 'bg-success-light',
    },
    {
      icon: Clock,
      title: t('cancellation.partialRefund'),
      description: t('cancellation.partialRefundDesc'),
      color: 'text-warning',
      bgColor: 'bg-warning-light',
    },
    {
      icon: Ban,
      title: t('cancellation.nonRefundable'),
      description: t('cancellation.nonRefundableDesc'),
      color: 'text-error',
      bgColor: 'bg-error-light',
    },
  ]

  return (
    <section aria-labelledby="cancellation-heading" className="mb-8">
      <h2 id="cancellation-heading" className="text-xl font-semibold text-primary mb-4">
        {t('cancellationPolicy.title')}
      </h2>

      <div className="space-y-4">
        {policies.map((policy) => {
          const Icon = policy.icon
          return (
            <div
              key={policy.title}
              className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 bg-white"
            >
              <div
                className={`size-10 rounded-lg ${policy.bgColor} flex items-center justify-center shrink-0`}
              >
                <Icon className={`h-5 w-5 ${policy.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-primary">{policy.title}</h3>
                <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                  {policy.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-info-light border border-info/20">
        <Info className="h-4 w-4 text-info shrink-0 mt-0.5" />
        <p className="text-xs text-info">{t('cancellation.note')}</p>
      </div>
    </section>
  )
}
