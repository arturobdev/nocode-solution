import { Link } from 'react-router-dom'
import logo from '@/assets/logo.svg'

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/search', label: 'Popular Destinations' },
]

const supportLinks = [
  { to: '/', label: 'Help Center' },
  { to: '/', label: 'Safety' },
  { to: '/', label: 'Cancellation' },
]

const legalLinks = [
  { to: '/', label: 'Privacy Policy' },
  { to: '/', label: 'Terms of Service' },
]

export default function Footer() {
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
              Discover and book the perfect stay for your next adventure. Comfort, quality, and
              unforgettable experiences await.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <nav aria-label="Explore">
              <ul className="space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
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
              Support
            </h3>
            <nav aria-label="Support">
              <ul className="space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={link.label}>
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
              Legal
            </h3>
            <nav aria-label="Legal">
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
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
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-neutral-500">
          &copy; 2026 StayFinder. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
