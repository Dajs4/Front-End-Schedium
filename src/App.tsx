import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

// Layouts
import { MainLayout } from '@/components/layout/main-layout';
import { ProtectedRoute } from '@/components/common/protected-route';

// Pages
import { LoginPage } from '@/pages/auth/login.page';
import { DashboardPage } from '@/pages/dashboard/dashboard.page';

// Config
import { ROUTES } from '@/config/constants';
import { useAuthStore } from '@/stores/auth.store';

// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

function App() {
  const refreshAuth = useAuthStore((state) => state.refreshAuth);

  // Verificar autenticación al cargar
  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          
          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            {/* TODO: Agregar más rutas en fase 2 */}
          </Route>

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </BrowserRouter>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            border: '1px solid #e5e5e5',
          },
        }}
      />

      {/* React Query Devtools */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;