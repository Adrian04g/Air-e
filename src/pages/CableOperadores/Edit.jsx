import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import cableoperadoresService from '../../services/cableoperadoresService'
import Input from '../../components/UI/Input'
import Select from '../../components/UI/Select'
import Button from '../../components/UI/Button'
import Loading from '../../components/UI/Loading'
import { ESTADOS_CABLEOPERADOR, RESPUESTA_PRELiquidACION } from '../../utils/constants'

const CableOperadoresEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    nombre_largo: '',
    NIT: '',
    Digito_verificacion: '',
    RegistroTic: '',
    CodigoInterno: '',
    pais: '',
    ciudad: '',
    direccion: '',
    Representante: '',
    telefono: '',
    correo: '',
    ejecutiva: 1,
    observaciones: '',
    estado: '',
    vencimiento_factura: '',
    preliquidacion_num: '',
    preliquidacion_letra: '',
    respuesta_preliquidacion: '',
  })

  useEffect(() => {
    loadCableoperador()
  }, [id])

  const loadCableoperador = async () => {
    try {
      setLoading(true)
      const data = await cableoperadoresService.getById(id)
      setFormData({
        ...data,
        NIT: data.NIT?.toString() || '',
        Digito_verificacion: data.Digito_verificacion?.toString() || '',
        RegistroTic: data.RegistroTic?.toString() || '',
        CodigoInterno: data.CodigoInterno?.toString() || '',
        telefono: data.telefono?.toString() || '',
        vencimiento_factura: data.vencimiento_factura?.toString() || '',
        preliquidacion_num: data.preliquidacion_num?.toString() || '',
        ejecutiva: data.ejecutiva || 1,
      })
    } catch (error) {
      toast.error('Error al cargar cable-operador')
      navigate('/cableoperadores')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const dataToSend = {
        ...formData,
        NIT: formData.NIT ? parseInt(formData.NIT) : null,
        Digito_verificacion: formData.Digito_verificacion ? parseInt(formData.Digito_verificacion) : null,
        RegistroTic: formData.RegistroTic ? parseInt(formData.RegistroTic) : null,
        CodigoInterno: formData.CodigoInterno ? parseInt(formData.CodigoInterno) : null,
        telefono: formData.telefono ? parseInt(formData.telefono) : null,
        vencimiento_factura: formData.vencimiento_factura ? parseInt(formData.vencimiento_factura) : null,
        preliquidacion_num: formData.preliquidacion_num ? parseInt(formData.preliquidacion_num) : null,
      }

      await cableoperadoresService.update(id, dataToSend)
      toast.success('Cable-operador actualizado exitosamente')
      navigate('/cableoperadores')
    } catch (error) {
      toast.error('Error al actualizar cable-operador')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loading fullScreen />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Cable-operador</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <Input
            label="Nombre Largo"
            name="nombre_largo"
            value={formData.nombre_largo}
            onChange={handleChange}
          />
          <Input
            label="NIT"
            name="NIT"
            type="number"
            value={formData.NIT}
            onChange={handleChange}
          />
          <Input
            label="Dígito de Verificación"
            name="Digito_verificacion"
            type="number"
            value={formData.Digito_verificacion}
            onChange={handleChange}
          />
          <Input
            label="Registro TIC"
            name="RegistroTic"
            type="number"
            value={formData.RegistroTic}
            onChange={handleChange}
          />
          <Input
            label="Código Interno"
            name="CodigoInterno"
            type="number"
            value={formData.CodigoInterno}
            onChange={handleChange}
          />
          <Input
            label="País"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
          />
          <Input
            label="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />
          <Input
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="md:col-span-2"
          />
          <Input
            label="Representante"
            name="Representante"
            value={formData.Representante}
            onChange={handleChange}
          />
          <Input
            label="Teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <Input
            label="Correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <Select
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            options={ESTADOS_CABLEOPERADOR}
            required
          />
          <Input
            label="Vencimiento Factura"
            name="vencimiento_factura"
            type="number"
            value={formData.vencimiento_factura}
            onChange={handleChange}
          />
          <Input
            label="Preliquidación Número"
            name="preliquidacion_num"
            type="number"
            value={formData.preliquidacion_num}
            onChange={handleChange}
          />
          <Input
            label="Preliquidación Letra"
            name="preliquidacion_letra"
            value={formData.preliquidacion_letra}
            onChange={handleChange}
          />
          <Select
            label="Respuesta Preliquidación"
            name="respuesta_preliquidacion"
            value={formData.respuesta_preliquidacion}
            onChange={handleChange}
            options={RESPUESTA_PRELiquidACION}
          />
          <Input
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className="md:col-span-2"
            required
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Actualizar Cable-operador'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/cableoperadores')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CableOperadoresEdit

