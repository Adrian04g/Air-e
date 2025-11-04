# Air-e - Sistema de Gestión de Cable-Operadores y Contratos

Aplicación web moderna desarrollada con React + Vite + Tailwind CSS para la gestión de cable-operadores y contratos.

## 🚀 Características

- **Autenticación**: Sistema de login con JWT
- **Cable-Operadores**: CRUD completo de cable-operadores
- **Contratos**: Gestión de contratos con filtros y búsqueda
- **Dashboard**: Métricas y estadísticas en tiempo real
- **Diseño Responsive**: Adaptable a móviles y escritorio
- **UI Moderna**: Paleta de colores corporativa de AIR-E

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificaciones
- **date-fns** - Manejo de fechas

## 📦 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_AUTH_SECRET=
VITE_AUTH_TOKEN_KEY=
VITE_ENVIRONMENT=development
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🎨 Paleta de Colores

- **#0055b3** - Color principal (botones, encabezados, acentos)
- **#2596be** - Color secundario (hover, detalles)
- **#77d7c5** - Fondo de tarjetas o secciones suaves
- **#029ad7** - Íconos, enlaces o badges
- **#03b097** - Confirmaciones, éxito o indicadores positivos

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── UI/             # Componentes base (Button, Input, etc.)
│   └── Layout/          # Layout components (Sidebar, Header)
├── pages/               # Páginas de la aplicación
│   ├── CableOperadores/ # Módulo de cable-operadores
│   └── Contratos/       # Módulo de contratos
├── services/            # Servicios API
├── context/             # Context API (AuthContext)
├── utils/               # Utilidades (formatters, validators, etc.)
└── App.jsx              # Componente principal
```

## 🔐 Autenticación

El sistema utiliza JWT para la autenticación:
- Los tokens se almacenan en `localStorage`
- Los interceptores de Axios manejan automáticamente el refresh token
- Las rutas protegidas requieren autenticación

## 📝 Uso

1. **Login**: Accede con tu usuario y contraseña
2. **Dashboard**: Visualiza métricas y estadísticas
3. **Cable-Operadores**: Gestiona cable-operadores (crear, editar, eliminar, ver detalle)
4. **Contratos**: Gestiona contratos con filtros y búsqueda

## 🔧 Scripts

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🌐 Endpoints del Backend

La aplicación espera los siguientes endpoints del backend:

- `POST /api/token/` - Login
- `POST /api/token/refresh/` - Refresh token
- `GET /api/auth/user/` - Perfil de usuario
- `GET /api/cableoperadores/list/` - Listar cable-operadores
- `POST /api/cableoperadores/list/` - Crear cable-operador
- `GET /api/cableoperadores/detail/:id/` - Obtener cable-operador
- `PUT /api/cableoperadores/detail/:id/` - Actualizar cable-operador
- `DELETE /api/cableoperadores/detail/:id/` - Eliminar cable-operador
- `GET /api/contratos/list/` - Listar contratos
- `POST /api/contratos/list/` - Crear contrato
- `GET /api/contratos/detail/:id/` - Obtener contrato
- `PUT /api/contratos/detail/:id/` - Actualizar contrato
- `DELETE /api/contratos/detail/:id/` - Eliminar contrato

## 📄 Licencia

Este proyecto es propiedad de AIR-E.

