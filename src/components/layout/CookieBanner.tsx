import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COOKIE_CONSENT_KEY = 'sf-cookie-consent'

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible] = useState(() => !localStorage.getItem(COOKIE_CONSENT_KEY))
  const [dismissed, setDismissed] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (!visible) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimateIn(true))
    })
  }, [visible])

  const handleConsent = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value)
    setAnimateIn(false)
    setTimeout(() => setDismissed(true), 300)
  }

  if (!visible || dismissed) return null

  return (
    <div
      className={`fixed bottom-6 left-4 right-4 z-[60] sm:left-6 sm:right-auto sm:max-w-md transition-all duration-300 ease-out ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Cookie className="size-5 text-primary" />
          </div>
          <p className="text-sm leading-relaxed text-neutral-600">{t('cookieBanner.message')}</p>
        </div>
        <div className="mt-5 flex items-center gap-3 sm:justify-end">
          <Button variant="outline" size="sm" onClick={() => handleConsent('rejected')}>
            {t('cookieBanner.reject')}
          </Button>
          <Button size="sm" onClick={() => handleConsent('accepted')}>
            {t('cookieBanner.accept')}
          </Button>
        </div>
      </div>
    </div>
  )
}
