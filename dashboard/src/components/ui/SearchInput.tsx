import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] py-2 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:font-mono placeholder:text-xs placeholder:text-[var(--text-subtle)] focus:border-[var(--accent)] focus:outline-none"
      />
    </div>
  )
}
