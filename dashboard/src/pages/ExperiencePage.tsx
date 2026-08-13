import { Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { experiences } from '../data/dummy/experience'
import { pageMeta } from '../data/dummy/navigation'

export function ExperiencePage() {
  const meta = pageMeta['/experience']

  return (
    <div>
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg">
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        }
      />

      <div className="relative space-y-6 pl-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-[var(--border)]">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative">
            <div
              className={`absolute -left-6 top-2 h-3.5 w-3.5 rounded-full border-2 ${
                exp.current
                  ? 'border-[var(--accent)] bg-[var(--accent)]'
                  : 'border-[var(--border-subtle)] bg-[var(--surface)]'
              }`}
            />
            <Card padding="lg">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{exp.role}</h3>
                  <p className="text-sm text-[var(--accent)]">{exp.company}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-[var(--text-subtle)]">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{exp.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[var(--surface-elevated)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
