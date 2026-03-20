import axios from 'axios'
import { tokenStore } from '../utils/token'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiClient
