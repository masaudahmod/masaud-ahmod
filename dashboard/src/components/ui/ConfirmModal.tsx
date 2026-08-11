import type { ReactNode } from 'react'
import { Button } from './Button'

interface ConfirmModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  children?: ReactNode
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  children,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
          </div>
          {children}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              {cancelLabel}
            </Button>
            <Button onClick={onConfirm} disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Please wait…' : confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
