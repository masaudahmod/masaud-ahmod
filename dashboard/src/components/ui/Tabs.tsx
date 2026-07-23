interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-3 py-1.5 font-label text-[0.625rem] transition-colors ${
            activeTab === tab.id
              ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
              : 'text-[var(--text-subtle)] hover:text-[var(--text-muted)]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
