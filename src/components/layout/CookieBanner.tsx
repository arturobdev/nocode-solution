import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
      className={`fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${animateIn ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-600 text-center sm:text-left">
          {t('cookieBanner.message')}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" onClick={() => handleConsent('rejected')}>
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
