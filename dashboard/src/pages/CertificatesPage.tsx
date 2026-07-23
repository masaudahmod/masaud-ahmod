import { ExternalLink, Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { certificates } from '../data/dummy/certificates'
import { pageMeta } from '../data/dummy/navigation'

export function CertificatesPage() {
  const meta = pageMeta['/certificates']

  return (
    <div>
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg">
            <Plus className="h-4 w-4" />
            Add Certificate
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.id} padding="lg">
            <span className="inline-block rounded-md bg-[var(--accent-soft)] px-2 py-0.5 font-label text-[0.625rem] text-[var(--accent)]">
              {cert.issuer}
            </span>
            <h3 className="mt-3 font-semibold text-[var(--text-primary)]">{cert.title}</h3>
            <div className="mt-3 space-y-1 text-xs text-[var(--text-muted)]">
              <p>Issued: {cert.issueDate}</p>
              {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
              <p className="font-mono text-[var(--text-subtle)]">{cert.credentialId}</p>
            </div>
            <a
              href={cert.url}
              className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
            >
              View Credential
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}
