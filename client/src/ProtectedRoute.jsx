// usaremos este componente para proteger rutas que requieren autenticación
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/useAuth"

function ProtectedRoute() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirigir a la página de login
    return <Navigate to="/login" replace />;
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute