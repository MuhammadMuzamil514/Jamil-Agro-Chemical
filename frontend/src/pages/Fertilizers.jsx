import { useEffect, useMemo, useState } from 'react'
import SeoMeta from '../components/SeoMeta'
import { productService } from '../services/productService'
import { plannerService } from '../services/plannerService'
import { fertilizersDefaultConfig } from '../utils/plannerDefaults'

const plannerTabs = [
  { key: 'npk', label: 'NPK' },
  { key: 'organic', label: 'Organic' },
  { key: 'micro', label: 'Micronutrients' },
  { key: 'special', label: 'Specialty' },
]

function Fertilizers() {
  const [config, setConfig] = useState(fertilizersDefaultConfig)
  const [apiBlocks, setApiBlocks] = useState({})
  const [active, setActive] = useState('npk')
  const blocks = useMemo(() => config.blocks || [], [config])
  const planner = useMemo(() => config.planner || {}, [config])
  const focus = useMemo(() => planner[active] || Object.values(planner)[0], [active, planner])

  useEffect(() => {
    let ignore = false

    async function loadPageData() {
      try {
        const plannerResponse = await plannerService.getByPage('fertilizers')
        if (!ignore && plannerResponse?.data?.config) {
          setConfig((prev) => ({ ...prev, ...plannerResponse.data.config }))
        }
      } catch {
        // Defaults keep page resilient when API config is missing.
      }

      try {
        const [npkRes, organicRes, microRes, specialRes] = await Promise.all([
          productService.getAll({ category: 'npk' }),
          productService.getAll({ category: 'organic' }),
          productService.getAll({ category: 'micro' }),
          productService.getAll({ category: 'special' }),
        ])

        if (!ignore) {
          setApiBlocks({
            'NPK Fertilizers': (npkRes.data || []).map((item) => item.name),
            'Organic Fertilizers': (organicRes.data || []).map((item) => item.name),
            Micronutrients: (microRes.data || []).map((item) => item.name),
            'Specialty Fertilizers': (specialRes.data || []).map((item) => item.name),
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
        title="High-Grade Fertilizers"
        description="Explore NPK, organic, micronutrient, and specialty fertilizers for better crop nutrition."
        keywords="fertilizers, npk, micronutrients, organic fertilizers"
      />

      <section className="hero-shell">
        <div className="relative z-10">
          <p className="hero-pill">Soil Nutrition Solutions</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">High-Grade Fertilizers</h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50/90 sm:text-lg">
            Premium fertilizers formulated to nourish soil and maximize crop productivity from root establishment to final harvest quality.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="metric-tile"><span className="metric-value">30-40%</span><p className="mt-1 text-sm">Higher Yield Potential</p></article>
        <article className="metric-tile"><span className="metric-value">95%</span><p className="mt-1 text-sm">Healthier Plants</p></article>
        <article className="metric-tile"><span className="metric-value">A-Grade</span><p className="mt-1 text-sm">Crop Quality</p></article>
        <article className="metric-tile"><span className="metric-value">Long-term</span><p className="mt-1 text-sm">Soil Improvement</p></article>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {blocks.map((block) => (
          <article key={block.title} className="surface-card">
            <h2 className="text-2xl font-bold text-emerald-900">{block.title}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              {(apiBlocks[block.title]?.length ? apiBlocks[block.title] : block.items || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[22px] border border-emerald-200/70 bg-white/90 p-7 md:p-9">
        <div className="text-center">
          <h2 className="section-title">Smart Fertilizer Quick Planner</h2>
          <p className="mt-2 subtle-copy">Select a category for stage-focused recommendation.</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {plannerTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={
                active === tab.key
                  ? 'rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white'
                  : 'rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50'
              }
            >
              {tab.label}
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
        <h2 className="text-3xl font-bold">Get a Customized Nutrition Plan</h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/90">
          Our experts will map fertilizer schedule to your crop stage, soil profile, and target yield.
        </p>
        <a href="/contact" className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900">
          Consult Our Experts
        </a>
      </section>
    </>
  )
}

export default Fertilizers
