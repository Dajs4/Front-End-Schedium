# Schedium - Sistema de Gestión Académica SENA

Sistema integral para la gestión de horarios académicos, recursos humanos e infraestructura del SENA CGMLTI.

## 🚀 Características

- **Autenticación JWT** con refresh tokens
- **Sistema de roles** (Administrator, Coordinator, Secretary)
- **Gestión de horarios** con drag & drop
- **Dashboard analítico** personalizado por rol
- **Generación de reportes** (PDF, Excel, CSV)
- **Diseño responsive** mobile-first
- **Accesibilidad** WCAG 2.1 AA

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS + shadcn/ui
- **Estado**: Zustand + React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios
- **Testing**: Vitest + Testing Library + Playwright
- **Mocks**: MSW (Mock Service Worker)

## 📋 Prerequisitos

- Node.js 18.x o superior
- npm 9.x o superior
- Backend API corriendo en `http://localhost:8000`

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/sena/schedium-frontend.git
cd schedium-frontend

Instalar dependencias:

bashnpm install

Copiar variables de entorno:

bashcp .env.example .env

Iniciar servidor de desarrollo:

bashnpm run dev
La aplicación estará disponible en http://localhost:5173
📝 Scripts Disponibles

npm run dev - Inicia servidor de desarrollo
npm run build - Construye la aplicación para producción
npm run preview - Preview del build de producción
npm run lint - Ejecuta ESLint
npm run format - Formatea código con Prettier
npm run test - Ejecuta tests unitarios
npm run test:e2e - Ejecuta tests E2E

🔐 Credenciales de Desarrollo
Para desarrollo con MSW activado:

Email: admin@sena.edu.co
Password: admin123

📁 Estructura del Proyecto
src/
├── components/     # Componentes reutilizables
│   ├── ui/        # Componentes base del design system
│   ├── common/    # Componentes compartidos
│   ├── layout/    # Layout y navegación
│   └── features/  # Componentes de features
├── pages/         # Páginas/vistas
├── services/      # Servicios API
├── stores/        # Estado global (Zustand)
├── hooks/         # Custom hooks
├── types/         # TypeScript types
├── utils/         # Utilidades
├── config/        # Configuraciones
├── styles/        # Estilos globales
└── mocks/         # MSW mocks
🎨 Design System
El proyecto utiliza los colores institucionales del SENA:

Primary: #003366 (Azul institucional)
Secondary: #39A900 (Verde SENA)
Accent: #FF6B00 (Naranja)

🧪 Testing
Tests Unitarios
bashnpm run test
Tests E2E
bashnpm run test:e2e
Coverage
bashnpm run test:coverage
🚀 Deployment
Build de Producción
bashnpm run build
Docker
bashdocker build -t schedium-frontend .
docker run -p 80:80 schedium-frontend
📖 Documentación API
La documentación completa de los endpoints está disponible en:

Swagger UI: http://localhost:8000/api/v1/docs
ReDoc: http://localhost:8000/api/v1/redoc

🤝 Contribuir

Fork el proyecto
Crear feature branch (git checkout -b feature/AmazingFeature)
Commit cambios (git commit -m 'Add AmazingFeature')
Push al branch (git push origin feature/AmazingFeature)
Abrir Pull Request

📄 Licencia
Este proyecto es propiedad del SENA - Regional Distrito Capital.

SENA - Servicio Nacional de Aprendizaje
Centro de Gestión de Mercados, Logística y Tecnologías de la Información

---

## [COMANDO] Instalación de MSW

```bash
# Generar el service worker de MSW
npx msw init public/ --save