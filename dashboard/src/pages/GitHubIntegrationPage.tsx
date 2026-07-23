import { RefreshCw, Star } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { GitHubIcon } from '../components/ui/GitHubIcon'
import { PageHeader } from '../components/ui/PageHeader'
import { githubIntegration } from '../data/dummy/github'
import { pageMeta } from '../data/dummy/navigation'

export function GitHubIntegrationPage() {
  const meta = pageMeta['/github']
  const { syncSettings, stats } = githubIntegration

  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padding="lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-elevated)]">
                <GitHubIcon className="h-7 w-7 text-[var(--text-primary)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    @{githubIntegration.username}
                  </h2>
                  {githubIntegration.connected && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-label text-[0.625rem] text-emerald-500">
                      Connected
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Last synced: {githubIntegration.lastSync}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
              Sync Now
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-[var(--border)] p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--text-primary)]">{stats.syncedRepos}</p>
              <p className="mt-1 font-label text-[var(--text-subtle)]">Repos</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--text-primary)]">{stats.totalStars}</p>
              <p className="mt-1 font-label text-[var(--text-subtle)]">Stars</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--text-primary)]">{stats.contributions}</p>
              <p className="mt-1 font-label text-[var(--text-subtle)]">Contributions</p>
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Sync Settings</h2>
          <div className="space-y-4">
            {Object.entries(syncSettings).map(([key, enabled]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-[var(--border)] p-3"
              >
                <span className="capitalize text-sm text-[var(--text-primary)]">{key}</span>
                <div
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    enabled ? 'bg-[var(--accent)]' : 'bg-[var(--surface-elevated)]'
                  }`}
                >
                  <div
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                      enabled ? 'left-6' : 'left-1'
                    }`}
                  />
                </div>
              </label>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="lg">
        <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Webhook Configuration</h2>
        <label className="block">
          <span className="font-label text-[var(--text-subtle)]">Webhook URL</span>
          <input
            type="text"
            readOnly
            value={githubIntegration.webhookUrl}
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 font-mono text-sm text-[var(--text-primary)]"
          />
        </label>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <Star className="h-4 w-4 text-[var(--accent)]" />
          Webhook receives push, star, and fork events from GitHub
        </div>
      </Card>
    </div>
  )
}
