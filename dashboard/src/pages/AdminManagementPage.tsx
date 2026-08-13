import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { DataTable } from '../components/ui/DataTable'
import { PageHeader } from '../components/ui/PageHeader'
import { SearchInput } from '../components/ui/SearchInput'
import { adminApi, type AdminInput, type AdminUser } from '../services/adminApi'
import { pageMeta } from '../data/dummy/navigation'

const roles = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'] as const
const statuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED'] as const

const statusStyles: Record<StatusOption, string> = {
  ACTIVE: 'inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-100',
  INACTIVE: 'inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold text-slate-600 bg-slate-100',
  SUSPENDED: 'inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100',
  BANNED: 'inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold text-red-600 bg-red-100',
}

type RoleOption = (typeof roles)[number]
type StatusOption = (typeof statuses)[number]

type AdminFormState = {
  email: string
  username: string
  password: string
  roleName: RoleOption
  status: StatusOption
}

const defaultFormState: AdminFormState = {
  email: '',
  username: '',
  password: '',
  roleName: 'ADMIN',
  status: 'ACTIVE',
}

export function AdminManagementPage() {
  const meta = pageMeta['/admins']
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null)
  const [formState, setFormState] = useState<AdminFormState>(defaultFormState)

  const fetchAdmins = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await adminApi.getAdmins()
      setAdmins(data)
    } catch (err) {
      setError((err as Error).message || 'Unable to load admins.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchAdmins()
  }, [])

  const filteredAdmins = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return admins

    return admins.filter((admin) =>
      [admin.username, admin.email, admin.role.name].some((value) =>
        value?.toLowerCase().includes(query),
      ),
    )
  }, [search, admins])

  const openCreateModal = () => {
    setSelectedAdmin(null)
    setFormState(defaultFormState)
    setError('')
    setIsOpen(true)
  }

  const openEditModal = (admin: AdminUser) => {
    setSelectedAdmin(admin)
    setFormState({
      email: admin.email,
      username: admin.username,
      password: '',
      roleName: admin.role.name as RoleOption,
      status: admin.status,
    })
    setError('')
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedAdmin(null)
    setError('')
  }

  const openDeleteConfirm = (admin: AdminUser) => {
    setDeleteTarget(admin)
    setConfirmDelete(true)
    setError('')
  }

  const closeDeleteConfirm = () => {
    setDeleteTarget(null)
    setConfirmDelete(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    const payload: AdminInput = {
      email: formState.email,
      username: formState.username,
      roleName: formState.roleName,
      status: formState.status,
    }

    if (!selectedAdmin) {
      payload.password = formState.password
    } else if (formState.password) {
      payload.password = formState.password
    }

    try {
      if (selectedAdmin) {
        await adminApi.updateAdmin(selectedAdmin.id, payload)
      } else {
        if (!payload.password) {
          throw new Error('Password is required for new admins.')
        }
        await adminApi.createAdmin(payload)
      }
      await fetchAdmins()
      closeModal()
    } catch (err) {
      setError((err as Error).message || 'Failed to save admin.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setError('')

    try {
      await adminApi.deleteAdmin(deleteTarget.id)
      setAdmins((current) => current.filter((item) => item.id !== deleteTarget.id))
      closeDeleteConfirm()
    } catch (err) {
      setError((err as Error).message || 'Unable to delete admin.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg" onClick={openCreateModal}>
            <Plus className="h-4 w-4" />
            New Admin
          </Button>
        }
      />

      <Card padding="lg">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput placeholder="Search admins by name, email or role..." value={search} onChange={setSearch} className="max-w-lg" />
          <div className="text-sm text-(--text-muted)">
            {filteredAdmins.length} admin{filteredAdmins.length === 1 ? '' : 's'} found
          </div>
        </div>

        {error && <div className="mb-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-700">{error}</div>}

        <DataTable
          columns={[
            {
              key: 'username',
              header: 'USERNAME',
              render: (admin) => (
                <div className="font-medium text-(--text-primary)">{admin.username}</div>
              ),
            },
            {
              key: 'email',
              header: 'EMAIL',
              render: (admin) => <span className="text-(--text-muted)">{admin.email}</span>,
            },
            {
              key: 'role',
              header: 'ROLE',
              render: (admin) => <span className="font-medium text-(--text-muted)">{admin.role.name}</span>,
            },
            {
              key: 'status',
              header: 'STATUS',
              render: (admin) => (
              <span className={statusStyles[admin.status]}>{admin.status}</span>
            ),
            },
            {
              key: 'createdAt',
              header: 'CREATED',
              render: (admin) => (
                <span className="text-(--text-muted)">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </span>
              ),
            },
            {
              key: 'actions',
              header: '',
              className: 'w-28',
              render: (admin) => (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(admin)}
                    className="cursor-pointer rounded-lg p-2 text-(--text-muted) transition hover:text-(--text-primary)"
                    aria-label="Edit admin"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteConfirm(admin)}
                    className="cursor-pointer rounded-lg p-2 text-(--danger) transition hover:text-(--danger)/80"
                    aria-label="Delete admin"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ),
            },
          ]}
          data={filteredAdmins}
          keyExtractor={(admin) => admin.id}
          footer={
            loading ? (
              <div className="py-6 text-center text-sm text-(--text-muted)">Loading admins…</div>
            ) : filteredAdmins.length === 0 ? (
              <div className="py-6 text-center text-sm text-(--text-muted)">No admins found.</div>
            ) : null
          }
        />
      </Card>

      <ConfirmModal
        open={confirmDelete}
        title="Confirm Delete"
        description={`Are you sure you want to remove ${deleteTarget?.username}? This will soft-delete the admin account.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={closeDeleteConfirm}
      />

      {isOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/40 px-4 py-8">
          <div className="mx-auto w-full max-w-3xl rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-2xl sm:p-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-(--text-primary)">
                  {selectedAdmin ? 'Edit Admin' : 'Create New Admin'}
                </h2>
                <p className="mt-2 text-sm text-(--text-muted)">
                  {selectedAdmin
                    ? 'Update admin account details, role, and status.'
                    : 'Create a new admin account for the dashboard.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-(--border) p-2 text-(--text-muted) hover:text-(--text-primary)"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-(--text-subtle)">
                  Email
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                    required
                    className="w-full rounded-xl border border-(--border) bg-(--surface-elevated) px-4 py-3 text-sm text-(--text-primary) focus:border-(--accent) focus:outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-(--text-subtle)">
                  Username
                  <input
                    value={formState.username}
                    onChange={(event) => setFormState({ ...formState, username: event.target.value })}
                    required
                    className="w-full rounded-xl border border-(--border) bg-(--surface-elevated) px-4 py-3 text-sm text-(--text-primary) focus:border-(--accent) focus:outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-(--text-subtle)">
                  Password
                  <input
                    type="password"
                    value={formState.password}
                    onChange={(event) => setFormState({ ...formState, password: event.target.value })}
                    placeholder={selectedAdmin ? 'Leave blank to keep existing password' : 'Create a password'}
                    className="w-full rounded-xl border border-(--border) bg-(--surface-elevated) px-4 py-3 text-sm text-(--text-primary) focus:border-(--accent) focus:outline-none"
                    {...(!selectedAdmin ? { required: true } : {})}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-(--text-subtle)">
                    Role
                    <select
                      value={formState.roleName}
                      onChange={(event) => setFormState({ ...formState, roleName: event.target.value as RoleOption })}
                      className="w-full rounded-xl border border-(--border) bg-(--surface-elevated) px-4 py-3 text-sm text-(--text-primary) focus:border-(--accent) focus:outline-none"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm text-(--text-subtle)">
                    Status
                    <select
                      value={formState.status}
                      onChange={(event) => setFormState({ ...formState, status: event.target.value as StatusOption })}
                      className="w-full rounded-xl border border-(--border) bg-(--surface-elevated) px-4 py-3 text-sm text-(--text-primary) focus:border-(--accent) focus:outline-none"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={closeModal} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                  {saving ? 'Saving...' : selectedAdmin ? 'Update Admin' : 'Create Admin'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
