import { CONTACT_DETAILS } from '../utils/constants'
import companyLogo from '../assets/jac-logo-mark.svg'

function Footer() {
  return (
    <footer className="mt-12 border-t border-emerald-100 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={companyLogo} alt="Jamil Agro Chemicals logo" className="h-16 w-16 rounded-full bg-white p-1 object-contain" />
            <div>
              <p className="text-base font-bold tracking-wide text-emerald-50">JAMIL AGRO CHEMICALS</p>
              <p className="text-xs italic text-emerald-200/90">Growing the Future Together</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-emerald-100/90">
            Premium pesticides and fertilizers with technical field support to grow healthier, more profitable harvests.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Products</p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-100/90">
            <li>Crop Protection</li>
            <li>Fertilizers</li>
            <li>Crop Programs</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-100/90">
            <li>Agronomy Advisory</li>
            <li>Field Visit Assistance</li>
            <li>Dealer Network</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-100/90">
            <li>{CONTACT_DETAILS.phone}</li>
            <li>{CONTACT_DETAILS.email}</li>
            <li>{CONTACT_DETAILS.address}</li>
          </ul>
          <div className="mt-4 flex gap-3 text-sm">
            <a
              href={CONTACT_DETAILS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-300/60 px-3 py-1.5 text-emerald-100 hover:bg-emerald-800"
            >
              WhatsApp
            </a>
            <a
              href={CONTACT_DETAILS.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-300/60 px-3 py-1.5 text-emerald-100 hover:bg-emerald-800"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-emerald-900/70 px-4 py-4 text-center text-xs text-emerald-200 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Jamil Agro Chemicals. Cultivating success together.
      </div>
    </footer>
  )
}

export default Footer
