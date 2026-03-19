import apiClient from './apiClient'

export const productService = {
  getAll: async (params = {}) => {
    const { data } = await apiClient.get('/products', { params })
    return data
  },
  create: async (payload) => {
    const { data } = await apiClient.post('/products', payload)
    return data
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/products/${id}`, payload)
    return data
  },
  remove: async (id) => {
    const { data } = await apiClient.delete(`/products/${id}`)
    return data
  },
}
