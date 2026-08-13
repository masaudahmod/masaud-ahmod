import { useMemo, useState } from 'react'
import { Mail, Reply } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusPill } from '../components/ui/StatusPill'
import { Tabs } from '../components/ui/Tabs'
import { messages, type MessageStatus } from '../data/dummy/messages'
import { pageMeta } from '../data/dummy/navigation'

const filterTabs = [
  { id: 'all', label: 'ALL' },
  { id: 'new', label: 'UNREAD' },
  { id: 'read', label: 'READ' },
  { id: 'replied', label: 'REPLIED' },
]

export function MessagesPage() {
  const meta = pageMeta['/messages']
  const [activeTab, setActiveTab] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (activeTab === 'all') return messages
    if (activeTab === 'new') return messages.filter((m) => m.unread)
    return messages.filter((m) => m.status === (activeTab as MessageStatus))
  }, [activeTab])

  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      <Card className="mb-6" padding="md">
        <Tabs tabs={filterTabs} activeTab={activeTab} onChange={setActiveTab} />
      </Card>

      <div className="space-y-3">
        {filtered.map((msg) => (
          <Card
            key={msg.id}
            padding="none"
            className={`overflow-hidden ${msg.unread ? 'border-[var(--accent)]/30' : ''}`}
          >
            <button
              type="button"
              onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
              className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-[var(--surface-elevated)]/50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  msg.unread ? 'bg-[var(--accent-soft)]' : 'bg-[var(--surface-elevated)]'
                }`}
              >
                <Mail className={`h-4 w-4 ${msg.unread ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-[var(--text-primary)]">{msg.sender}</span>
                  <StatusPill status={msg.status} />
                  <span className="ml-auto text-xs text-[var(--text-subtle)]">{msg.timestamp}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">{msg.subject}</p>
                <p className="mt-1 line-clamp-1 text-sm text-[var(--text-muted)]">{msg.snippet}</p>
              </div>
            </button>
            {expandedId === msg.id && (
              <div className="border-t border-[var(--border)] bg-[var(--surface-elevated)]/30 p-5">
                <p className="text-sm text-[var(--text-muted)]">{msg.body}</p>
                <p className="mt-2 font-mono text-xs text-[var(--text-subtle)]">{msg.email}</p>
                <div className="mt-4 flex gap-3">
                  <Button size="sm">
                    <Reply className="h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    Mark as Read
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
