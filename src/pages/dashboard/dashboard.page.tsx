import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth.store';
import { Users, Calendar, School, TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    {
      title: 'Instructores disponibles',
      value: '24',
      change: -20,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Grupos Activos',
      value: '15',
      change: -5,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Aulas Disponibles',
      value: '8',
      change: 0,
      icon: School,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-sena-gray-900">
          Dashboard Principal
        </h1>
        <p className="text-sena-gray-600 mt-1">
          Bienvenido, {user?.first_name} - {new Date().toLocaleDateString('es-CO')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change >= 0;

          return (
            <Card key={stat.title} className="hover:shadow-large">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-sena-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-sena-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isPositive ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {Math.abs(stat.change)}%
                      </span>
                    </div>
                  </div>
                  <div className={cn('p-3 rounded-lg', stat.bgColor)}>
                    <Icon className={cn('h-6 w-6', stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-sena-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-sena-secondary rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-sena-gray-900">
                        Clase programada
                      </p>
                      <p className="text-xs text-sena-gray-600">
                        Hace {i} hora{i > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-sena-gray-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ocupación Semanal */}
        <Card>
          <CardHeader>
            <CardTitle>📈 Ocupación Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => {
                const height = [85, 90, 80, 90, 85, 40, 10][index];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-sena-primary rounded-t transition-all duration-300 hover:bg-sena-primary-dark"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-sena-gray-600 mt-2">{day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}