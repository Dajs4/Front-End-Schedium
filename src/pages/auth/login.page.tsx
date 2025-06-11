import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/config/constants';

// Esquema de validación
const loginSchema = z.object({
  username: z.string().email('Ingrese un email válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sena-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-large">
          <CardContent className="p-8">
            {/* Logo y título */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <img
                  src="/sena-logo.svg"
                  alt="SENA Logo"
                  className="h-16 mx-auto"
                />
              </div>
              <h1 className="text-2xl font-bold text-sena-gray-900">
                Schedium
              </h1>
              <p className="text-sena-gray-600 mt-2">
                Sistema de Gestión Académica
              </p>
              <p className="text-sm text-sena-gray-600">
                SENA CGMLTI
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-sena-gray-900 mb-2"
                >
                  Correo electrónico
                </label>
                <Input
                  id="username"
                  type="email"
                  placeholder="usuario@sena.edu.co"
                  error={!!errors.username}
                  icon={<Mail className="h-5 w-5 text-sena-gray-600" />}
                  {...register('username')}
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-sena-gray-900 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={!!errors.password}
                    icon={<Lock className="h-5 w-5 text-sena-gray-600" />}
                    {...register('password')}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-sena-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-sena-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-sena-primary focus:ring-sena-primary border-sena-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-sena-gray-600">
                    Recordarme
                  </span>
                </label>
                <a
                  href={ROUTES.FORGOT_PASSWORD}
                  className="text-sm text-sena-primary hover:text-sena-primary-dark"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Iniciar Sesión
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-sena-gray-600">
              <p>&copy; 2025 SENA - Regional Distrito Capital</p>
              <p>Centro de Gestión de Mercados, Logística y TI</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}