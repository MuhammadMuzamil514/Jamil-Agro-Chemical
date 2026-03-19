import { useState } from 'react'
import SeoMeta from '../components/SeoMeta'
import { orderService } from '../services/orderService'

const initialState = {
  clientName: '',
  phone: '',
  email: '',
  crop: '',
  productCategory: 'pesticides',
  productName: '',
  quantity: 1,
  location: '',
  message: '',
}

function OrderNow() {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        ...form,
        quantity: Number(form.quantity),
      }
      const response = await orderService.create(payload)
      setSuccess(`Order placed successfully. Tracking ID: ${response?.data?.trackingCode}`)
      setForm(initialState)
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to submit order right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SeoMeta
        title="Order Now"
        description="Submit your farm order directly for fertilizers and pesticides."
        keywords="order agro chemicals, fertilizer order, pesticide order"
      />

      <section className="hero-shell">
        <div className="relative z-10">
          <p className="hero-pill">Direct Client Ordering</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Place Your Farm Order Online</h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50/90 sm:text-lg">
            Secure order submission with instant tracking ID for faster response by our agronomy and dispatch team.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-emerald-200/70 bg-white/95 p-6 shadow-sm md:p-8">
        <h2 className="section-title">Order Form</h2>
        <p className="mt-2 subtle-copy">Fill details and our team will contact you for confirmation.</p>

        {error && <p className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">{error}</p>}
        {success && <p className="mt-4 rounded-lg bg-emerald-100 px-4 py-2 text-sm text-emerald-800">{success}</p>}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <input name="clientName" value={form.clientName} onChange={handleChange} required placeholder="Client Name" className="rounded-lg border border-emerald-200 px-3 py-2" />
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" className="rounded-lg border border-emerald-200 px-3 py-2" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className="rounded-lg border border-emerald-200 px-3 py-2" />
          <input name="crop" value={form.crop} onChange={handleChange} required placeholder="Crop (e.g. Wheat)" className="rounded-lg border border-emerald-200 px-3 py-2" />
          <select name="productCategory" value={form.productCategory} onChange={handleChange} className="rounded-lg border border-emerald-200 px-3 py-2">
            <option value="pesticides">Pesticides</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="crop-solutions">Crop Solutions</option>
          </select>
          <input name="productName" value={form.productName} onChange={handleChange} placeholder="Preferred Product Name" className="rounded-lg border border-emerald-200 px-3 py-2" />
          <input name="quantity" type="number" min={1} value={form.quantity} onChange={handleChange} required placeholder="Quantity" className="rounded-lg border border-emerald-200 px-3 py-2" />
          <input name="location" value={form.location} onChange={handleChange} required placeholder="Location / District" className="rounded-lg border border-emerald-200 px-3 py-2" />
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Additional details" className="md:col-span-2 rounded-lg border border-emerald-200 px-3 py-2" />
          <div className="md:col-span-2">
            <button type="submit" disabled={loading} className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="surface-card">
          <h3 className="text-xl font-bold text-emerald-900">2026 Smart Feature</h3>
          <p className="mt-2 text-sm text-slate-600">Order tracking ID generated instantly with secure backend logging.</p>
        </article>
        <article className="surface-card">
          <h3 className="text-xl font-bold text-emerald-900">Priority Routing</h3>
          <p className="mt-2 text-sm text-slate-600">Crop and category based routing to relevant agronomy team.</p>
        </article>
        <article className="surface-card">
          <h3 className="text-xl font-bold text-emerald-900">Abuse Protection</h3>
          <p className="mt-2 text-sm text-slate-600">Rate-limited order endpoint to reduce spam and bot submissions.</p>
        </article>
      </section>
    </>
  )
}

export default OrderNow
