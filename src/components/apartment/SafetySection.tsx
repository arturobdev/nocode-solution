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
    <section aria-labelledby="safety-heading" className="mb-8">
      <h2 id="safety-heading" className="text-xl font-semibold text-primary mb-4">
        {t('safety.title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SAFETY_FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.key}
              className={`flex items-start gap-3 p-4 rounded-xl border ${
                feature.available
                  ? 'border-neutral-200 bg-white'
                  : 'border-neutral-100 bg-neutral-50 opacity-60'
              }`}
            >
              <div
                className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${
                  feature.available ? 'bg-success-light' : 'bg-neutral-200'
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${
                    feature.available ? 'text-success' : 'text-neutral-400'
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-primary">{t(`safety.${feature.key}`)}</h3>
                  {feature.available ? (
                    <CircleCheck className="h-3.5 w-3.5 text-success shrink-0" />
                  ) : (
                    <CircleX className="h-3.5 w-3.5 text-error shrink-0" />
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">{t(`safety.${feature.key}Desc`)}</p>
                <span
                  className={`inline-block mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    feature.available
                      ? 'bg-success-light text-success'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {feature.available ? t('safety.available') : t('safety.notAvailable')}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
