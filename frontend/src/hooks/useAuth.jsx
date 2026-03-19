import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { tokenStore } from '../utils/token'
import { ADMIN_DASHBOARD_PATH, ADMIN_LOGIN_PATH } from '../utils/routes'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(tokenStore.get()))

  const login = async (credentials) => {
    const data = await authService.login(credentials)
    tokenStore.set(data.token)
    setIsAuthenticated(true)
    navigate(ADMIN_DASHBOARD_PATH, { replace: true })
  }

  const logout = () => {
    tokenStore.clear()
    setIsAuthenticated(false)
    navigate(ADMIN_LOGIN_PATH, { replace: true })
  }

  const value = { isAuthenticated, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
