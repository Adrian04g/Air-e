import api from '../utils/api'

const contratosService = {
  getAll: async () => {
    const response = await api.get('/api/contratos/list/')
    // Django REST Framework retorna datos paginados en formato { results: [...], count, next, previous }
    // Si tiene results, retornar el array, sino retornar la data completa
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/api/contratos/detail/${id}/`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/api/contratos/list/', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/api/contratos/detail/${id}/`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/api/contratos/detail/${id}/`)
    return response.data
  },
}

export default contratosService

