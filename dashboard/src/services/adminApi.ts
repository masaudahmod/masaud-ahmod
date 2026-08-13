const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5002/api/v1'

type ApiResponse<T> = { success: boolean; message: string; data?: T }

export class ApiRequestError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, init: RequestInit = {}, retryOnUnauthorized = true): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init.headers },
  })

  if (response.status === 401 && retryOnUnauthorized && path !== '/auth/refresh-token') {
    const refreshed = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    if (refreshed.ok) return request<T>(path, init, false)
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null
  if (!response.ok || !body?.success) throw new ApiRequestError(body?.message ?? 'Request failed.', response.status)
  return body.data as T
}

export type AdminUser = {
  id: string
  email: string
  username: string
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BANNED'
  role: { name: string }
  createdAt: string
}

export type AdminInput = {
  email: string
  username: string
  password?: string
  roleName: string
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BANNED'
}

export const adminApi = {
  getAdmins: () => request<AdminUser[]>('/admin/admins'),
  createAdmin: (payload: AdminInput) => request<AdminUser>('/admin/admins', { method: 'POST', body: JSON.stringify(payload) }),
  updateAdmin: (id: string, payload: AdminInput) => request<AdminUser>(`/admin/admins/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAdmin: (id: string) => request<{ id: string }>(`/admin/admins/${id}`, { method: 'DELETE' }),
}
