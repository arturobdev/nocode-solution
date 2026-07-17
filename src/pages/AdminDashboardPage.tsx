import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { mockBookings, monthlyRevenue } from '@/data/mockBookings'
import { useStore } from '@/store/useStore'
import { formatPrice } from '@/lib/utils'
import StatsCards from '@/components/admin/StatsCards'
import RevenueChart from '@/components/admin/RevenueChart'
import BookingsTable from '@/components/admin/BookingsTable'
import SEO from '@/components/seo/SEO'
import { Button } from '@/components/ui/button'
import { CalendarCheck, TrendingUp, DollarSign, BarChart3, LogOut } from 'lucide-react'

export default function AdminDashboardPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { bookings } = useStore()
  const logoutAdmin = useStore((state) => state.logoutAdmin)

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login')
  }

  const allBookings = useMemo(() => [...bookings, ...mockBookings], [bookings])

  const stats = useMemo(() => {
    const totalBookings = allBookings.length
    const activeBookings = allBookings.filter(
      (b) => b.status === 'confirmed' || b.status === 'pending'
    ).length
    const totalRevenue = allBookings.reduce((sum, b) => sum + b.total, 0)
    const occupancyRate = totalBookings > 0 ? Math.round((activeBookings / totalBookings) * 100) : 0

    return [
      {
        label: t('admin.totalBookings'),
        value: totalBookings,
        icon: CalendarCheck,
        change: '+12%',
        color: 'text-info',
      },
      {
        label: t('admin.activeBookings'),
        value: activeBookings,
        icon: BarChart3,
        change: '+8%',
        color: 'text-success',
      },
      {
        label: t('admin.revenue'),
        value: formatPrice(totalRevenue),
        icon: DollarSign,
        change: '+23%',
        color: 'text-primary',
      },
      {
        label: t('admin.occupancyRate'),
        value: `${occupancyRate}%`,
        icon: TrendingUp,
        change: '+5%',
        color: 'text-warning',
      },
    ]
  }, [allBookings, t])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEO title="Admin Dashboard" noindex />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">{t('admin.title')}</h1>
          <p className="text-neutral-600 mt-1">{t('admin.subtitle')}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          {t('auth.logout')}
        </Button>
      </div>

      <StatsCards stats={stats} />

      <RevenueChart data={monthlyRevenue} />

      <BookingsTable bookings={allBookings} />
    </div>
  )
}
