import {
  Flame,
  CloudRain,
  ShieldCheck,
  Cross,
  Phone,
  Camera,
  CircleCheck,
  CircleX,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const SAFETY_FEATURES = [
  { key: 'smokeDetector', icon: Flame, available: true },
  { key: 'coDetector', icon: CloudRain, available: true },
  { key: 'fireExtinguisher', icon: ShieldCheck, available: true },
  { key: 'firstAidKit', icon: Cross, available: true },
  { key: 'securityCameras', icon: Camera, available: true },
  { key: 'emergencyContacts', icon: Phone, available: true },
]

export default function SafetySection() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="safety-heading" className="mb-6 md:mb-8">
      <h2
        id="safety-heading"
        className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4"
      >
        {t('safety.title')}
      </h2>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <Accordion type="single" collapsible defaultValue="item-0">
          {SAFETY_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <AccordionItem key={feature.key} value={`item-${index}`} className="px-4">
                <AccordionTrigger className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                        feature.available ? 'bg-success-light' : 'bg-neutral-200'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          feature.available ? 'text-success' : 'text-neutral-400'
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-primary">
                        {t(`safety.${feature.key}`)}
                      </span>
                      {feature.available ? (
                        <CircleCheck className="h-3.5 w-3.5 text-success shrink-0" />
                      ) : (
                        <CircleX className="h-3.5 w-3.5 text-error shrink-0" />
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-neutral-600 pl-10">{t(`safety.${feature.key}Desc`)}</p>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
