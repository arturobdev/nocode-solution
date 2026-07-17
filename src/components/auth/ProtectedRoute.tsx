import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStore } from '@/store/useStore'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAdminAuthenticated = useStore((state) => state.isAdminAuthenticated)
  const location = useLocation()

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: { pathname: location.pathname } }} replace />
  }

  return children ? <>{children}</> : <Outlet />
}
