import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ADMIN_DASHBOARD_PATH } from '../utils/routes'

function AdminLayout() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-emerald-50">
      <header className="border-b border-emerald-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to={ADMIN_DASHBOARD_PATH} className="text-xl font-semibold text-emerald-900">Jamil Agro Admin</Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
