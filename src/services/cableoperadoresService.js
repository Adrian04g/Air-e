import api from '../utils/api'

const cableoperadoresService = {
  getAll: async () => {
    const response = await api.get('/api/cableoperadores/list/')
    // Django REST Framework retorna datos paginados en formato { results: [...], count, next, previous }
    // Si tiene results, retornar el array, sino retornar la data completa
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/api/cableoperadores/detail/${id}/`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/api/cableoperadores/list/', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/api/cableoperadores/detail/${id}/`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/api/cableoperadores/detail/${id}/`)
    return response.data
  },
}

export default cableoperadoresService

