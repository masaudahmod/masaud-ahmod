import { Code2, GitFork, Star } from 'lucide-react'
import { ContributionHeatmap } from '../components/charts/ContributionHeatmap'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import {
  audienceGeo,
  githubStats,
  heatmapData,
  topKeywords,
  trafficSources,
} from '../data/dummy/analytics'
import { pageMeta } from '../data/dummy/navigation'

export function AnalyticsPage() {
  const meta = pageMeta['/analytics']

  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">GitHub Status</h2>
            </div>
            {githubStats.live && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-label text-[0.625rem] text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-label text-[var(--text-subtle)]">Total Stars</p>
              <p className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                {githubStats.totalStars}
              </p>
            </div>
            <div>
              <p className="font-label text-[var(--text-subtle)]">Followers</p>
              <p className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                {githubStats.followers}
              </p>
            </div>
            <div>
              <p className="font-label text-[var(--text-subtle)]">Public Repos</p>
              <p className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                {githubStats.publicRepos}
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
            <p className="font-label text-[var(--text-subtle)]">Top Repository</p>
            <p className="mt-1 font-mono text-sm font-medium text-[var(--text-primary)]">
              {githubStats.topRepo.name}
            </p>
            <div className="mt-2 flex gap-4 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {githubStats.topRepo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                {githubStats.topRepo.forks}
              </span>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Contribution Activity
            </h2>
            <span className="font-label text-[var(--text-subtle)]">Last 90 Days</span>
          </div>
          <ContributionHeatmap data={heatmapData} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
            Traffic Sources
          </h2>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <ProgressBar key={source.label} label={source.label} value={source.value} />
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Top Keywords</h2>
          <div className="space-y-3">
            {topKeywords.map((kw) => (
              <div
                key={kw.keyword}
                className="flex items-center justify-between border-b border-[var(--border)] pb-3 last:border-0"
              >
                <div>
                  <p className="text-sm text-[var(--text-primary)]">{kw.keyword}</p>
                  <p className="text-xs text-[var(--text-subtle)]">Vol: {kw.volume}</p>
                </div>
                <span
                  className={`rounded px-2 py-0.5 font-mono text-xs ${
                    kw.position <= 3
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  Pos {kw.position}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Audience Geo</h2>
          <div className="mb-4 flex h-32 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]">
            <svg viewBox="0 0 360 180" className="h-24 w-full opacity-40">
              <ellipse cx="180" cy="90" rx="160" ry="70" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <ellipse cx="100" cy="80" rx="30" ry="20" fill="var(--accent)" opacity="0.3" />
              <ellipse cx="200" cy="70" rx="25" ry="18" fill="var(--accent)" opacity="0.5" />
              <ellipse cx="260" cy="85" rx="20" ry="15" fill="var(--accent)" opacity="0.4" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-3">
            {audienceGeo.slice(0, 3).map((geo) => (
              <div key={geo.country} className="text-sm">
                <span className="font-medium text-[var(--text-primary)]">{geo.country}:</span>{' '}
                <span className="text-[var(--text-muted)]">{geo.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
