import { useState } from 'react'
import { Menu, Sun, Moon, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const [theme, setTheme] = useState('light')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-14 sm:h-16 flex items-center px-3 sm:px-4 lg:px-6 relative z-50 w-full max-w-[100vw] overflow-visible">
      <div className="flex items-center justify-between w-full">
        {/* Left section */}
        <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo for mobile */}
          <div className="flex items-center space-x-3 lg:hidden">
            <div className="w-8 h-8 overflow-hidden flex items-center justify-center">
              <img
                src="/logo-aire.png"
                alt="AIR-E"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="relative z-50 flex items-center space-x-2 md:space-x-3 lg:space-x-4 min-w-0 overflow-visible flex-nowrap pointer-events-auto">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors h-9 w-9 items-center justify-center hidden md:flex"
            aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors h-9 w-9 flex items-center justify-center"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 px-1 sm:px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors h-9 max-w-[55vw] sm:max-w-none overflow-hidden"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block text-left truncate min-w-0">
                <div className="text-xs font-medium text-gray-900 dark:text-gray-100 leading-tight truncate max-w-[50vw] lg:max-w-[18rem] xl:max-w-xs">
                  {user?.username || 'Usuario'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight uppercase truncate">
                  Usuario
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400 hidden md:block" />
            </button>

            {/* User dropdown menu */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 py-1">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {user?.username || 'Usuario'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email || 'usuario@aire.com'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Mi Perfil
                  </button>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Configuración
                  </button>
                  
                  <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

