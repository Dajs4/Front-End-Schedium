import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { authService } from '@/services/api/auth.service';
import { AuthState, LoginCredentials, User } from '@/types';
import { AUTH_CONFIG } from '@/config/constants';
import { toast } from 'sonner';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      user: authService.getStoredUser(),
      isAuthenticated: authService.isAuthenticated(),
      isLoading: false,
      error: null,

      // Login
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // Llamar al servicio de login
          const response = await authService.login(credentials);
          
          // Obtener información del usuario
          const userResponse = await authService.getCurrentUser();
          const user = userResponse.data;
          
          // Guardar tokens y usuario
          authService.storeAuthData(response.data, user);
          
          set({ 
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          toast.success(`Bienvenido, ${user.first_name}!`);
        } catch (error) {
          set({ 
            isLoading: false, 
            error: 'Credenciales inválidas',
            isAuthenticated: false,
            user: null
          });
          toast.error('Error al iniciar sesión');
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authService.logout();
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
          
          // Redirigir a login
          window.location.href = '/login';
        }
      },

      // Refresh auth (verificar token y obtener usuario actualizado)
      refreshAuth: async () => {
        if (!authService.isAuthenticated()) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ isLoading: true });
        
        try {
          const response = await authService.getCurrentUser();
          const user = response.data;
          
          // Actualizar usuario en localStorage
          localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));
          
          set({ 
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ 
            isAuthenticated: false, 
            user: null,
            isLoading: false 
          });
        }
      },

      // Actualizar usuario localmente
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(updatedUser));
          set({ user: updatedUser });
        }
      },

      // Limpiar error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
    }
  )
);