import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Tabs } from '../components/ui/Tabs'
import { pageMeta } from '../data/dummy/navigation'
import { skillCategories, skills } from '../data/dummy/skills'

const tabs = skillCategories.map((cat) => ({ id: cat.toLowerCase(), label: cat.toUpperCase() }))

export function SkillsPage() {
  const meta = pageMeta['/skills']
  const [activeTab, setActiveTab] = useState('all')

  const filtered = useMemo(() => {
    if (activeTab === 'all') return skills
    return skills.filter((s) => s.category.toLowerCase() === activeTab)
  }, [activeTab])

  return (
    <div>
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        }
      />

      <Card className="mb-6" padding="md">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => (
          <Card key={skill.id} padding="md">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">{skill.name}</h3>
                <p className="mt-0.5 font-label text-[var(--text-subtle)]">{skill.category}</p>
              </div>
              <span className="text-xs text-[var(--text-muted)]">{skill.years} yrs</span>
            </div>
            <ProgressBar label="Proficiency" value={skill.level} showValue />
          </Card>
        ))}
      </div>
    </div>
  )
}
