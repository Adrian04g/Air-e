import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { formatDate } from '../../utils/formatters'
import proyectosService from '../../services/proyectosService'
import Button from '../../components/UI/Button'
import Loading from '../../components/UI/Loading'

const ProyectosList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      setLoading(true)
      const data = await proyectosService.getProyectosListFull()
      setItems(Array.isArray(data?.results) ? data.results : (data || []))
    } catch (err) {
      toast.error('Error al cargar proyectos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar proyecto?')) return
    try {
      await proyectosService.deleteProyecto(id)
      toast.success('Proyecto eliminado')
      load()
    } catch (err) {
      toast.error('Error al eliminar')
    }
  }

  if (loading) return <Loading fullScreen />

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-2xl font-bold text-gray-800">Proyectos</h2>
        <Link to="/proyectos/nuevo">
          <Button variant="primary">Nuevo Proyecto</Button>
        </Link>
      </div>

      <div className="bg-white rounded shadow p-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No hay proyectos</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th>OT_AIRE</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Fecha Inspección</th>
                <th>Fecha Entrega PJ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.datos_ingreso.OT_AIRE} className="border-t">
                  <td className="py-2">{it.datos_ingreso.OT_AIRE}</td>
                  <td className="py-2">{it.datos_ingreso.nombre}</td>
                  <td className="py-2">{it.estado || it.estado_actual || ''}</td>
                  <td className="py-2">{it.fecha_inspeccion ? formatDate(it.fecha_inspeccion) : ''}</td>
                  <td className="py-2">{it.fecha_entrega_pj ? formatDate(it.fecha_entrega_pj) : ''}</td>
                  <td className="py-2">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="secondary" onClick={() => navigate(`/proyectos/${it.datos_ingreso.OT_AIRE}`)}>Ver</Button>
                      <Button size="sm" variant="primary" onClick={() => navigate(`/proyectos/${it.datos_ingreso.OT_AIRE}/editar`)}>Editar</Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(it.datos_ingreso.OT_AIRE)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProyectosList
