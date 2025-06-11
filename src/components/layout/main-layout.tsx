import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { cn } from '@/utils/cn';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-sena-gray-100">
      <Sidebar />
      
      {/* Contenido principal */}
      <main
        className={cn(
          "transition-all duration-300",
          "md:ml-20", // Margen del sidebar colapsado
          "pt-16 md:pt-0", // Padding top en móvil para el botón de menú
          "min-h-screen"
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}