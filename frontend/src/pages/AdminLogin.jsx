import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import SeoMeta from '../components/SeoMeta'
import { useAuth } from '../hooks/useAuth'
import { ADMIN_DASHBOARD_PATH } from '../utils/routes'

function AdminLogin() {
  const { isAuthenticated, login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={ADMIN_DASHBOARD_PATH} replace />
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(form)
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid login credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto mt-16 max-w-md rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
      <SeoMeta title="Admin Login" description="Admin portal login" keywords="admin login" />
      <h1 className="text-2xl font-bold text-emerald-900">Admin Login</h1>
      {error && <p className="mt-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          required
          className="w-full rounded-md border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          required
          className="w-full rounded-md border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-emerald-700 px-4 py-2 font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </section>
  )
}

export default AdminLogin
