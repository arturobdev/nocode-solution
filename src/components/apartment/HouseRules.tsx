import { LogIn, LogOut, Cigarette, PartyPopper, PawPrint, Moon, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function HouseRules() {
  const { t } = useTranslation()

  const rules = [
    {
      icon: LogIn,
      title: t('houseRules.checkInTime'),
      description: t('houseRules.checkInTimeDesc'),
    },
    {
      icon: LogOut,
      title: t('houseRules.checkOutTime'),
      description: t('houseRules.checkOutTimeDesc'),
    },
    {
      icon: Cigarette,
      title: t('houseRules.smoking'),
      description: t('houseRules.smokingDesc'),
    },
    {
      icon: PartyPopper,
      title: t('houseRules.parties'),
      description: t('houseRules.partiesDesc'),
    },
    {
      icon: PawPrint,
      title: t('houseRules.pets'),
      description: t('houseRules.petsDesc'),
    },
    {
      icon: Moon,
      title: t('houseRules.quietHours'),
      description: t('houseRules.quietHoursDesc'),
    },
    {
      icon: Users,
      title: t('houseRules.maxGuests'),
      description: t('houseRules.maxGuestsDesc'),
    },
  ]

  return (
    <section aria-labelledby="house-rules-heading" className="mb-8">
      <h2 id="house-rules-heading" className="text-xl font-semibold text-primary mb-4">
        {t('houseRules.title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rules.map((rule) => {
          const Icon = rule.icon
          return (
            <div
              key={rule.title}
              className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 bg-white"
            >
              <div className="size-9 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                <Icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary">{rule.title}</h3>
                <p className="text-xs text-neutral-600 mt-0.5">{rule.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
