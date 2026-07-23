import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Tabs } from '../components/ui/Tabs'
import { pageMeta } from '../data/dummy/navigation'
import { settingsTabs, websiteSettings } from '../data/dummy/settings'

const tabs = settingsTabs.map((t) => ({ id: t.toLowerCase().replace(' ', '-'), label: t.toUpperCase() }))

function FormField({
  label,
  value,
  type = 'text',
  multiline = false,
}: {
  label: string
  value: string | boolean
  type?: string
  multiline?: boolean
}) {
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4">
        <span className="text-sm text-[var(--text-primary)]">{label}</span>
        <div
          className={`relative h-6 w-11 rounded-full ${value ? 'bg-[var(--accent)]' : 'bg-[var(--surface-elevated)]'}`}
        >
          <div
            className={`absolute top-1 h-4 w-4 rounded-full bg-white ${value ? 'left-6' : 'left-1'}`}
          />
        </div>
      </label>
    )
  }

  return (
    <label className="block">
      <span className="font-label text-[var(--text-subtle)]">{label}</span>
      {multiline ? (
        <textarea
          readOnly
          defaultValue={value}
          rows={3}
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
        />
      ) : (
        <input
          type={type}
          readOnly
          defaultValue={value}
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
        />
      )}
    </label>
  )
}

export function WebsiteSettingsPage() {
  const meta = pageMeta['/settings']
  const [activeTab, setActiveTab] = useState('general')

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4">
            <FormField label="Site Name" value={websiteSettings.general.siteName} />
            <FormField label="Tagline" value={websiteSettings.general.tagline} />
            <FormField label="Language" value={websiteSettings.general.language} />
          </div>
        )
      case 'profile':
        return (
          <div className="space-y-4">
            <FormField label="Full Name" value={websiteSettings.profile.name} />
            <FormField label="Designation" value={websiteSettings.profile.designation} />
            <FormField label="Email" value={websiteSettings.profile.email} type="email" />
            <FormField label="Phone" value={websiteSettings.profile.phone} />
            <FormField label="Location" value={websiteSettings.profile.location} />
            <FormField label="Bio" value={websiteSettings.profile.bio} multiline />
          </div>
        )
      case 'social-links':
        return (
          <div className="space-y-4">
            <FormField label="GitHub" value={websiteSettings.social.github} />
            <FormField label="LinkedIn" value={websiteSettings.social.linkedin} />
            <FormField label="Twitter / X" value={websiteSettings.social.twitter} />
            <FormField label="Dev.to" value={websiteSettings.social.devto} />
          </div>
        )
      case 'contact':
        return (
          <div className="space-y-4">
            <FormField label="Form Enabled" value={websiteSettings.contact.formEnabled} />
            <FormField label="Notification Email" value={websiteSettings.contact.notificationEmail} type="email" />
            <FormField label="Auto Reply" value={websiteSettings.contact.autoReply} />
          </div>
        )
      case 'footer':
        return (
          <div className="space-y-4">
            <FormField label="Copyright Text" value={websiteSettings.footer.copyright} />
            <FormField label="Custom Text" value={websiteSettings.footer.customText} />
            <FormField label="Show Social Links" value={websiteSettings.footer.showSocialLinks} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      <Card padding="lg">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />
        {renderContent()}
        <div className="mt-8 flex gap-3 border-t border-[var(--border)] pt-6">
          <Button>Save Changes</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </Card>
    </div>
  )
}
