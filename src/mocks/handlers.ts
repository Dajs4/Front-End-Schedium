import { rest } from 'msw';
import { API_CONFIG } from '@/config/constants';

// Mock data
const mockUser = {
  id: 1,
  email: 'admin@sena.edu.co',
  first_name: 'Juan',
  last_name: 'Pérez',
  document_number: '12345678',
  role_id: 1,
  role: {
    id: 1,
    name: 'Administrator' as const,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  active: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockTokens = {
  access_token: 'mock-access-token-' + Date.now(),
  refresh_token: 'mock-refresh-token-' + Date.now(),
  token_type: 'bearer' as const,
};

export const handlers = [
  // Login
  rest.post(`${API_CONFIG.baseURL}/auth/login`, async (req, res, ctx) => {
    const body = await req.json();
    
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Validar credenciales
    if (body.username === 'admin@sena.edu.co' && body.password === 'admin123') {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: mockTokens,
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        success: false,
        message: 'Credenciales inválidas',
        errors: {
          code: 'INVALID_CREDENTIALS',
        },
      })
    );
  }),

  // Get current user
  rest.get(`${API_CONFIG.baseURL}/auth/me`, (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({
          success: false,
          message: 'No autorizado',
        })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: mockUser,
      })
    );
  }),

  // Logout
  rest.post(`${API_CONFIG.baseURL}/auth/logout`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          user_id: 1,
          message: 'Please remove tokens from client storage',
        },
      })
    );
  }),

  // Refresh token
  rest.post(`${API_CONFIG.baseURL}/auth/refresh`, async (req, res, ctx) => {
    const body = await req.json();
    
    if (body.refresh_token) {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: {
            ...mockTokens,
            access_token: 'new-mock-access-token-' + Date.now(),
          },
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        success: false,
        message: 'Invalid refresh token',
      })
    );
  }),
];