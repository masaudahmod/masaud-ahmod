import { Bell, Plus } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { footerNavItems, mainNavItems, pageMeta } from '../../data/dummy/navigation'
import { Button } from '../ui/Button'
import { SearchInput } from '../ui/SearchInput'
import { ThemeToggle } from '../ui/ThemeToggle'

function getSearchPlaceholder(pathname: string) {
  const allItems = [...mainNavItems, ...footerNavItems]
  const match = allItems.find((item) =>
    item.path === '/' ? pathname === '/' : pathname.startsWith(item.path),
  )
  return match?.searchPlaceholder ?? 'Search...'
}

export function Header() {
  const location = useLocation()
  const meta = pageMeta[location.pathname] ?? pageMeta['/']

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="flex flex-col gap-4 px-4 py-4 lg:px-6 lg:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="pl-12 lg:pl-0">
            <p className="font-label text-[var(--text-subtle)]">Portfolio CMS Admin</p>
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">{meta.subtitle}</p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 lg:max-w-xl lg:flex-none">
            <SearchInput
              placeholder={getSearchPlaceholder(location.pathname)}
              className="hidden flex-1 sm:block lg:w-72"
            />
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </button>
            <ThemeToggle />
            <Button size="sm" className="hidden sm:inline-flex">
              <Plus className="h-4 w-4" />
              Quick Create
            </Button>
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-gradient-to-br from-[var(--accent)] to-blue-400" />
          </div>
        </div>

        <SearchInput
          placeholder={getSearchPlaceholder(location.pathname)}
          className="sm:hidden"
        />
      </div>
    </header>
  )
}
