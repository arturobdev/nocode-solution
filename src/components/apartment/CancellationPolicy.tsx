import { useState } from 'react'
import { CalendarX, Clock, Ban, Info, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function CancellationPolicy() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

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

  const freePolicy = policies[0]

  return (
    <section aria-labelledby="cancellation-heading" className="mb-6 md:mb-8">
      <h2
        id="cancellation-heading"
        className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4"
      >
        {t('cancellationPolicy.title')}
      </h2>

      <div className="bg-white rounded-xl border border-neutral-200 p-4 md:p-5">
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`size-9 rounded-lg ${freePolicy.bgColor} flex items-center justify-center shrink-0`}
          >
            <freePolicy.icon className={`h-4.5 w-4.5 ${freePolicy.color}`} />
          </div>
          <div>
            <h3 className="font-medium text-primary text-sm">{freePolicy.title}</h3>
            <p className="text-sm text-neutral-600 mt-0.5">
              {t('cancellation.freeCancellationShort')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors rounded-lg hover:bg-neutral-50"
          aria-expanded={expanded}
        >
          {expanded ? t('common.showLess') : t('common.learnMore')}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 border-t border-neutral-200 space-y-3">
              {policies.map((policy) => {
                const Icon = policy.icon
                return (
                  <div
                    key={policy.title}
                    className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100"
                  >
                    <div
                      className={`size-8 rounded-lg ${policy.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`h-4 w-4 ${policy.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary text-sm">{policy.title}</h4>
                      <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                        {policy.description}
                      </p>
                    </div>
                  </div>
                )
              })}

              <div className="flex items-start gap-2 p-3 rounded-lg bg-info-light border border-info/20">
                <Info className="h-4 w-4 text-info shrink-0 mt-0.5" />
                <p className="text-xs text-info">{t('cancellation.note')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
