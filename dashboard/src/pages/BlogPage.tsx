import { useMemo, useState } from 'react'
import { Edit, Maximize2, MoreHorizontal, Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusPill } from '../components/ui/StatusPill'
import { Tabs } from '../components/ui/Tabs'
import { blogPosts, blogStats, draftPreview, type BlogStatus } from '../data/dummy/blog'
import { pageMeta } from '../data/dummy/navigation'

const articleTabs = [
  { id: 'all', label: 'ALL' },
  { id: 'draft', label: 'DRAFTS' },
  { id: 'published', label: 'PUBLISHED' },
]

export function BlogPage() {
  const meta = pageMeta['/blog']
  const [activeTab, setActiveTab] = useState('all')

  const filteredPosts = useMemo(() => {
    if (activeTab === 'all') return blogPosts
    return blogPosts.filter((post) => post.status === (activeTab as BlogStatus))
  }, [activeTab])

  return (
    <div>
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card padding="lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Recent Articles
              </h2>
              <Tabs tabs={articleTabs} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            <DataTable
              columns={[
                {
                  key: 'title',
                  header: 'TITLE',
                  render: (post) => (
                    <span className="font-medium text-[var(--text-primary)]">{post.title}</span>
                  ),
                },
                {
                  key: 'status',
                  header: 'STATUS',
                  render: (post) => <StatusPill status={post.status} />,
                },
                {
                  key: 'categories',
                  header: 'CATEGORIES',
                  render: (post) => (
                    <div className="flex flex-wrap gap-1">
                      {post.categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded bg-[var(--surface-elevated)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  ),
                },
                {
                  key: 'time',
                  header: 'TIME',
                  render: (post) => (
                    <span className="text-[var(--text-muted)]">{post.readTime}</span>
                  ),
                },
                {
                  key: 'actions',
                  header: '',
                  className: 'w-16',
                  render: () => (
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        aria-label="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        aria-label="More"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  ),
                },
              ]}
              data={filteredPosts}
              keyExtractor={(post) => post.id}
              footer={
                <div className="pt-4 text-center">
                  <button
                    type="button"
                    className="font-label text-[0.625rem] text-[var(--accent)] hover:underline"
                  >
                    LOAD MORE
                  </button>
                </div>
              }
            />
          </Card>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <Card padding="md">
              <p className="font-label text-[var(--text-subtle)]">Total Reads</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                {blogStats.totalReads}
              </p>
              <p className="mt-1 text-xs text-[var(--draft)]">{blogStats.readsTrend}</p>
            </Card>
            <Card padding="md">
              <p className="font-label text-[var(--text-subtle)]">Avg Time</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                {blogStats.avgTime}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{blogStats.avgTimeSubtext}</p>
            </Card>
          </div>

          <Card padding="lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)]">Draft Preview</h3>
              <button
                type="button"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Expand"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
            <h4 className="text-base font-semibold text-[var(--text-primary)]">
              {draftPreview.title}
            </h4>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{draftPreview.excerpt}</p>
            <h5 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
              {draftPreview.section}
            </h5>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
              <code>{draftPreview.code}</code>
            </pre>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                EDIT DRAFT
              </Button>
              <Button size="sm" className="flex-1">
                PUBLISH
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
