import SeoMeta from '../components/SeoMeta'
import { CONTACT_DETAILS } from '../utils/constants'

function Contact() {
  return (
    <>
      <SeoMeta
        title="Contact"
        description="Get in touch with Jamil Agro Chemicals for product support and dealership inquiries."
        keywords="contact jamil agro chemicals, agro support, dealer network"
      />
      <section className="hero-shell">
        <div className="relative z-10">
          <p className="hero-pill">We Deliver Where It Matters</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50/90 sm:text-lg">
            Have questions about products or need expert agricultural advice? Our team is ready to support your next season.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="surface-card">
          <h2 className="text-2xl font-bold text-emerald-900">Contact Information</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Phone</p>
              <p className="mt-1 font-semibold">{CONTACT_DETAILS.phone}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Email</p>
              <p className="mt-1 font-semibold">{CONTACT_DETAILS.email}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Address</p>
              <p className="mt-1 font-semibold">{CONTACT_DETAILS.address}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Social</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a href={CONTACT_DETAILS.whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
                  WhatsApp
                </a>
                <a href={CONTACT_DETAILS.facebookLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </aside>

        <form className="surface-card space-y-4" onSubmit={(event) => event.preventDefault()}>
          <h2 className="text-2xl font-bold text-emerald-900">Send Us a Message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="First Name" className="rounded-lg border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500" />
            <input type="text" placeholder="Last Name" className="rounded-lg border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="tel" placeholder="Phone Number" className="rounded-lg border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500" />
            <input type="text" placeholder="District / Region" className="rounded-lg border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500" />
          </div>
          <select className="w-full rounded-lg border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500">
            <option>Product Inquiry</option>
            <option>Pesticides</option>
            <option>Fertilizers</option>
            <option>Crop Program</option>
          </select>
          <textarea rows={5} placeholder="Tell us about your requirement..." className="w-full rounded-lg border border-emerald-200 px-3 py-2 outline-none focus:border-emerald-500" />
          <button type="submit" className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800">
            Send Message
          </button>
        </form>
      </section>

      <section className="mt-10 rounded-[22px] border border-emerald-200/80 bg-white/90 p-7">
        <h2 className="section-title text-center">Regional Offices</h2>
        <p className="mt-2 text-center subtle-copy">Serving farmers across multiple zones.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="surface-card text-center">
            <h3 className="text-xl font-bold text-emerald-900">North Zone</h3>
            <p className="mt-2 text-sm text-slate-600">Punjab and KPK</p>
            <p className="mt-2 font-semibold text-emerald-700">+92 300 400 9876</p>
          </article>
          <article className="surface-card text-center">
            <h3 className="text-xl font-bold text-emerald-900">Central Zone</h3>
            <p className="mt-2 text-sm text-slate-600">Lahore and Faisalabad</p>
            <p className="mt-2 font-semibold text-emerald-700">+92 300 500 8877</p>
          </article>
          <article className="surface-card text-center">
            <h3 className="text-xl font-bold text-emerald-900">South Zone</h3>
            <p className="mt-2 text-sm text-slate-600">Multan and Bahawalpur</p>
            <p className="mt-2 font-semibold text-emerald-700">{CONTACT_DETAILS.phone}</p>
          </article>
        </div>
      </section>
    </>
  )
}

export default Contact
