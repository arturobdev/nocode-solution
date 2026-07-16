import { useState, useId } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.svg'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/admin', label: 'Admin' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuId = useId()

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
        </div>
      </div>
    </nav>
  )
}
