import { useMemo, useState } from 'react'
import { FileText, Image, Trash2, Upload, Video } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Tabs } from '../components/ui/Tabs'
import { mediaItems, mediaTypeFilters } from '../data/dummy/media'
import { pageMeta } from '../data/dummy/navigation'

const tabs = mediaTypeFilters.map((f) => ({ id: f.toLowerCase(), label: f.toUpperCase() }))

const typeIcons = {
  image: Image,
  video: Video,
  document: FileText,
}

export function MediaLibraryPage() {
  const meta = pageMeta['/media']
  const [activeTab, setActiveTab] = useState('all')

  const items = useMemo(() => {
    if (activeTab === 'all') return mediaItems
    const typeMap: Record<string, 'image' | 'video' | 'document'> = {
      image: 'image',
      video: 'video',
      document: 'document',
    }
    return mediaItems.filter((item) => item.type === typeMap[activeTab])
  }, [activeTab])

  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      <Card className="mb-6 border-dashed" padding="lg">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
            <Upload className="h-6 w-6 text-[var(--accent)]" />
          </div>
          <p className="font-medium text-[var(--text-primary)]">Drop files here or click to upload</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Supports images, videos, and documents up to 50MB
          </p>
        </div>
      </Card>

      <Card className="mb-6" padding="md">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = typeIcons[item.type]
          return (
            <Card key={item.id} padding="none" className="overflow-hidden">
              <div className="flex aspect-square items-center justify-center bg-[var(--surface-elevated)]">
                <Icon className="h-10 w-10 text-[var(--text-subtle)]" />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">{item.name}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-[var(--text-subtle)]">
                  <span>{item.size}</span>
                  <span>{item.uploadedAt}</span>
                </div>
                <button
                  type="button"
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
