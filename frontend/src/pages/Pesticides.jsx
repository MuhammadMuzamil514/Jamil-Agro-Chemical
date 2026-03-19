import { useEffect, useMemo, useState } from 'react'
import SeoMeta from '../components/SeoMeta'
import { productService } from '../services/productService'
import { plannerService } from '../services/plannerService'
import { pesticidesDefaultConfig } from '../utils/plannerDefaults'

function Pesticides() {
  const [config, setConfig] = useState(pesticidesDefaultConfig)
  const [categoryProducts, setCategoryProducts] = useState({})
  const [active, setActive] = useState('insect')
  const categories = useMemo(() => config.categories || [], [config])
  const planner = useMemo(() => config.planner || {}, [config])
  const focus = useMemo(() => planner[active] || Object.values(planner)[0], [active, planner])

  useEffect(() => {
    let ignore = false

    async function loadPageData() {
      try {
        const plannerResponse = await plannerService.getByPage('pesticides')
        if (!ignore && plannerResponse?.data?.config) {
          setConfig((prev) => ({ ...prev, ...plannerResponse.data.config }))
        }
      } catch {
        // Defaults keep page resilient when API config is missing.
      }

      try {
        const [insectRes, fungiRes, herbRes] = await Promise.all([
          productService.getAll({ category: 'insect' }),
          productService.getAll({ category: 'fungi' }),
          productService.getAll({ category: 'herb' }),
        ])

        if (!ignore) {
          setCategoryProducts({
            insect: (insectRes.data || []).map((item) => item.name),
            fungi: (fungiRes.data || []).map((item) => item.name),
            herb: (herbRes.data || []).map((item) => item.name),
          })
        }
      } catch {
        // Optional enhancement only.
      }
    }

    loadPageData()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <SeoMeta
        title="Premium Pesticides"
        description="Explore premium pesticides including insecticides, fungicides, and herbicides."
        keywords="pesticides, insecticides, fungicides, herbicides, crop protection"
      />

      <section className="hero-shell">
        <div className="relative z-10">
          <p className="hero-pill">Crop Protection Solutions</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Premium Pesticides</h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50/90 sm:text-lg">
            Scientifically formulated protection programs to safeguard crops from pests, diseases, and weeds with safer stage-wise application guidance.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category.key} className="surface-card">
            <h2 className="text-2xl font-bold text-emerald-900">{category.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{category.desc}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
              {(categoryProducts[category.key]?.length ? categoryProducts[category.key] : category.products || []).map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[22px] border border-emerald-200/70 bg-white/90 p-7 md:p-9">
        <div className="text-center">
          <h2 className="section-title">Pesticide Action Planner</h2>
          <p className="mt-2 subtle-copy">Pick a category and get a stage-safe quick strategy.</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActive(category.key)}
              className={
                active === category.key
                  ? 'rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white'
                  : 'rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50'
              }
            >
              {category.title}
            </button>
          ))}
        </div>

        <article className="mt-6 surface-card">
          <h3 className="text-2xl font-bold text-emerald-900">{focus.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{focus.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {focus.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">{focus.dose}</p>
        </article>
      </section>

      <section className="mt-10 rounded-[22px] bg-gradient-to-r from-emerald-800 to-emerald-600 p-8 text-center text-white">
        <h2 className="text-3xl font-bold">Need Expert Pest Management Advice?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/90">
          Share your crop and issue details to get a safe, effective, and cost-conscious spray plan.
        </p>
        <a href="/contact" className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900">
          Request Consultation
        </a>
      </section>
    </>
  )
}

export default Pesticides
