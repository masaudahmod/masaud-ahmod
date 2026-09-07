import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitFork,
  Globe,
  RefreshCw,
  Search,
  Star,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { githubIntegration } from '../data/dummy/github'
import { pageMeta } from '../data/dummy/navigation'

interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
}

const ITEMS_PER_PAGE = 6

export function GitHubIntegrationPage() {
  const meta = pageMeta['/github']

  // States
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState(githubIntegration.lastSync)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedType, setSelectedType] = useState('all') // 'all' | 'source' | 'fork'
  const [currentPage, setCurrentPage] = useState(1)

  // API Fetch
  const fetchGitHubRepos = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api.github.com/users/masaudahmod/repos?per_page=100&sort=updated')
      const data = await res.json()
      if (Array.isArray(data)) {
        setRepos(data)
        setLastSyncTime(new Date().toLocaleString())
      }
    } catch (error) {
      console.error('Failed to fetch repositories:', error)
    } finally {
      setLoading(false)
    }
  }


  // Calculate dynamic stats
  const stats = useMemo(() => {
    const totalRepos = repos.length
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)
    return { totalRepos, totalStars, totalForks }
  }, [repos])

  // Get unique languages for filter dropdown
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>()
    repos.forEach((repo) => {
      if (repo.language) langs.add(repo.language)
    })
    return ['All', ...Array.from(langs)]
  }, [repos])

  // Filtered Repositories Logic
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLanguage =
        selectedLanguage === 'All' || repo.language === selectedLanguage

      const matchesType =
        selectedType === 'all' ||
        (selectedType === 'fork' && repo.fork) ||
        (selectedType === 'source' && !repo.fork)

      return matchesSearch && matchesLanguage && matchesType
    })
  }, [repos, searchQuery, selectedLanguage, selectedType])

  // Pagination Logic
  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE) || 1
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredRepos.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredRepos, currentPage])

  // Reset to page 1 on filter/search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value)
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      {/* Top Section: Overview & Settings */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padding="lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                <img
                  src="https://avatars.githubusercontent.com/u/135444399?v=4"
                  alt="masaudahmod"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    @masaudahmod
                  </h2>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-label text-[0.625rem] text-emerald-500">
                    Connected
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Last synced: {lastSyncTime}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchGitHubRepos}
              disabled={loading}
              className="self-start"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Syncing...' : 'Sync Now'}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-(--border) p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--text-primary)]">
                {stats.totalRepos || githubIntegration.stats.syncedRepos}
              </p>
              <p className="mt-1 font-label text-xs text-[var(--text-subtle)]">Public Repos</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--text-primary)]">
                {stats.totalStars}
              </p>
              <p className="mt-1 font-label text-xs text-[var(--text-subtle)]">Total Stars</p>
            </div>
            <div className="rounded-lg border border-(--border) p-4 text-center">
              <p className="text-2xl font-semibold text-[var(--text-primary)]">
                {stats.totalForks}
              </p>
              <p className="mt-1 font-label text-xs text-[var(--text-subtle)]">Total Forks</p>
            </div>
          </div>
        </Card>

        {/* Sync Settings */}
        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
            Sync Settings
          </h2>
          <div className="space-y-3">
            {Object.entries(githubIntegration.syncSettings).map(([key, enabled]) => (
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

      {/* Showcase Section Header & Filters */}
      <Card padding="lg">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Public Repositories Showcase
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Showing {filteredRepos.length} public projects from GitHub
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
              <input
                type="text"
                placeholder="Search repos..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] pl-9 pr-4 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </div>

            {/* Language Dropdown */}
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  Language: {lang}
                </option>
              ))}
            </select>

            {/* Type Filter Buttons */}
            <div className="inline-flex rounded-lg border border-[var(--border)] p-1 bg-[var(--surface-elevated)]">
              <button
                onClick={() => handleTypeChange('all')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  selectedType === 'all'
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTypeChange('source')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  selectedType === 'source'
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Sources
              </button>
              <button
                onClick={() => handleTypeChange('fork')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  selectedType === 'fork'
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Forks
              </button>
            </div>
          </div>
        </div>

        {/* Repositories Cards Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm text-[var(--text-muted)]">
            Fetching repositories from GitHub...
          </div>
        ) : paginatedRepos.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedRepos.map((repo) => (
              <div
                key={repo.id}
                className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 hover:border-[var(--accent)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-1"
                    >
                      {repo.name}
                    </a>
                    {repo.fork && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[0.625rem] text-amber-500 font-medium">
                        <GitFork className="h-3 w-3" /> Forked
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2 min-h-[2rem]">
                    {repo.description || 'No description provided.'}
                  </p>

                  {/* Topics / Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md bg-[var(--surface)] px-1.5 py-0.5 text-[0.625rem] text-[var(--text-subtle)]"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 border-t border-[var(--border)] pt-3 flex items-center justify-between text-xs text-[var(--text-subtle)]">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1 font-medium">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-[var(--text-muted)] hover:text-[var(--accent)]"
                        title="Live Preview"
                      >
                        <Globe className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--accent)]"
                      title="View Code"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-sm text-[var(--text-muted)]">
            No repositories found matching your filters.
          </div>
        )}

        {/* Pagination Control Bar */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
            <p className="text-xs text-[var(--text-muted)]">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[var(--accent)] text-white'
                        : 'border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:bg-[var(--surface)]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Webhook Configuration Section */}
      <Card padding="lg">
        <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
          Webhook Configuration
        </h2>
        <label className="block">
          <span className="font-label text-xs text-[var(--text-subtle)]">Webhook URL</span>
          <input
            type="text"
            readOnly
            value={githubIntegration.webhookUrl}
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 font-mono text-sm text-[var(--text-primary)] outline-none"
          />
        </label>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <Star className="h-4 w-4 text-[var(--accent)]" />
          Webhook receives push, star, and fork events directly from GitHub
        </div>
      </Card>
    </div>
  )
}