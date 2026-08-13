interface ProgressBarProps {
  label: string
  value: number
  color?: string
  showValue?: boolean
}

export function ProgressBar({
  label,
  value,
  color = 'var(--accent)',
  showValue = true,
}: ProgressBarProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">{label}</span>
        {showValue && (
          <span className="font-mono text-xs text-[var(--text-subtle)]">{value}%</span>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
