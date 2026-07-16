import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logo from '@/assets/logo.svg'

export default function Footer() {
  const { t } = useTranslation()

  const exploreLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/search', label: t('nav.search') },
    { to: '/search', label: t('footer.popularDestinations') },
  ]

  const supportLinks = [
    { to: '/', label: t('footer.helpCenter') },
    { to: '/', label: t('footer.safety') },
    { to: '/', label: t('footer.cancellation') },
  ]

  const legalLinks = [
    { to: '/', label: t('footer.privacy') },
    { to: '/', label: t('footer.terms') },
  ]

  return (
    <footer className="bg-primary">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src={logo} alt="StayFinder" className="h-7 w-auto" />
              <span className="text-lg font-bold text-white">StayFinder</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-400">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.explore')}
            </h3>
            <nav aria-label="Explore">
              <ul className="space-y-2.5">
                {exploreLinks.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      to={link.to}
                      className="text-sm text-neutral-400 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.support')}
            </h3>
            <nav aria-label="Support">
              <ul className="space-y-2.5">
                {supportLinks.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link
                      to={link.to}
                      className="text-sm text-neutral-400 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.contact')}
            </h3>
            <address className="not-italic space-y-3">
              <a
                href="mailto:hello@stayfinder.com"
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 shrink-0" />
                hello@stayfinder.com
              </a>
              <a
                href="tel:+18005551234"
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +1 (800) 555-1234
              </a>
              <p className="flex items-start gap-2 text-sm text-neutral-400">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  123 Travel Plaza, Suite 400
                  <br />
                  San Francisco, CA 94102
                </span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>{t('footer.copyright')}</p>
          <nav aria-label="Legal" className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-neutral-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
