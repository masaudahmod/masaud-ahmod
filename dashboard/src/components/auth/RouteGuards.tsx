import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { loadSession } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export function AuthBootstrap() {
  const dispatch = useAppDispatch()
  useEffect(() => { void dispatch(loadSession()) }, [dispatch])
  return null
}

export function RequireAuth() {
  const { initialized, user } = useAppSelector((state) => state.auth)
  if (!initialized) return <div className="grid min-h-screen place-items-center bg-[var(--bg)] text-[var(--text-muted)]">Checking your session…</div>
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export function PublicOnly() {
  const { initialized, user } = useAppSelector((state) => state.auth)
  if (!initialized) return <div className="grid min-h-screen place-items-center bg-[var(--bg)] text-[var(--text-muted)]">Checking your session…</div>
  return user ? <Navigate to="/" replace /> : <Outlet />
}
