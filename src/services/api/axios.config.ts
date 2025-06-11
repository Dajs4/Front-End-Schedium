import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, AUTH_CONFIG } from '@/config/constants';
import { authService } from './auth.service';
import { toast } from 'sonner';

// Crear instancia de Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request interceptor para agregar token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    
    if (token && config.headers) {
      config.headers.Authorization = `${AUTH_CONFIG.tokenPrefix} ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor para manejar errores y refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Manejar error 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);

      if (!refreshToken) {
        // No hay refresh token, redirigir a login
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await authService.refreshToken(refreshToken);
        const { access_token } = response.data;
        
        localStorage.setItem(AUTH_CONFIG.tokenKey, access_token);
        axiosInstance.defaults.headers.common['Authorization'] = 
          `${AUTH_CONFIG.tokenPrefix} ${access_token}`;
        
        processQueue(null, access_token);
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Manejar otros errores
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          toast.error('Solicitud inválida');
          break;
        case 403:
          toast.error('No tienes permisos para realizar esta acción');
          break;
        case 404:
          toast.error('Recurso no encontrado');
          break;
        case 409:
          toast.error('Conflicto con el estado actual');
          break;
        case 422:
          if (data && typeof data === 'object' && 'errors' in data) {
            const errors = (data as any).errors;
            if (errors?.details?.length > 0) {
              toast.error(errors.details[0].message);
            } else {
              toast.error('Error de validación');
            }
          }
          break;
        case 429:
          toast.error('Demasiadas solicitudes. Por favor, intenta más tarde');
          break;
        case 500:
        case 503:
          toast.error('Error del servidor. Por favor, intenta más tarde');
          break;
        default:
          toast.error('Ha ocurrido un error inesperado');
      }
    } else if (error.request) {
      toast.error('No se pudo conectar con el servidor');
    } else {
      toast.error('Error al procesar la solicitud');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;