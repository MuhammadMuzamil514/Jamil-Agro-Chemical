import { Link } from 'react-router-dom'
import SeoMeta from '../components/SeoMeta'

function NotFound() {
  return (
    <section className="mx-auto mt-20 max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
      <SeoMeta title="Page Not Found" description="Requested page was not found." keywords="404" />
      <h1 className="text-3xl font-bold text-amber-900">404 - Page Not Found</h1>
      <p className="mt-2 text-amber-800">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-5 inline-block rounded-md bg-emerald-700 px-4 py-2 text-white">
        Return Home
      </Link>
    </section>
  )
}

export default NotFound
