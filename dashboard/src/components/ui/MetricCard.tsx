import type { ComponentType } from 'react'

interface MetricCardProps {
  label: string
  value: string
  subtext?: string
  icon: ComponentType<{ className?: string }>
  trend?: string
  trendPositive?: boolean
}

export function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  trendPositive,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-3 flex items-start justify-between">
        <p className="font-label text-[var(--text-subtle)]">{label}</p>
        <div className="rounded-lg bg-[var(--accent-soft)] p-2">
          <Icon className="h-4 w-4 text-[var(--accent)]" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-[var(--text-primary)]">{value}</p>
      {(subtext || trend) && (
        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          {trend && (
            <span className={trendPositive ? 'text-emerald-500' : 'text-[var(--draft)]'}>
              {trend}
            </span>
          )}
          {subtext && <span>{subtext}</span>}
        </div>
      )}
    </div>
  )
}
