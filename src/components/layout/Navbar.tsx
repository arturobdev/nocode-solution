import { useState, useId } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.svg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuId = useId()
  const { t, i18n } = useTranslation()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/search', label: t('nav.search') },
    { to: '/admin', label: t('nav.admin') },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="container-custom flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="StayFinder" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight text-primary">StayFinder</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'border-b-2 border-accent pb-0.5 text-primary' : 'text-neutral-600'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-neutral-600" />
            <Select value={i18n.language} onValueChange={(lng) => i18n.changeLanguage(lng)}>
              <SelectTrigger
                className="w-auto h-8 text-xs border-0 bg-transparent focus:ring-0 focus:ring-offset-0 px-1"
                aria-label={t('nav.language')}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-primary transition-colors hover:bg-neutral-100 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls={menuId}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id={menuId}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
          mobileOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-custom flex flex-col gap-1 border-t border-neutral-100 pb-4 pt-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-100',
                  isActive ? 'bg-neutral-50 text-primary' : 'text-neutral-600'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-2 px-3 py-2">
            <Globe className="h-4 w-4 text-neutral-600" />
            <Select value={i18n.language} onValueChange={(lng) => i18n.changeLanguage(lng)}>
              <SelectTrigger
                className="w-auto h-8 text-xs border-0 bg-transparent focus:ring-0 focus:ring-offset-0 px-1"
                aria-label={t('nav.language')}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </nav>
  )
}
