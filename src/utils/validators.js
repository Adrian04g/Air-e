// Validadores de formularios

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== ''
}

export const validatePhone = (phone) => {
  const re = /^[0-9]{7,15}$/
  return re.test(phone)
}

export const validateNIT = (nit) => {
  const re = /^[0-9]{9,15}$/
  return re.test(nit)
}

export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return false
  return new Date(endDate) > new Date(startDate)
}

export const validatePositiveNumber = (value) => {
  return !isNaN(value) && parseFloat(value) > 0
}

export const validateForm = (fields, values) => {
  const errors = {}
  
  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName]
    const value = values[fieldName]

    // Validar campo requerido
    if (field.required && !validateRequired(value)) {
      errors[fieldName] = `${field.label} es requerido`
      return
    }

    // Validar email
    if (field.type === 'email' && value && !validateEmail(value)) {
      errors[fieldName] = 'Email inválido'
      return
    }

    // Validar teléfono
    if (field.type === 'tel' && value && !validatePhone(value)) {
      errors[fieldName] = 'Teléfono inválido'
      return
    }

    // Validar NIT
    if (field.name === 'NIT' && value && !validateNIT(value)) {
      errors[fieldName] = 'NIT inválido'
      return
    }

    // Validar número positivo
    if (field.type === 'number' && value && !validatePositiveNumber(value)) {
      errors[fieldName] = 'Debe ser un número positivo'
      return
    }
  })

  return errors
}

