import { Navigate, Outlet } from 'react-router-dom'

import Spinner from '../components/molecules/Spinner'
import { useAuth } from '../feature/auth/context/AuthContext'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Spinner
        classes='flex min-h-screen w-full items-center justify-center'
        widthInRem={2}
      />
    )
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
