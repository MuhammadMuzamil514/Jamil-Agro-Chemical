function GlobalError({ title = 'Something went wrong', message = 'Please try again in a moment.' }) {
  return (
    <div className="mx-auto mt-20 max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-xl font-semibold text-red-800">{title}</h2>
      <p className="mt-2 text-red-700">{message}</p>
    </div>
  )
}

export default GlobalError
