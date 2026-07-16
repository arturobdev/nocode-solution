import { useMemo } from 'react'
import { mockBookings, monthlyRevenue } from '@/data/mockBookings'
import { useStore } from '@/store/useStore'
import { formatPrice } from '@/lib/utils'
import StatsCards from '@/components/admin/StatsCards'
import RevenueChart from '@/components/admin/RevenueChart'
import BookingsTable from '@/components/admin/BookingsTable'
import { CalendarCheck, TrendingUp, DollarSign, BarChart3 } from 'lucide-react'

export default function AdminDashboardPage() {
  const { bookings } = useStore()

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
        label: 'Total Bookings',
        value: totalBookings,
        icon: CalendarCheck,
        change: '+12%',
        color: 'text-info',
      },
      {
        label: 'Active Bookings',
        value: activeBookings,
        icon: BarChart3,
        change: '+8%',
        color: 'text-success',
      },
      {
        label: 'Revenue',
        value: formatPrice(totalRevenue),
        icon: DollarSign,
        change: '+23%',
        color: 'text-primary',
      },
      {
        label: 'Occupancy Rate',
        value: `${occupancyRate}%`,
        icon: TrendingUp,
        change: '+5%',
        color: 'text-warning',
      },
    ]
  }, [allBookings])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-neutral-600 mt-1">Manage your bookings and view analytics</p>
      </div>

      <StatsCards stats={stats} />

      <RevenueChart data={monthlyRevenue} />

      <BookingsTable bookings={allBookings} />
    </div>
  )
}
