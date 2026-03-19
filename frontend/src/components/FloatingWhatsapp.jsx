import { CONTACT_DETAILS } from '../utils/constants'

function FloatingWhatsapp() {
  return (
    <a
      href={CONTACT_DETAILS.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_35px_-12px_rgba(37,211,102,0.75)] transition hover:scale-105 hover:bg-[#22c55e]"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.75.46 3.46 1.34 4.97L2 22l5.31-1.39c1.46.8 3.11 1.22 4.74 1.22h.01c5.45 0 9.89-4.44 9.89-9.89A9.9 9.9 0 0 0 12.04 2Zm5.76 13.96c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.13.1-1.83-.12-.43-.14-.98-.32-1.69-.63-2.98-1.29-4.92-4.48-5.07-4.69-.15-.21-1.21-1.62-1.21-3.09 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18.01.43-.07.67.5.24.59.82 2.03.89 2.18.07.15.12.33.02.54-.09.21-.14.33-.27.51-.14.18-.29.4-.41.53-.14.16-.29.33-.12.65.18.31.79 1.3 1.7 2.11 1.17 1.04 2.16 1.36 2.47 1.51.31.15.49.13.67-.08.18-.21.76-.89.96-1.2.2-.31.41-.26.69-.16.29.1 1.81.86 2.12 1.01.31.16.52.24.59.38.07.14.07.8-.17 1.48Z" />
      </svg>
    </a>
  )
}

export default FloatingWhatsapp
