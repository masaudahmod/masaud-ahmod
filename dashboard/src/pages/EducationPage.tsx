import { GraduationCap, Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { educations } from '../data/dummy/education'
import { pageMeta } from '../data/dummy/navigation'

export function EducationPage() {
  const meta = pageMeta['/education']

  return (
    <div>
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg">
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        }
      />

      <div className="space-y-4">
        {educations.map((edu) => (
          <Card key={edu.id} padding="lg">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
                <GraduationCap className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{edu.title}</h3>
                    <p className="text-sm text-[var(--accent)]">{edu.institution}</p>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-subtle)]">{edu.duration}</span>
                </div>
                {edu.description && (
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{edu.description}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
