import { CheckCircle, ExternalLink } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import { PageHeader } from '../components/ui/PageHeader'
import { pageMeta } from '../data/dummy/navigation'
import { redirects, seoKeywords, seoPages, siteMeta, sitemapStatus } from '../data/dummy/seo'

export function SeoManagerPage() {
  const meta = pageMeta['/seo']

  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Site Meta Preview</h2>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
            <p className="text-lg text-[var(--accent)]">{siteMeta.title}</p>
            <p className="mt-1 text-sm text-emerald-600">{siteMeta.url}</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{siteMeta.description}</p>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Sitemap Status</h2>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
            <div>
              <p className="font-medium capitalize text-[var(--text-primary)]">{sitemapStatus.status}</p>
              <p className="text-sm text-[var(--text-muted)]">
                {sitemapStatus.indexed}/{sitemapStatus.totalPages} pages indexed
              </p>
              <p className="text-xs text-[var(--text-subtle)]">
                Last generated: {sitemapStatus.lastGenerated}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-6" padding="lg">
        <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Page SEO Scores</h2>
        <DataTable
          columns={[
            {
              key: 'path',
              header: 'PATH',
              render: (page) => (
                <span className="font-mono text-sm text-[var(--text-primary)]">{page.path}</span>
              ),
            },
            {
              key: 'title',
              header: 'TITLE',
              render: (page) => <span className="text-[var(--text-primary)]">{page.title}</span>,
            },
            {
              key: 'description',
              header: 'DESCRIPTION',
              render: (page) => (
                <span className="line-clamp-1 text-[var(--text-muted)]">{page.description}</span>
              ),
            },
            {
              key: 'score',
              header: 'SCORE',
              render: (page) => (
                <span
                  className={`font-mono text-sm ${
                    page.score >= 85 ? 'text-emerald-500' : 'text-[var(--draft)]'
                  }`}
                >
                  {page.score}
                </span>
              ),
            },
          ]}
          data={seoPages}
          keyExtractor={(page) => page.id}
        />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Keyword Rankings</h2>
          <div className="space-y-3">
            {seoKeywords.map((kw) => (
              <div
                key={kw.keyword}
                className="flex items-center justify-between border-b border-[var(--border)] pb-3 last:border-0"
              >
                <span className="text-sm text-[var(--text-primary)]">{kw.keyword}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[var(--text-muted)]">#{kw.rank}</span>
                  <span
                    className={`text-xs ${kw.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}
                  >
                    {kw.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Redirects</h2>
          <div className="space-y-3">
            {redirects.map((redirect) => (
              <div
                key={redirect.id}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] p-3 text-sm"
              >
                <span className="font-mono text-[var(--text-muted)]">{redirect.from}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[var(--text-subtle)]" />
                <span className="font-mono text-[var(--text-primary)]">{redirect.to}</span>
                <span className="ml-auto rounded bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-xs">
                  {redirect.type}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
