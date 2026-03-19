import { useState } from 'react'
import SeoMeta from '../components/SeoMeta'
import { orderService } from '../services/orderService'

function TrackOrder() {
  const [trackingCode, setTrackingCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const response = await orderService.trackByCode(trackingCode.trim().toUpperCase())
      setOrder(response.data || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to fetch order status right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SeoMeta
        title="Track Order"
        description="Track your Jamil Agro Chemicals order using tracking ID."
        keywords="track order, order status, jamil agro"
      />

      <section className="hero-shell">
        <div className="relative z-10">
          <p className="hero-pill">Live Order Visibility</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Track Your Order</h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50/90 sm:text-lg">
            Enter your tracking ID to check current order stage from submission to delivery.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-emerald-200/70 bg-white/95 p-6 shadow-sm md:p-8">
        <h2 className="section-title">Tracking Lookup</h2>
        <p className="mt-2 subtle-copy">Format example: JAC-20260319-ABC123</p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            value={trackingCode}
            onChange={(event) => setTrackingCode(event.target.value)}
            required
            placeholder="Enter tracking code"
            className="w-full rounded-lg border border-emerald-200 px-3 py-2 font-semibold uppercase tracking-wide"
          />
          <button type="submit" disabled={loading} className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">
            {loading ? 'Checking...' : 'Track'}
          </button>
        </form>

        {error && <p className="mt-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

        {order && (
          <article className="mt-6 surface-card">
            <h3 className="text-2xl font-bold text-emerald-900">Order Status: {order.status}</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <p><span className="font-semibold text-emerald-800">Tracking:</span> {order.trackingCode}</p>
              <p><span className="font-semibold text-emerald-800">Crop:</span> {order.crop}</p>
              <p><span className="font-semibold text-emerald-800">Category:</span> {order.productCategory}</p>
              <p><span className="font-semibold text-emerald-800">Product:</span> {order.productName || 'N/A'}</p>
              <p><span className="font-semibold text-emerald-800">Quantity:</span> {order.quantity}</p>
              <p><span className="font-semibold text-emerald-800">Last Update:</span> {new Date(order.updatedAt).toLocaleString()}</p>
            </div>
          </article>
        )}
      </section>
    </>
  )
}

export default TrackOrder
