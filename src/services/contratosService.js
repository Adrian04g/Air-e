import api from '../utils/api'

const contratosService = {
  getAll: async () => {
    try {
      const response = await api.get('/api/contratos/list/')
      console.log('Respuesta completa de contratos:', response.data)
      // Extraer el array de results de la respuesta paginada
      return response.data?.results || []
    } catch (error) {
      console.error('Error al obtener contratos:', error)
      throw error
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/contratos/detail/${id}/`)
      console.log('Detalle del contrato:', response.data)
      // Si la respuesta está paginada, tomar el primer resultado
      if (response.data?.results && response.data.results.length > 0) {
        return response.data.results[0]
      }
      return response.data
    } catch (error) {
      console.error('Error al obtener contrato por ID:', error)
      throw error
    }
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

