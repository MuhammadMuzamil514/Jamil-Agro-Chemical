import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ADMIN_LOGIN_PATH } from '../utils/routes'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_LOGIN_PATH} replace />
  }

  return children
}

export default ProtectedRoute
