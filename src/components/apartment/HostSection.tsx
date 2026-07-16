import { useState } from 'react'
import { Star, Clock, MessageCircle, Globe, Award, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/lib/utils'
import type { Apartment } from '@/types'

interface HostSectionProps {
  host: Apartment['host']
  rating: number
  reviewCount: number
}

export default function HostSection({ host, rating, reviewCount }: HostSectionProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const yearsHosting = new Date().getFullYear() - host.since

  const hostLanguages = ['English', 'Español']
  const responseTime = '< 1 hour'
  const responseRate = '98%'
  const bio =
    'Passionate about hospitality and creating memorable experiences for travelers. I take pride in maintaining my properties to the highest standards and always respond quickly to any questions or needs.'

  return (
    <section aria-labelledby="host-heading" className="mb-6 md:mb-8">
      <h2 id="host-heading" className="text-lg md:text-xl font-semibold text-primary mb-3 md:mb-4">
        {t('host.aboutHost')}
      </h2>

      <div className="bg-white rounded-xl border border-neutral-200 p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <Avatar className="h-12 w-12 md:h-16 md:w-16 shrink-0">
            <AvatarFallback className="bg-primary text-secondary text-sm md:text-lg">
              {getInitials(host.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-base md:text-lg font-semibold text-primary">{host.name}</h3>
              <Badge variant="secondary" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                {t('host.superhost')}
              </Badge>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-neutral-600 flex-wrap">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                {rating.toFixed(1)} {t('host.rating')}
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                {yearsHosting} {t('host.yearsHosting')}
              </span>
              <span className="text-neutral-400">
                {reviewCount} {t('common.reviews')}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 md:mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors rounded-lg hover:bg-neutral-50"
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
            <div className="pt-3 md:pt-4 border-t border-neutral-200 mt-3 md:mt-4">
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">{bio}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 md:size-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{t('host.responseTime')}</p>
                    <p className="text-xs md:text-sm font-medium text-primary">{responseTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 md:size-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{t('host.responseRate')}</p>
                    <p className="text-xs md:text-sm font-medium text-primary">{responseRate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 md:size-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">{t('host.languages')}</p>
                    <p className="text-xs md:text-sm font-medium text-primary">
                      {hostLanguages.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
