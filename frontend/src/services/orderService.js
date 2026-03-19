import apiClient from './apiClient'

export const orderService = {
  create: async (payload) => {
    const { data } = await apiClient.post('/orders', payload)
    return data
  },
  getAll: async (params = {}) => {
    const { data } = await apiClient.get('/orders', { params })
    return data
  },
  trackByCode: async (trackingCode) => {
    const { data } = await apiClient.get(`/orders/track/${encodeURIComponent(trackingCode)}`)
    return data
  },
  updateStatus: async (id, status) => {
    const { data } = await apiClient.patch(`/orders/${id}/status`, { status })
    return data
  },
}
