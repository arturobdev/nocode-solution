import { LogIn, LogOut, Cigarette, PartyPopper, PawPrint, Moon, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
    <section aria-labelledby="house-rules-heading" className="mb-6 md:mb-8">
      <h2
        id="house-rules-heading"
        className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4"
      >
        {t('houseRules.title')}
      </h2>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <Accordion type="single" collapsible>
          {rules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <AccordionItem key={rule.title} value={`item-${index}`} className="px-4">
                <AccordionTrigger className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary">{rule.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-neutral-600 pl-11">{rule.description}</p>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
