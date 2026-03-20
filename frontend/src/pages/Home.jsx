import SeoMeta from '../components/SeoMeta'
import OptimizedImage from '../components/OptimizedImage'
import { APP_DESCRIPTION, CEO_PROFILE, FEATURE_2026, CONTACT_DETAILS } from '../utils/constants'
import { getCurrentSeasonKey, getSeasonLabel } from '../utils/seasonal'
import ceoImage from '../assets/ceo.jpg'

const metrics = [
  { label: 'Years Experience', value: '1+' },
  { label: 'Happy Farmers', value: '500+' },
  { label: 'Product Range', value: '50+' },
  { label: 'Field Success Rate', value: '98%' },
]

const trustPoints = [
  {
    title: 'Certified Quality',
    desc: 'Each batch is quality checked for safe and effective field performance.',
  },
  {
    title: 'Proven Results',
    desc: 'Programs built from practical regional crop outcomes, not assumptions.',
  },
  {
    title: 'Expert Guidance',
    desc: 'Agronomy support for dosage, stage planning, and seasonal risk management.',
  },
]

function Home() {
  const seasonKey = getCurrentSeasonKey()

  return (
    <>
      <SeoMeta
        title="Home"
        description={APP_DESCRIPTION}
        keywords="agro chemicals, fertilizers, crop nutrition, agriculture"
      />
      <section className="hero-shell">
        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="fade-up">
            <p className="hero-pill">Growing Excellence Since 2026</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Cultivating Abundant Harvests with Smarter Crop Science.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:text-lg">
              Premium agricultural solutions combining advanced pesticides and precision fertilizers designed to maximize yield, quality, and farm resilience.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/products" className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50">
                Explore Products
              </a>
              <a href="/order-now" className="rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-200">
                Order Now
              </a>
              <a href="/contact" className="rounded-lg border border-white/55 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Get Expert Advice
              </a>
            </div>
          </div>

          <div className="fade-up fade-up-delay-1 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=75"
              alt="Healthy crops in a farm field"
              width={1400}
              height={900}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item, index) => (
          <article key={item.label} className={`metric-tile fade-up fade-up-delay-${Math.min(index, 3)}`}>
            <span className="metric-value">{item.value}</span>
            <p className="mt-1 text-sm font-medium text-slate-600">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="surface-card fade-up">
          <p className="hero-pill !border-emerald-200 !bg-emerald-50 !text-emerald-800">Crop Protection</p>
          <h2 className="mt-4 text-2xl font-bold text-emerald-950">Premium Pesticides</h2>
          <p className="mt-3 subtle-copy">
            Advanced formulations to protect crops from pests, weeds, and diseases with stage-specific guidance.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>Targeted pest control strategy</li>
            <li>Fast-acting protection cycles</li>
            <li>Safe usage advisory support</li>
          </ul>
        </article>
        <article className="surface-card fade-up fade-up-delay-1">
          <p className="hero-pill !border-emerald-200 !bg-amber-50 !text-amber-800">Soil Nutrition</p>
          <h2 className="mt-4 text-2xl font-bold text-emerald-950">High-Grade Fertilizers</h2>
          <p className="mt-3 subtle-copy">
            Balanced nutrition programs from NPK to specialty blends for improved plant vigor and crop quality.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>Macro and micronutrient combinations</li>
            <li>Organic and specialty options</li>
            <li>Soil health improvement plans</li>
          </ul>
        </article>
      </section>

      <section className="mt-12 rounded-[26px] border border-emerald-200/80 bg-white/90 p-8 shadow-[0_20px_60px_-34px_rgba(5,150,105,0.85)] md:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Why Farmers Trust Us</h2>
          <p className="mt-3 subtle-copy">
            Proven results with dedicated support, transparent product quality, and consistent field outcomes.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {trustPoints.map((point, index) => (
            <article key={point.title} className={`surface-card fade-up fade-up-delay-${Math.min(index, 3)}`}>
              <h3 className="text-xl font-bold text-emerald-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{point.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[24px] border border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-lime-50 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-emerald-900">Current Season Focus: {getSeasonLabel(seasonKey)}</h2>
          <a href="/crop-solutions" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            Open Live Seasonal Planner
          </a>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Crop recommendations auto-adjust by seasonal cycle and update from admin planner configuration to keep your farm strategy timely.
        </p>
      </section>

      <section className="mt-12 rounded-[26px] border border-emerald-200/80 bg-white/95 p-8 shadow-[0_18px_55px_-30px_rgba(2,132,199,0.55)] md:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Built for 2026 Agriculture</h2>
          <p className="mt-3 subtle-copy">Future-ready digital features layered over trusted on-ground agronomy support.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {FEATURE_2026.map((feature) => (
            <article key={feature.title} className="surface-card">
              <h3 className="text-xl font-bold text-emerald-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 rounded-[26px] border border-emerald-200/80 bg-white/95 p-7 md:grid-cols-[0.75fr_1.25fr] md:p-10">
        <div className="overflow-hidden rounded-2xl border border-emerald-200/70 bg-emerald-50 p-2 shadow-[0_22px_50px_-35px_rgba(5,150,105,0.7)]">
          <OptimizedImage
            src={ceoImage}
            alt={CEO_PROFILE.name}
            width={900}
            height={900}
            className="h-full w-full rounded-xl object-cover object-top"
          />
        </div>
        <article className="flex flex-col justify-center">
          <p className="hero-pill !w-fit !border-emerald-200 !bg-emerald-50 !text-emerald-800">Leadership</p>
          <h2 className="mt-4 text-3xl font-bold text-emerald-950">Message from the CEO</h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{CEO_PROFILE.quote}</p>
          <p className="mt-5 text-lg font-bold text-emerald-900">{CEO_PROFILE.name}</p>
          <p className="text-sm text-slate-600">{CEO_PROFILE.title}</p>
        </article>
      </section>

      <section className="mt-12 rounded-[26px] bg-gradient-to-r from-emerald-800 to-emerald-600 px-6 py-10 text-center text-white shadow-[0_20px_55px_-25px_rgba(6,78,59,0.8)] md:px-10">
        <h2 className="text-3xl font-bold">Ready to Boost Your Harvest?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/95">
          Join successful growers using Jamil Agro Chemicals for better crop performance and season-long support.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/order-now" className="rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-emerald-950 hover:bg-amber-200">
            Place Order Online
          </a>
          <a href="/contact" className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-900 hover:bg-emerald-50">
            Contact Our Team
          </a>
          <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`} className="rounded-lg border border-white/60 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
            Call {CONTACT_DETAILS.phone}
          </a>
        </div>
      </section>
    </>
  )
}

export default Home
