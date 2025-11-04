import api from '../utils/api'

const cableoperadoresService = {
  getAll: async () => {
    try {
      const response = await api.get('/api/cableoperadores/list/')
      console.log('Respuesta completa de cable-operadores:', response.data)
      // Extraer el array de results de la respuesta paginada
      return response.data?.results || []
    } catch (error) {
      console.error('Error al obtener cable-operadores:', error)
      throw error
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/cableoperadores/detail/${id}/`)
      console.log('Detalle del cable-operador:', response.data)
      // Si la respuesta está paginada, tomar el primer resultado
      if (response.data?.results && response.data.results.length > 0) {
        return response.data.results[0]
      }
      return response.data
    } catch (error) {
      console.error('Error al obtener cable-operador por ID:', error)
      throw error
    }
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

