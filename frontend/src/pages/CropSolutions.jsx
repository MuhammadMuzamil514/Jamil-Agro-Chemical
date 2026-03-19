import { useEffect, useMemo, useState } from 'react'
import SeoMeta from '../components/SeoMeta'
import { plannerService } from '../services/plannerService'
import { productService } from '../services/productService'
import { cropSolutionsDefaultConfig } from '../utils/plannerDefaults'
import { getCurrentSeasonKey, getSeasonLabel } from '../utils/seasonal'

function CropSolutions() {
  const [config, setConfig] = useState(cropSolutionsDefaultConfig)
  const [active, setActive] = useState('vegetables')
  const [lastSyncedAt, setLastSyncedAt] = useState(new Date())
  const [products, setProducts] = useState([])
  const crops = useMemo(() => config.crops || [], [config])
  const programs = useMemo(() => config.programs || {}, [config])
  const monthSeasonMap = useMemo(() => config.monthSeasonMap || {}, [config])
  const seasonalUpdates = useMemo(() => config.seasonalUpdates || {}, [config])
  const program = useMemo(() => programs[active] || Object.values(programs)[0], [active, programs])
  const currentSeasonKey = useMemo(() => getCurrentSeasonKey(monthSeasonMap), [monthSeasonMap])
  const seasonCard = useMemo(
    () => seasonalUpdates[currentSeasonKey] || Object.values(seasonalUpdates)[0],
    [currentSeasonKey, seasonalUpdates],
  )
  const seasonPriorityCategories = useMemo(() => seasonCard?.priorityCategories || [], [seasonCard])
  const priorityProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return []
    }

    const keywords = seasonPriorityCategories.map((item) => String(item || '').toLowerCase())
    if (keywords.length === 0) {
      return products.slice(0, 4)
    }

    const matched = products.filter((product) => {
      const categoryText = String(product?.category || '').toLowerCase()
      return keywords.some((keyword) => categoryText.includes(keyword))
    })

    return (matched.length > 0 ? matched : products).slice(0, 4)
  }, [products, seasonPriorityCategories])

  useEffect(() => {
    let ignore = false

    async function loadPlannerConfig() {
      try {
        const [plannerResponse, productsResponse] = await Promise.all([
          plannerService.getByPage('crop-solutions'),
          productService.getAll(),
        ])

        if (!ignore && plannerResponse?.data?.config) {
          setConfig((prev) => ({ ...prev, ...plannerResponse.data.config }))
        }

        if (!ignore && Array.isArray(productsResponse?.data)) {
          setProducts(productsResponse.data)
          setLastSyncedAt(new Date())
        }
      } catch {
        // Defaults keep page resilient when API config is missing.
      }
    }

    loadPlannerConfig()
    const intervalId = window.setInterval(loadPlannerConfig, 60 * 1000)

    return () => {
      ignore = true
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <SeoMeta
        title="Crop-Specific Solutions"
        description="Tailored fertilizer and pesticide programs for each crop stage and region."
        keywords="crop solutions, integrated crop management, fertilizer program, pesticide plan"
      />

      <section className="hero-shell">
        <div className="relative z-10">
          <p className="hero-pill">Integrated Crop Management</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Crop-Specific Solutions</h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50/90 sm:text-lg">
            Tailored nutrition and protection programs for every crop growth stage, designed for stronger yield, quality, and risk control.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-[22px] border border-emerald-200/70 bg-white/90 p-7 md:p-9">
        <div className="text-center">
          <h2 className="section-title">Select Your Crop</h2>
          <p className="mt-2 subtle-copy">Get customized fertilizer and pesticide recommendations.</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {crops.map((crop) => (
            <button
              key={crop.key}
              type="button"
              onClick={() => setActive(crop.key)}
              className={
                active === crop.key
                  ? 'rounded-xl border border-emerald-700 bg-emerald-700 p-4 text-left text-white'
                  : 'rounded-xl border border-emerald-200 bg-white p-4 text-left text-slate-800 hover:border-emerald-400 hover:bg-emerald-50'
              }
            >
              <p className="text-base font-bold">{crop.label}</p>
              <p className={active === crop.key ? 'mt-1 text-xs text-emerald-50/90' : 'mt-1 text-xs text-slate-600'}>{crop.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[22px] border border-emerald-200/70 bg-white/90 p-7 md:p-9">
        <h2 className="text-3xl font-bold text-emerald-950">{program?.title}</h2>
        <p className="mt-2 subtle-copy">{program?.subtitle}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(program?.stages || []).map((stage) => (
            <article key={stage.title} className="surface-card">
              <h3 className="text-xl font-bold text-emerald-900">{stage.title}</h3>
              <p className="mt-2 text-sm text-slate-700"><span className="font-semibold text-emerald-800">Fertilizer:</span> {stage.feed}</p>
              <p className="mt-2 text-sm text-slate-700"><span className="font-semibold text-emerald-800">Crop Protection:</span> {stage.protect}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[22px] border border-emerald-200/70 bg-gradient-to-br from-emerald-900 to-emerald-700 p-7 text-white md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-bold">Live Seasonal Update: {getSeasonLabel(currentSeasonKey)}</h2>
          <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold">
            Auto refresh each 60 sec
          </span>
        </div>
        <p className="mt-2 text-emerald-50/90">Last sync: {lastSyncedAt.toLocaleTimeString()}</p>

        <article className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
          <h3 className="text-2xl font-bold">{seasonCard?.title}</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-50/90">{seasonCard?.description}</p>
          <ul className="mt-4 grid gap-2 text-sm md:grid-cols-3">
            {(seasonCard?.focus || []).map((item) => (
              <li key={item} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2">{item}</li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-emerald-950">
            Recommended action: {seasonCard?.recommendation}
          </p>

          <div className="mt-5">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-50/90">Season Auto-Priority Products</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {priorityProducts.map((product) => (
                <article key={product._id || product.name} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm font-semibold text-emerald-100">{product.category}</p>
                  <h5 className="mt-1 text-lg font-bold text-white">{product.name}</h5>
                  <p className="mt-1 text-sm text-emerald-50/90">PKR {Number(product.price || 0).toLocaleString()}</p>
                  <p className="mt-2 text-xs text-emerald-100/90 line-clamp-2">{product.description}</p>
                </article>
              ))}
            </div>
            {priorityProducts.length === 0 && (
              <p className="mt-3 text-sm text-emerald-100/90">
                Add products from admin panel and tag categories by season priorities to auto-populate this section.
              </p>
            )}
          </div>
        </article>
      </section>

      <section className="mt-10 rounded-[22px] bg-gradient-to-r from-emerald-800 to-emerald-600 p-8 text-center text-white">
        <h2 className="text-3xl font-bold">Need a Personalized Crop Program?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/90">
          Our agronomy team can build a district-specific stage plan based on soil profile, water quality, and crop goals.
        </p>
        <a href="/contact" className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900">
          Schedule Consultation
        </a>
      </section>
    </>
  )
}

export default CropSolutions
