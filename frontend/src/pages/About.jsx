import SeoMeta from '../components/SeoMeta'

const values = [
  'Farmer First',
  'Quality Excellence',
  'Sustainability',
  'Expert Guidance',
  'Innovation',
  'Integrity',
]

function About() {
  return (
    <>
      <SeoMeta
        title="About"
        description="Learn about Jamil Agro Chemicals and our mission to support modern agriculture."
        keywords="about jamil agro chemicals, mission, agriculture innovation"
      />
      <section className="hero-shell">
        <div className="relative z-10 fade-up">
          <p className="hero-pill">Our Story</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">About Jamil Agro Chemicals</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-emerald-50/90 sm:text-lg">
            We help farmers make confident crop decisions through trusted products, tested field programs, and practical agronomy support.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="metric-tile">
          <span className="metric-value">10+</span>
          <p className="mt-1 text-sm text-slate-600">Years of Excellence</p>
        </article>
        <article className="metric-tile">
          <span className="metric-value">500+</span>
          <p className="mt-1 text-sm text-slate-600">Happy Farmers</p>
        </article>
        <article className="metric-tile">
          <span className="metric-value">50+</span>
          <p className="mt-1 text-sm text-slate-600">Quality Products</p>
        </article>
        <article className="metric-tile">
          <span className="metric-value">15+</span>
          <p className="mt-1 text-sm text-slate-600">District Reach</p>
        </article>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="surface-card">
          <h2 className="text-2xl font-bold text-emerald-900">Our Mission</h2>
          <p className="mt-3 subtle-copy">
            Empower every farmer with high-quality agro inputs and expert guidance that improves crop yield sustainably.
          </p>
        </article>
        <article className="surface-card">
          <h2 className="text-2xl font-bold text-emerald-900">Our Vision</h2>
          <p className="mt-3 subtle-copy">
            To become the most trusted agricultural partner through innovation, responsibility, and measurable farm success.
          </p>
        </article>
      </section>

      <section className="mt-10 rounded-[24px] border border-emerald-200/80 bg-white/90 p-7 md:p-10">
        <div className="text-center">
          <h2 className="section-title">Our Core Values</h2>
          <p className="mt-3 subtle-copy">Principles that guide every recommendation and every shipment.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <article key={value} className="surface-card">
              <h3 className="text-xl font-bold text-emerald-900">{value}</h3>
              <p className="mt-2 text-sm text-slate-600">Built into our product quality, field support, and farmer relationships.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[24px] bg-gradient-to-r from-emerald-900 to-emerald-700 p-7 text-white md:p-10">
        <h2 className="text-3xl font-bold">Our Expert Team</h2>
        <p className="mt-3 max-w-2xl text-emerald-50/90">Dedicated professionals helping you plan smarter seasons.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {['Dr. Ejazafar', 'Fayzi Shana', 'Asif Ali'].map((name) => (
            <article key={name} className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="mt-2 text-sm text-emerald-50/90">Agronomy specialist focused on practical field outcomes and crop profitability.</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default About
