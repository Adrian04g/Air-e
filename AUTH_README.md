# Sistema de Autenticación AIR-E

## ✅ Modo Producción (Backend Real)

El sistema está configurado actualmente para conectarse con el **backend Django** en `http://127.0.0.1:8000/`

### Credenciales
- Usa las credenciales de usuarios creados en el backend Django
- Puedes crear usuarios desde el admin de Django o mediante el endpoint de registro

### Cómo funciona
1. El login envía credenciales al backend Django
2. El backend valida y retorna tokens JWT (access + refresh)
3. Los tokens se guardan en localStorage
4. Todas las peticiones incluyen el token en el header Authorization
5. La sesión persiste entre recargas de página

## Cambiar a Modo Producción

Cuando el backend esté disponible, sigue estos pasos:

### 1. Configurar el servicio de autenticación
Edita `src/services/authService.js`:

```javascript
// Cambiar esta línea de true a false
const USE_MOCK = false  // ← Cambiar aquí
```

### 2. Verificar la URL del API
Edita `src/utils/api.js`:

```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/'  // ← Ajustar según tu backend
```

### 3. Endpoints requeridos en el backend

El sistema espera estos endpoints:

#### Login
```
POST /api/token/
Body: { username, password }
Response: { access, refresh }
```

#### Refresh Token
```
POST /api/token/refresh/
Body: { refresh }
Response: { access }
```

#### Obtener Perfil
```
GET /api/auth/user/
Headers: Authorization: Bearer {token}
Response: { id, username, email, first_name, last_name }
```

#### Verificar Token
```
POST /api/token/verify/
Body: { token }
Response: { valid: true }
```

## Características Implementadas

✅ **Autenticación JWT**
- Login con usuario y contraseña
- Tokens de acceso y refresh
- Persistencia de sesión

✅ **Protección de Rutas**
- Todas las rutas están protegidas excepto /login
- Redirección automática al login si no está autenticado
- Redirección al dashboard si ya está autenticado

✅ **Manejo de Tokens**
- Interceptor automático para agregar token a requests
- Refresh automático de tokens expirados
- Logout automático si el refresh falla

✅ **Experiencia de Usuario**
- Loading states durante autenticación
- Mensajes de error claros
- Persistencia de sesión entre recargas

## Estructura de Archivos

```
src/
├── context/
│   └── AuthContext.jsx          # Contexto de autenticación
├── services/
│   └── authService.js           # Servicio de autenticación (MOCK/REAL)
├── utils/
│   └── api.js                   # Configuración de Axios + interceptores
├── components/
│   └── ProtectedRoute.jsx       # HOC para proteger rutas
└── pages/
    └── Login.jsx                # Página de login
```

## Solución de Problemas

### "Me redirige al login constantemente"
- Verifica que el token esté en localStorage: `localStorage.getItem('access_token')`
- Verifica que el usuario esté guardado: `localStorage.getItem('user')`
- Si estás en modo MOCK, asegúrate que `USE_MOCK = true` en authService.js

### "No puedo hacer login"
- En modo MOCK: cualquier usuario/contraseña funciona
- En modo REAL: verifica que el backend esté corriendo
- Revisa la consola del navegador para ver errores

### "Los datos no persisten al recargar"
- Verifica que localStorage esté funcionando
- Revisa que el AuthContext esté cargando correctamente en checkAuth()

## Próximos Pasos

1. ✅ Implementar modo mock (COMPLETADO)
2. ⏳ Conectar con backend real
3. ⏳ Agregar roles y permisos
4. ⏳ Implementar recuperación de contraseña
5. ⏳ Agregar autenticación de dos factores (opcional)
