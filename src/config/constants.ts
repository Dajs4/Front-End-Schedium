// Configuración de la aplicación
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Schedium',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
};

// Configuración de API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  tokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'schedium_access_token',
  refreshTokenKey: import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || 'schedium_refresh_token',
  userKey: import.meta.env.VITE_AUTH_USER_KEY || 'schedium_user',
  tokenPrefix: 'Bearer',
};

// Rutas de la aplicación
export const ROUTES = {
  // Públicas
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Privadas
  DASHBOARD: '/',
  
  // Módulo Auth
  USERS: '/users',
  USERS_CREATE: '/users/create',
  USERS_EDIT: '/users/:id/edit',
  
  // Módulo Academic
  PROGRAMS: '/academic/programs',
  GROUPS: '/academic/groups',
  
  // Módulo HR
  INSTRUCTORS: '/hr/instructors',
  DEPARTMENTS: '/hr/departments',
  
  // Módulo Infrastructure
  CLASSROOMS: '/infrastructure/classrooms',
  CAMPUSES: '/infrastructure/campuses',
  
  // Módulo Scheduling
  SCHEDULE: '/scheduling',
  QUARTERS: '/scheduling/quarters',
  
  // Otros
  REPORTS: '/reports',
  SETTINGS: '/settings',
  PROFILE: '/profile',
};

// Permisos por rol
export const PERMISSIONS = {
  Administrator: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewReports: true,
    canManageUsers: true,
    canManageSystem: true,
  },
  Coordinator: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canViewReports: true,
    canManageUsers: false,
    canManageSystem: false,
  },
  Secretary: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canViewReports: true,
    canManageUsers: false,
    canManageSystem: false,
  },
};

// Configuración de UI
export const UI_CONFIG = {
  sidebarWidth: {
    collapsed: 80,
    expanded: 240,
  },
  headerHeight: 64,
  pageSize: {
    default: 20,
    options: [10, 20, 50, 100],
  },
  debounceDelay: 300,
  toastDuration: 4000,
};