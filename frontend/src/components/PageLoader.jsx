function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-[45vh] items-center justify-center">
      <div className="rounded-xl border border-emerald-200 bg-white px-6 py-4 shadow-sm">
        <p className="text-emerald-800">{message}</p>
      </div>
    </div>
  )
}

export default PageLoader
