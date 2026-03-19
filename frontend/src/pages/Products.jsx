import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalError from '../components/GlobalError'
import PageLoader from '../components/PageLoader'
import SeoMeta from '../components/SeoMeta'
import { productService } from '../services/productService'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadProducts() {
      try {
        const data = await productService.getAll()
        if (!ignore) {
          setProducts(data.data || [])
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || 'Unable to load products.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <SeoMeta
        title="Products"
        description="Browse our crop protection and nutrition products."
        keywords="pesticides, herbicides, fungicides, foliar nutrition"
      />
      <section className="hero-shell">
        <div className="relative z-10">
          <p className="hero-pill">Product Portfolio</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Complete Input Programs for Every Crop Stage</h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50/90 sm:text-lg">
            Fertilizers, crop protection, and soil-health focused products aligned to regional conditions and seasonal crop demands.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Macronutrient Fertilizers', to: '/fertilizers' },
          { title: 'Micronutrients', to: '/fertilizers' },
          { title: 'Crop Protection', to: '/pesticides' },
          { title: 'Soil Health', to: '/crop-solutions' },
        ].map((item) => (
          <article key={item.title} className="surface-card">
            <h2 className="text-xl font-bold text-emerald-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">Field-tested formulations with practical usage guidance.</p>
            <Link to={item.to} className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              Explore Category
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="section-title">Live Product Catalog</h2>
        <p className="mt-2 subtle-copy">Scientifically balanced formulas for healthier crops and higher returns.</p>

        {loading && <PageLoader message="Loading products..." />}
        {!loading && error && <GlobalError title="Products Unavailable" message={error} />}

        {!loading && !error && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product._id}
                className="surface-card"
              >
                <h2 className="text-lg font-semibold text-emerald-900">{product.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{product.category}</span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Stock: {product.stock}</span>
                </div>
                <p className="mt-4 text-lg font-bold text-emerald-800">Rs. {product.price}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 rounded-[22px] bg-gradient-to-r from-emerald-800 to-emerald-600 p-8 text-center text-white">
        <h2 className="text-3xl font-bold">Need a Custom Product Mix?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/90">
          Share your crop and soil condition. We will help build a stage-wise recommendation plan.
        </p>
        <a href="/contact" className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900">
          Request Quote
        </a>
      </section>
    </>
  )
}

export default Products
