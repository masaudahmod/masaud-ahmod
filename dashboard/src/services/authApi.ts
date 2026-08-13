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
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
    })
    if (refreshed.ok) return request<T>(path, init, false)
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null
  if (!response.ok || !body?.success) throw new ApiRequestError(body?.message ?? 'Request failed.', response.status)
  return body.data as T
}

export type User = { id: string; username: string; email: string; role: string | null }
export type LoginResponse = { user: User } | { verificationRequired: true; email: string }

export const authApi = {
  login: (login: string, password: string) => request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ login, password }) }),
  verifyLogin: (email: string, otp: string, trustDevice: boolean) => request<{ user: User }>('/auth/verify-login', { method: 'POST', body: JSON.stringify({ email, otp, trustDevice }) }),
  register: (username: string, email: string, password: string) => request<{ user: User; verificationRequired: boolean }>('/auth/register', { method: 'POST', body: JSON.stringify({ username, email, password }) }),
  verifyEmail: (email: string, otp: string) => request<{ verified: boolean }>('/auth/verify-email', { method: 'POST', body: JSON.stringify({ email, otp }) }),
  resendOtp: (email: string) => request<{ email: string }>('/auth/resend-otp', { method: 'POST', body: JSON.stringify({ email }) }),
  me: () => request<User>('/auth/me'),
  logout: () => request<void>('/auth/logout', { method: 'POST' }, false),
}
