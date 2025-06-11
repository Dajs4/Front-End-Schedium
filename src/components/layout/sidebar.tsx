import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Search, 
  FileText, 
  UserPlus, 
  Settings, 
  LogOut,
  User,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES, PERMISSIONS } from '@/config/constants';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles?: Array<'Administrator' | 'Coordinator' | 'Secretary'>;
}

const navItems: NavItem[] = [
  {
    label: 'Inicio',
    icon: Home,
    href: ROUTES.DASHBOARD,
  },
  {
    label: 'Horarios',
    icon: Calendar,
    href: ROUTES.SCHEDULE,
  },
  {
    label: 'Consultas',
    icon: Search,
    href: ROUTES.INSTRUCTORS,
  },
  {
    label: 'Informes',
    icon: FileText,
    href: ROUTES.REPORTS,
  },
  {
    label: 'Usuarios',
    icon: UserPlus,
    href: ROUTES.USERS,
    roles: ['Administrator'],
  },
  {
    label: 'Configuración',
    icon: Settings,
    href: ROUTES.SETTINGS,
    roles: ['Administrator', 'Coordinator'],
  },
];

export function Sidebar() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Cerrar sidebar móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Filtrar items según rol
  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role.name);
  });

  const NavContent = () => (
    <>
      {/* Header con usuario y notificaciones */}
      <div className="p-4 border-b border-sena-gray-200">
        <div className="flex flex-col space-y-3">
          {/* Usuario */}
          <button
            onClick={() => {/* TODO: Ir a perfil */}}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-lg",
              "hover:bg-sena-gray-100 transition-colors",
              "text-left w-full"
            )}
          >
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-sena-primary flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
            {(isExpanded || isMobileOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sena-gray-900 truncate">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-sena-gray-600 truncate">
                  {user?.role.name}
                </p>
              </div>
            )}
          </button>

          {/* Notificaciones */}
          <button
            className={cn(
              "flex items-center space-x-3 p-2 rounded-lg",
              "hover:bg-sena-gray-100 transition-colors",
              "relative"
            )}
          >
            <Bell className="h-6 w-6 text-sena-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            {(isExpanded || isMobileOpen) && (
              <span className="text-sm text-sena-gray-900">Notificaciones</span>
            )}
          </button>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg",
                "transition-all duration-200",
                isActive
                  ? "bg-sena-primary text-white"
                  : "text-sena-gray-600 hover:bg-sena-gray-100"
              )}
            >
              <Icon className="h-6 w-6 flex-shrink-0" />
              {(isExpanded || isMobileOpen) && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sena-gray-200">
        <button
          onClick={logout}
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg w-full",
            "text-sena-gray-600 hover:bg-sena-gray-100 transition-colors"
          )}
        >
          <LogOut className="h-6 w-6" />
          {(isExpanded || isMobileOpen) && (
            <span className="text-sm font-medium">Cerrar Sesión</span>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Botón móvil */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6 text-sena-gray-900" />
        ) : (
          <Menu className="h-6 w-6 text-sena-gray-900" />
        )}
      </button>

      {/* Sidebar Desktop */}
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 h-full",
          "bg-white border-r border-sena-gray-200",
          "transition-all duration-300 z-40",
          isExpanded ? "w-60" : "w-20"
        )}
      >
        <NavContent />
      </aside>

      {/* Sidebar Móvil */}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-40",
          "bg-white border-r border-sena-gray-200",
          "transition-transform duration-300 w-60",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-16">
          <NavContent />
        </div>
      </aside>

      {/* Overlay móvil */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}