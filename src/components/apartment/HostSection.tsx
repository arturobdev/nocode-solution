import { Star, Clock, MessageCircle, Globe, Award } from 'lucide-react'
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
  const yearsHosting = new Date().getFullYear() - host.since

  const hostLanguages = ['English', 'Español']
  const responseTime = '< 1 hour'
  const responseRate = '98%'
  const bio =
    'Passionate about hospitality and creating memorable experiences for travelers. I take pride in maintaining my properties to the highest standards and always respond quickly to any questions or needs.'

  return (
    <section aria-labelledby="host-heading" className="mb-8">
      <h2 id="host-heading" className="text-xl font-semibold text-primary mb-4">
        {t('host.aboutHost')}
      </h2>

      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarFallback className="bg-primary text-secondary text-lg">
                {getInitials(host.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-primary">{host.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  {t('host.superhost')}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600 mb-2">
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
              <p className="text-sm text-neutral-600 leading-relaxed">{bio}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">{t('host.responseTime')}</p>
              <p className="text-sm font-medium text-primary">{responseTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">{t('host.responseRate')}</p>
              <p className="text-sm font-medium text-primary">{responseRate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">{t('host.languages')}</p>
              <p className="text-sm font-medium text-primary">{hostLanguages.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
