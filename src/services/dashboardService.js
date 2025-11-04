import cableoperadoresService from './cableoperadoresService'
import contratosService from './contratosService'

const dashboardService = {
  getStats: async () => {
    try {
      const [cableoperadoresResponse, contratosResponse] = await Promise.all([
        cableoperadoresService.getAll(),
        contratosService.getAll(),
      ])

      // Django REST Framework retorna datos paginados en formato { results: [...], count, next, previous }
      // Si tiene results, usar results, sino usar el array directo
      const cableoperadores = Array.isArray(cableoperadoresResponse) 
        ? cableoperadoresResponse 
        : (cableoperadoresResponse.results || [])
      
      const contratos = Array.isArray(contratosResponse) 
        ? contratosResponse 
        : (contratosResponse.results || [])

      // Si es paginado, usar count, sino usar length
      const totalCableoperadores = cableoperadoresResponse.count !== undefined 
        ? cableoperadoresResponse.count 
        : cableoperadores.length

      const contratosVigentes = contratos.filter((c) => c.estado_contrato === 'Vigente').length
      const contratosVencidos = contratos.filter((c) => c.estado_contrato === 'Vencido').length
      const totalContratos = contratosResponse.count !== undefined 
        ? contratosResponse.count 
        : contratos.length

      return {
        cableoperadores: {
          count: totalCableoperadores,
        },
        totalCableoperadores,
        contratosVigentes,
        contratosVencidos,
        totalContratos,
      }
    } catch (error) {
      console.error('Error en dashboardService.getStats:', error)
      throw error
    }
  },
}

export default dashboardService

