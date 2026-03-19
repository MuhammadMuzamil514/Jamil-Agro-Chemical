import { useEffect, useMemo, useState } from 'react'
import GlobalError from '../components/GlobalError'
import PageLoader from '../components/PageLoader'
import SeoMeta from '../components/SeoMeta'
import { orderService } from '../services/orderService'
import { plannerService } from '../services/plannerService'
import { productService } from '../services/productService'
import { getCurrentSeasonKey, getSeasonLabel, isSeasonKickoffWindow } from '../utils/seasonal'

const initialForm = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: '',
}

const defaultSeasonKeys = ['winter', 'spring', 'summer', 'monsoon', 'autumn']
const defaultCategorySuggestions = ['fungicide', 'insecticide', 'herbicide', 'npk', 'micronutrient', 'organic', 'specialty', 'potash']

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(initialForm)
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState('')
  const [plannerPage, setPlannerPage] = useState('pesticides')
  const [plannerJson, setPlannerJson] = useState('')
  const [plannerStatus, setPlannerStatus] = useState('')
  const [plannerError, setPlannerError] = useState('')
  const [selectedSeasonKey, setSelectedSeasonKey] = useState('winter')
  const [seasonReminder, setSeasonReminder] = useState(null)

  const isEditing = useMemo(() => Boolean(selectedId), [selectedId])
  const parsedPlannerConfig = useMemo(() => {
    try {
      return JSON.parse(plannerJson || '{}')
    } catch {
      return null
    }
  }, [plannerJson])
  const seasonKeys = useMemo(() => {
    const keys = Object.keys(parsedPlannerConfig?.seasonalUpdates || {})
    return keys.length > 0 ? keys : defaultSeasonKeys
  }, [parsedPlannerConfig])
  const selectedSeasonCategories = useMemo(
    () => parsedPlannerConfig?.seasonalUpdates?.[selectedSeasonKey]?.priorityCategories || [],
    [parsedPlannerConfig, selectedSeasonKey],
  )
  const categorySuggestions = useMemo(() => {
    const productCategories = Array.from(
      new Set(
        products
          .map((product) => String(product?.category || '').trim().toLowerCase())
          .filter(Boolean),
      ),
    )

    return productCategories.length > 0 ? productCategories : defaultCategorySuggestions
  }, [products])

  async function loadProducts() {
    setLoading(true)
    setError('')

    try {
      const data = await productService.getAll()
      setProducts(data.data || [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadOrders() {
      setOrdersLoading(true)
      setOrdersError('')

      try {
        const response = await orderService.getAll()
        if (!ignore) {
          setOrders(response.data || [])
        }
      } catch (err) {
        if (!ignore) {
          setOrdersError(err?.response?.data?.message || 'Could not load orders.')
        }
      } finally {
        if (!ignore) {
          setOrdersLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadPlanner() {
      setPlannerStatus('Loading planner config...')
      setPlannerError('')
      try {
        const response = await plannerService.getByPage(plannerPage)
        const config = response?.data?.config || {}
        if (!ignore) {
          setPlannerJson(JSON.stringify(config, null, 2))
          setPlannerStatus('Planner config loaded.')
        }
      } catch (err) {
        if (!ignore) {
          setPlannerStatus('')
          setPlannerError(err?.response?.data?.message || 'Unable to load planner config.')
        }
      }
    }

    loadPlanner()

    return () => {
      ignore = true
    }
  }, [plannerPage])

  useEffect(() => {
    let ignore = false

    async function loadSeasonReminder() {
      try {
        const response = await plannerService.getByPage('crop-solutions')
        const config = response?.data?.config || {}
        const updatedAtRaw = response?.data?.updatedAt
        const monthSeasonMap = config.monthSeasonMap || {}
        const seasonKey = getCurrentSeasonKey(monthSeasonMap)
        const kickoffWindow = isSeasonKickoffWindow(monthSeasonMap, new Date(), 7)

        let daysSinceUpdate = null
        if (updatedAtRaw) {
          const updatedAt = new Date(updatedAtRaw)
          const dayMs = 24 * 60 * 60 * 1000
          daysSinceUpdate = Math.floor((Date.now() - updatedAt.getTime()) / dayMs)
        }

        const stale = daysSinceUpdate == null || daysSinceUpdate > 35
        if (!ignore && (kickoffWindow || stale)) {
          setSeasonReminder({
            seasonLabel: getSeasonLabel(seasonKey),
            kickoffWindow,
            daysSinceUpdate,
          })
        }
      } catch {
        if (!ignore) {
          setSeasonReminder(null)
        }
      }
    }

    loadSeasonReminder()

    return () => {
      ignore = true
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialForm)
    setSelectedId('')
  }

  const handleEdit = (product) => {
    setSelectedId(product._id)
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    })
  }

  const handleDelete = async (id) => {
    try {
      setError('')
      await productService.remove(id)
      await loadProducts()
    } catch (err) {
      setError(err?.response?.data?.message || 'Delete failed.')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setError('')
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }

      if (isEditing) {
        await productService.update(selectedId, payload)
      } else {
        await productService.create(payload)
      }

      resetForm()
      await loadProducts()
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed.')
    }
  }

  const savePlannerConfig = async () => {
    setPlannerError('')
    setPlannerStatus('Saving planner config...')

    try {
      const parsed = JSON.parse(plannerJson || '{}')
      await plannerService.updateByPage(plannerPage, parsed)
      setPlannerStatus('Planner config saved successfully.')
    } catch (err) {
      if (err instanceof SyntaxError) {
        setPlannerStatus('')
        setPlannerError('Invalid JSON format. Please check planner config JSON.')
        return
      }

      setPlannerStatus('')
      setPlannerError(err?.response?.data?.message || 'Save failed for planner config.')
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    setOrdersError('')

    try {
      await orderService.updateStatus(orderId, status)
      const response = await orderService.getAll()
      setOrders(response.data || [])
    } catch (err) {
      setOrdersError(err?.response?.data?.message || 'Order status update failed.')
    }
  }

  const toggleSeasonPriorityCategory = (category) => {
    if (plannerPage !== 'crop-solutions') {
      setPlannerError('Select crop-solutions page first to manage season priorities.')
      return
    }

    if (!parsedPlannerConfig) {
      setPlannerError('Planner JSON is invalid. Fix JSON first, then use quick category chips.')
      return
    }

    const safeCategory = String(category || '').trim().toLowerCase()
    if (!safeCategory) {
      return
    }

    const nextConfig = {
      ...parsedPlannerConfig,
      seasonalUpdates: {
        ...(parsedPlannerConfig.seasonalUpdates || {}),
      },
    }

    const existingSeason = nextConfig.seasonalUpdates[selectedSeasonKey] || {
      title: `${selectedSeasonKey} update`,
      description: '',
      focus: [],
      recommendation: '',
      priorityCategories: [],
    }

    const currentCategories = Array.isArray(existingSeason.priorityCategories)
      ? existingSeason.priorityCategories.map((item) => String(item).toLowerCase())
      : []

    const updatedCategories = currentCategories.includes(safeCategory)
      ? currentCategories.filter((item) => item !== safeCategory)
      : [...currentCategories, safeCategory]

    nextConfig.seasonalUpdates[selectedSeasonKey] = {
      ...existingSeason,
      priorityCategories: updatedCategories,
    }

    setPlannerJson(JSON.stringify(nextConfig, null, 2))
    setPlannerError('')
    setPlannerStatus('Season priority updated in editor. Click Save Planner JSON to publish.')
  }

  return (
    <section>
      <SeoMeta title="Admin Dashboard" description="Manage products" keywords="admin dashboard, product management" />
      <h1 className="text-3xl font-bold text-emerald-900">Product Management</h1>

      {seasonReminder && (
        <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <p className="text-sm font-semibold">Season Planner Reminder</p>
          <p className="mt-1 text-sm">
            {seasonReminder.kickoffWindow
              ? `${seasonReminder.seasonLabel} season just started. Please review crop planner priorities now.`
              : `${seasonReminder.seasonLabel} planner appears stale. Last update was ${seasonReminder.daysSinceUpdate ?? 'unknown'} days ago.`}
          </p>
          <button
            type="button"
            onClick={() => setPlannerPage('crop-solutions')}
            className="mt-3 rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-600"
          >
            Open Crop Planner JSON
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-xl border border-emerald-100 bg-white p-5 md:grid-cols-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" required className="rounded-md border border-emerald-200 px-3 py-2" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="rounded-md border border-emerald-200 px-3 py-2" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required className="rounded-md border border-emerald-200 px-3 py-2" />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" required className="rounded-md border border-emerald-200 px-3 py-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="md:col-span-2 rounded-md border border-emerald-200 px-3 py-2" rows={4} />
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" className="rounded-md bg-emerald-700 px-4 py-2 text-white">
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="rounded-md border border-slate-300 px-4 py-2 text-slate-700">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {loading && <PageLoader message="Loading dashboard data..." />}
      {!loading && error && <GlobalError title="Dashboard Error" message={error} />}

      {!loading && !error && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-emerald-100 bg-white">
          <table className="min-w-full divide-y divide-emerald-100">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEdit(product)} className="rounded bg-amber-500 px-3 py-1 text-white">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(product._id)} className="rounded bg-red-600 px-3 py-1 text-white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <section className="mt-10 rounded-xl border border-emerald-100 bg-white p-5">
        <h2 className="text-2xl font-bold text-emerald-900">Planner Config Manager</h2>
        <p className="mt-2 text-sm text-slate-600">
          Manage reusable JSON content for pages: pesticides, fertilizers, and crop-solutions.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label htmlFor="planner-page" className="text-sm font-medium text-slate-700">Planner Page</label>
          <select
            id="planner-page"
            value={plannerPage}
            onChange={(event) => setPlannerPage(event.target.value)}
            className="rounded-md border border-emerald-200 px-3 py-2"
          >
            <option value="pesticides">pesticides</option>
            <option value="fertilizers">fertilizers</option>
            <option value="crop-solutions">crop-solutions</option>
          </select>
        </div>

        <textarea
          value={plannerJson}
          onChange={(event) => setPlannerJson(event.target.value)}
          rows={16}
          className="mt-4 w-full rounded-md border border-emerald-200 px-3 py-2 font-mono text-xs"
          placeholder="Planner JSON"
        />

        {plannerPage === 'crop-solutions' && (
          <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4">
            <h3 className="text-sm font-semibold text-emerald-900">Season Priority Categories (No JSON Typing)</h3>
            <p className="mt-1 text-xs text-slate-600">Select season, then click categories to toggle auto-priority cards for Crop Solutions page.</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {seasonKeys.map((season) => {
                const active = season === selectedSeasonKey
                return (
                  <button
                    key={season}
                    type="button"
                    onClick={() => setSelectedSeasonKey(season)}
                    className={
                      active
                        ? 'rounded-full border border-emerald-700 bg-emerald-700 px-3 py-1 text-xs font-semibold text-white'
                        : 'rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-semibold text-emerald-800 hover:border-emerald-500'
                    }
                  >
                    {season}
                  </button>
                )
              })}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {categorySuggestions.map((category) => {
                const isSelected = selectedSeasonCategories.includes(category)
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleSeasonPriorityCategory(category)}
                    className={
                      isSelected
                        ? 'rounded-full border border-amber-600 bg-amber-500 px-3 py-1 text-xs font-semibold text-white'
                        : 'rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-amber-400'
                    }
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {plannerStatus && <p className="mt-3 text-sm text-emerald-700">{plannerStatus}</p>}
        {plannerError && <p className="mt-3 text-sm text-red-600">{plannerError}</p>}

        <button type="button" onClick={savePlannerConfig} className="mt-4 rounded-md bg-emerald-700 px-4 py-2 text-white">
          Save Planner JSON
        </button>
      </section>

      <section className="mt-10 rounded-xl border border-emerald-100 bg-white p-5">
        <h2 className="text-2xl font-bold text-emerald-900">Client Orders</h2>
        <p className="mt-2 text-sm text-slate-600">Orders submitted by website visitors with tracking and status management.</p>

        {ordersError && <p className="mt-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">{ordersError}</p>}
        {ordersLoading && <PageLoader message="Loading client orders..." />}

        {!ordersLoading && !ordersError && (
          <div className="mt-5 overflow-x-auto rounded-lg border border-emerald-100">
            <table className="min-w-full divide-y divide-emerald-100 text-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-900">Tracking</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-900">Client</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-900">Crop</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-900">Category</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-900">Qty</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-900">Status</th>
                  <th className="px-3 py-2 text-left font-semibold text-emerald-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50 bg-white">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-3 py-2 font-semibold text-emerald-800">{order.trackingCode}</td>
                    <td className="px-3 py-2">
                      <p className="font-medium text-slate-800">{order.clientName}</p>
                      <p className="text-xs text-slate-500">{order.phone}</p>
                    </td>
                    <td className="px-3 py-2">{order.crop}</td>
                    <td className="px-3 py-2">{order.productCategory}</td>
                    <td className="px-3 py-2">{order.quantity}</td>
                    <td className="px-3 py-2">
                      <select
                        defaultValue={order.status}
                        onChange={(event) => updateOrderStatus(order._id, event.target.value)}
                        className="rounded border border-emerald-200 px-2 py-1"
                      >
                        <option value="pending">pending</option>
                        <option value="approved">approved</option>
                        <option value="processing">processing</option>
                        <option value="dispatched">dispatched</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-500">auto-save on change</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}

export default AdminDashboard
