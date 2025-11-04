import { format, parseISO } from 'date-fns'

// Formatear fecha para mostrar
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return ''
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatStr)
  } catch (error) {
    return date
  }
}

// Formatear fecha para input
export const formatDateForInput = (date) => {
  if (!date) return ''
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, 'yyyy-MM-dd')
  } catch (error) {
    return date
  }
}

// Formatear moneda
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return '$0.00'
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Formatear número
export const formatNumber = (value) => {
  if (value === null || value === undefined) return '0'
  return new Intl.NumberFormat('es-CO').format(value)
}

// Formatear teléfono
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.toString().replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

