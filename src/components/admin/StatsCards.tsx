import { CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface Stat {
  label: string
  value: string | number
  icon: typeof CalendarCheck
  change: string
  color: string
}

interface StatsCardsProps {
  stats: Stat[]
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="shadow-sm rounded-xl p-6 border border-neutral-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                <p className="text-xs text-success mt-1">{stat.change}</p>
              </div>
              <div className={cn('p-3 rounded-xl bg-neutral-50', stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export type { Stat }
