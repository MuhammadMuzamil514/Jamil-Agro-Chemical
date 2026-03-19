import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingWhatsapp from '../components/FloatingWhatsapp'

function MainLayout() {
  return (
    <div className="min-h-screen text-slate-800">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  )
}

export default MainLayout
