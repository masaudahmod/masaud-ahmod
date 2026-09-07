import { useMemo, useState } from 'react'
import { Edit, Eye, Plus, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchInput } from '../components/ui/SearchInput'
// import { StatusPill } from '../components/ui/StatusPill'
import { Tabs } from '../components/ui/Tabs'
import { pageMeta } from '../data/dummy/navigation'
import { projectCategories, projects, type ProjectStatus } from '../data/dummy/projects'

const statusTabs = [
  { id: 'all', label: 'All' },
  { id: 'published', label: 'Published' },
  { id: 'draft', label: 'Draft' },
]

export function PortfolioProjectsPage() {
  const meta = pageMeta['/projects']
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        category === 'All Categories' || project.category === category
      const matchesStatus =
        statusFilter === 'all' || project.status === (statusFilter as ProjectStatus)
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, category, statusFilter])

  return (
    <div>
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg">
            <Plus className="h-4 w-4" />
            Add New Project
          </Button>
        }
      />

      <Card className="mb-6" padding="md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            placeholder="Search projects..."
            value={search}
            onChange={setSearch}
            className="lg:max-w-xs"
          />
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
            >
              {projectCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Tabs tabs={statusTabs} activeTab={statusFilter} onChange={setStatusFilter} />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <Card key={project.id} padding="none" className="overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              {/* <div className="absolute right-3 top-3">
                <StatusPill status={project.status || 'CLOSED'} />
              </div> */}
            </div>
            <div className="p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="rounded-md px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
                <span className="text-xs text-[var(--text-subtle)]">{project.updatedAt}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"
                    aria-label="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"
                    aria-label="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-500"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="py-12 text-center">
          <p className="text-[var(--text-muted)]">No projects match your filters.</p>
        </Card>
      )}
    </div>
  )
}
