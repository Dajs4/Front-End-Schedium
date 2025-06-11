import axiosInstance from './axios.config';
import { 
  ApiResponse, 
  LoginCredentials, 
  AuthResponse, 
  User, 
  RefreshTokenRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest 
} from '@/types';
import { AUTH_CONFIG } from '@/config/constants';

class AuthService {
  private baseURL = '/auth';

  // Login
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse['data']>> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse['data']>>(
      `${this.baseURL}/login`,
      credentials
    );
    return response.data;
  }

  // Refresh token
  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse['data']>> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse['data']>>(
      `${this.baseURL}/refresh`,
      { refresh_token: refreshToken } as RefreshTokenRequest
    );
    return response.data;
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await axiosInstance.post(`${this.baseURL}/logout`);
    } catch (error) {
      // Ignorar errores de logout
    } finally {
      // Limpiar almacenamiento local
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      localStorage.removeItem(AUTH_CONFIG.userKey);
    }
  }

  // Obtener usuario actual
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await axiosInstance.get<ApiResponse<User>>(
      `${this.baseURL}/me`
    );
    return response.data;
  }

  // Actualizar perfil
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await axiosInstance.put<ApiResponse<User>>(
      `${this.baseURL}/me`,
      data
    );
    return response.data;
  }

  // Cambiar contraseña
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>(
      `${this.baseURL}/change-password`,
      data
    );
    return response.data;
  }

  // Solicitar reset de contraseña
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>(
      `${this.baseURL}/forgot-password`,
      data
    );
    return response.data;
  }

  // Reset de contraseña
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>(
      `${this.baseURL}/reset-password`,
      data
    );
    return response.data;
  }

  // Helpers
  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_CONFIG.tokenKey);
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem(AUTH_CONFIG.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  storeAuthData(tokens: AuthResponse['data'], user: User): void {
    localStorage.setItem(AUTH_CONFIG.tokenKey, tokens.access_token);
    localStorage.setItem(AUTH_CONFIG.refreshTokenKey, tokens.refresh_token);
    localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));
  }
}

export const authService = new AuthService();