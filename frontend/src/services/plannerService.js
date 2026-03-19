import apiClient from './apiClient'

export const plannerService = {
  getByPage: async (page) => {
    const { data } = await apiClient.get(`/planner-config/${page}`)
    return data
  },
  updateByPage: async (page, config) => {
    const { data } = await apiClient.put(`/planner-config/${page}`, { config })
    return data
  },
}
