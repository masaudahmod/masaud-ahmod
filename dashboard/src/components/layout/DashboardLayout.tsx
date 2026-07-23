import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="lg:pl-[260px]">
        <Header />
        <main className="dashboard-dots min-h-[calc(100vh-80px)] p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
