import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/config/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: Array<'Administrator' | 'Coordinator' | 'Secretary'>;
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  // No autenticado
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Verificar roles si se especifican
  if (roles && user && !roles.includes(user.role.name)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}