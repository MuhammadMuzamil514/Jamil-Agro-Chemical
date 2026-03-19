import { useState } from 'react'

export function useApiError() {
  const [error, setError] = useState('')

  const handleError = (err, fallback = 'Unexpected error occurred.') => {
    setError(err?.response?.data?.message || fallback)
  }

  return { error, setError, handleError }
}
