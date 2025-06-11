// Tipos base de autenticación
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  document_number: string;
  role_id: number;
  role: Role;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: 'Administrator' | 'Coordinator' | 'Secretary';
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
}

export interface AuthResponse {
  success: true;
  data: AuthTokens;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

// Estado de autenticación
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}