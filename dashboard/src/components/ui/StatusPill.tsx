export type Status = 'NEW' | 'READ' | 'REPLIED' | 'CLOSED'

interface StatusPillProps {
  status: Status
  label?: string
  className?: string
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  NEW: {
    label: 'New',
    className: 'bg-[var(--accent-soft)] text-[var(--accent)]',
  },
  READ: {
    label: 'Read',
    className: 'bg-[var(--surface-elevated)] text-[var(--text-muted)]',
  },
  REPLIED: {
    label: 'Replied',
    className: 'bg-emerald-500/15 text-emerald-500',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-[var(--surface-elevated)] text-[var(--text-subtle)]',
  },
}

export function StatusPill({ status, label, className = '' }: StatusPillProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-label text-[0.625rem] font-medium ${config.className} ${className}`}
    >
      {label ?? config.label}
    </span>
  )
}
