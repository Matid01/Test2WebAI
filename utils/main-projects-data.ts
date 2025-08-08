export interface SubProject {
  id: string
  name: string
  description: string
  status: 'todo' | 'in-progress' | 'completed' | 'on-hold' | 'pending'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  progress: number
  assignee?: string
  dueDate?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ProjectGroup {
  id: string
  name: string
  description: string
  color: string
  subProjects: SubProject[]
  createdAt: string
  updatedAt: string
}

export interface MainProject {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  progress: number
  totalSubProjects: number
  completedSubProjects: number
  groups: ProjectGroup[]
  createdAt: string
  updatedAt: string
  dueDate?: string
  tags: string[]
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'in-progress':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'pending':
    case 'todo':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'on-hold':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'high':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'low':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export const initialMainProjects: MainProject[] = [
  {
    id: 'main-1',
    name: 'Sistema de Autenticación',
    description: 'Implementación completa del sistema de autenticación y autorización para la plataforma de agentes IA',
    status: 'active',
    priority: 'high',
    progress: 75,
    totalSubProjects: 12,
    completedSubProjects: 9,
    dueDate: '2024-02-15',
    tags: ['auth', 'security', 'backend'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    groups: [
      {
        id: 'group-1-1',
        name: 'Backend Authentication',
        description: 'Servicios de autenticación del lado del servidor',
        color: 'blue',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        subProjects: [
          {
            id: 'sub-1-1-1',
            name: 'JWT Token Service',
            description: 'Implementar servicio de tokens JWT para autenticación',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Carlos Mendez',
            dueDate: '2024-01-10',
            tags: ['jwt', 'tokens', 'security'],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-10T15:45:00Z'
          },
          {
            id: 'sub-1-1-2',
            name: 'Password Hashing',
            description: 'Sistema seguro de hash de contraseñas con bcrypt',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Ana Rodriguez',
            dueDate: '2024-01-08',
            tags: ['password', 'security', 'bcrypt'],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-08T12:20:00Z'
          },
          {
            id: 'sub-1-1-3',
            name: 'OAuth Integration',
            description: 'Integración con proveedores OAuth (Google, GitHub)',
            status: 'in-progress',
            priority: 'medium',
            progress: 60,
            assignee: 'Luis Garcia',
            dueDate: '2024-01-20',
            tags: ['oauth', 'google', 'github'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-15T09:15:00Z'
          },
          {
            id: 'sub-1-1-4',
            name: 'Session Management',
            description: 'Gestión de sesiones de usuario y refresh tokens',
            status: 'in-progress',
            priority: 'high',
            progress: 80,
            assignee: 'Maria Lopez',
            dueDate: '2024-01-18',
            tags: ['sessions', 'refresh-tokens'],
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-15T14:30:00Z'
          }
        ]
      },
      {
        id: 'group-1-2',
        name: 'Frontend Authentication',
        description: 'Interfaces de usuario para autenticación',
        color: 'green',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z',
        subProjects: [
          {
            id: 'sub-1-2-1',
            name: 'Login Form',
            description: 'Formulario de inicio de sesión con validaciones',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Pedro Sanchez',
            dueDate: '2024-01-12',
            tags: ['ui', 'forms', 'validation'],
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-12T16:45:00Z'
          },
          {
            id: 'sub-1-2-2',
            name: 'Registration Form',
            description: 'Formulario de registro de nuevos usuarios',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Sofia Martinez',
            dueDate: '2024-01-14',
            tags: ['ui', 'registration', 'forms'],
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-14T13:20:00Z'
          },
          {
            id: 'sub-1-2-3',
            name: 'Password Reset',
            description: 'Flujo de recuperación de contraseña',
            status: 'completed',
            priority: 'medium',
            progress: 100,
            assignee: 'Diego Torres',
            dueDate: '2024-01-16',
            tags: ['password-reset', 'email'],
            createdAt: '2024-01-04T00:00:00Z',
            updatedAt: '2024-01-16T10:15:00Z'
          },
          {
            id: 'sub-1-2-4',
            name: 'Profile Management',
            description: 'Página de gestión de perfil de usuario',
            status: 'in-progress',
            priority: 'medium',
            progress: 70,
            assignee: 'Carmen Ruiz',
            dueDate: '2024-01-22',
            tags: ['profile', 'user-management'],
            createdAt: '2024-01-06T00:00:00Z',
            updatedAt: '2024-01-15T15:45:00Z'
          }
        ]
      },
      {
        id: 'group-1-3',
        name: 'Security & Permissions',
        description: 'Sistema de permisos y seguridad avanzada',
        color: 'red',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-15T12:15:00Z',
        subProjects: [
          {
            id: 'sub-1-3-1',
            name: 'Role-Based Access Control',
            description: 'Sistema RBAC para control de acceso',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Roberto Kim',
            dueDate: '2024-01-15',
            tags: ['rbac', 'permissions', 'roles'],
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-15T17:30:00Z'
          },
          {
            id: 'sub-1-3-2',
            name: 'API Rate Limiting',
            description: 'Limitación de velocidad para APIs',
            status: 'completed',
            priority: 'medium',
            progress: 100,
            assignee: 'Elena Vargas',
            dueDate: '2024-01-13',
            tags: ['rate-limiting', 'api', 'security'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-13T14:20:00Z'
          },
          {
            id: 'sub-1-3-3',
            name: 'Audit Logging',
            description: 'Sistema de logs de auditoría para acciones críticas',
            status: 'completed',
            priority: 'medium',
            progress: 100,
            assignee: 'Fernando Castro',
            dueDate: '2024-01-17',
            tags: ['audit', 'logging', 'security'],
            createdAt: '2024-01-07T00:00:00Z',
            updatedAt: '2024-01-17T11:45:00Z'
          },
          {
            id: 'sub-1-3-4',
            name: 'Two-Factor Authentication',
            description: 'Implementación de 2FA con TOTP',
            status: 'pending',
            priority: 'high',
            progress: 0,
            assignee: 'Gabriela Moreno',
            dueDate: '2024-01-25',
            tags: ['2fa', 'totp', 'security'],
            createdAt: '2024-01-08T00:00:00Z',
            updatedAt: '2024-01-08T00:00:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'main-2',
    name: 'Dashboard de Agentes IA',
    description: 'Interfaz principal para monitoreo y gestión de agentes de inteligencia artificial',
    status: 'active',
    priority: 'high',
    progress: 65,
    totalSubProjects: 15,
    completedSubProjects: 8,
    dueDate: '2024-03-01',
    tags: ['dashboard', 'ai', 'monitoring'],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    groups: [
      {
        id: 'group-2-1',
        name: 'Core Dashboard',
        description: 'Componentes principales del dashboard',
        color: 'purple',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-15T11:45:00Z',
        subProjects: [
          {
            id: 'sub-2-1-1',
            name: 'Main Layout',
            description: 'Layout principal con sidebar y header',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Andrea Silva',
            dueDate: '2024-01-15',
            tags: ['layout', 'ui', 'sidebar'],
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-15T16:30:00Z'
          },
          {
            id: 'sub-2-1-2',
            name: 'Stats Cards',
            description: 'Tarjetas de estadísticas en tiempo real',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Miguel Angel',
            dueDate: '2024-01-18',
            tags: ['stats', 'cards', 'real-time'],
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-18T14:15:00Z'
          },
          {
            id: 'sub-2-1-3',
            name: 'Navigation Menu',
            description: 'Menú de navegación responsive',
            status: 'completed',
            priority: 'medium',
            progress: 100,
            assignee: 'Lucia Fernandez',
            dueDate: '2024-01-20',
            tags: ['navigation', 'responsive', 'menu'],
            createdAt: '2024-01-04T00:00:00Z',
            updatedAt: '2024-01-20T10:45:00Z'
          },
          {
            id: 'sub-2-1-4',
            name: 'Theme System',
            description: 'Sistema de temas claro/oscuro',
            status: 'in-progress',
            priority: 'low',
            progress: 85,
            assignee: 'Raul Herrera',
            dueDate: '2024-01-25',
            tags: ['theme', 'dark-mode', 'ui'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-15T13:20:00Z'
          }
        ]
      },
      {
        id: 'group-2-2',
        name: 'Agent Management',
        description: 'Gestión y monitoreo de agentes IA',
        color: 'cyan',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-15T12:30:00Z',
        subProjects: [
          {
            id: 'sub-2-2-1',
            name: 'Agent List View',
            description: 'Vista de lista de todos los agentes',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Natalia Gomez',
            dueDate: '2024-01-22',
            tags: ['agents', 'list', 'ui'],
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-22T15:45:00Z'
          },
          {
            id: 'sub-2-2-2',
            name: 'Agent Detail View',
            description: 'Vista detallada de cada agente',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Joaquin Ramos',
            dueDate: '2024-01-24',
            tags: ['agents', 'detail', 'monitoring'],
            createdAt: '2024-01-04T00:00:00Z',
            updatedAt: '2024-01-24T11:20:00Z'
          },
          {
            id: 'sub-2-2-3',
            name: 'Agent Status Monitor',
            description: 'Monitor en tiempo real del estado de agentes',
            status: 'in-progress',
            priority: 'high',
            progress: 70,
            assignee: 'Valentina Cruz',
            dueDate: '2024-01-28',
            tags: ['monitoring', 'real-time', 'status'],
            createdAt: '2024-01-06T00:00:00Z',
            updatedAt: '2024-01-15T16:45:00Z'
          },
          {
            id: 'sub-2-2-4',
            name: 'Agent Configuration',
            description: 'Panel de configuración de agentes',
            status: 'in-progress',
            priority: 'medium',
            progress: 45,
            assignee: 'Alejandro Vega',
            dueDate: '2024-02-02',
            tags: ['configuration', 'settings', 'agents'],
            createdAt: '2024-01-08T00:00:00Z',
            updatedAt: '2024-01-15T14:30:00Z'
          },
          {
            id: 'sub-2-2-5',
            name: 'Agent Performance Metrics',
            description: 'Métricas de rendimiento de agentes',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Isabella Torres',
            dueDate: '2024-02-05',
            tags: ['metrics', 'performance', 'analytics'],
            createdAt: '2024-01-10T00:00:00Z',
            updatedAt: '2024-01-10T00:00:00Z'
          }
        ]
      },
      {
        id: 'group-2-3',
        name: 'Data Visualization',
        description: 'Gráficos y visualizaciones de datos',
        color: 'orange',
        createdAt: '2024-01-04T00:00:00Z',
        updatedAt: '2024-01-15T13:15:00Z',
        subProjects: [
          {
            id: 'sub-2-3-1',
            name: 'Real-time Charts',
            description: 'Gráficos en tiempo real con Chart.js',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Sebastian Morales',
            dueDate: '2024-01-26',
            tags: ['charts', 'real-time', 'chartjs'],
            createdAt: '2024-01-04T00:00:00Z',
            updatedAt: '2024-01-26T17:30:00Z'
          },
          {
            id: 'sub-2-3-2',
            name: 'Performance Graphs',
            description: 'Gráficos de rendimiento histórico',
            status: 'completed',
            priority: 'medium',
            progress: 100,
            assignee: 'Camila Jimenez',
            dueDate: '2024-01-30',
            tags: ['performance', 'graphs', 'history'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-30T12:45:00Z'
          },
          {
            id: 'sub-2-3-3',
            name: 'Data Export Tools',
            description: 'Herramientas para exportar datos y reportes',
            status: 'in-progress',
            priority: 'low',
            progress: 30,
            assignee: 'Mateo Delgado',
            dueDate: '2024-02-08',
            tags: ['export', 'reports', 'data'],
            createdAt: '2024-01-07T00:00:00Z',
            updatedAt: '2024-01-15T15:20:00Z'
          },
          {
            id: 'sub-2-3-4',
            name: 'Custom Dashboards',
            description: 'Dashboards personalizables por usuario',
            status: 'pending',
            priority: 'low',
            progress: 0,
            assignee: 'Daniela Ortiz',
            dueDate: '2024-02-12',
            tags: ['custom', 'dashboards', 'personalization'],
            createdAt: '2024-01-09T00:00:00Z',
            updatedAt: '2024-01-09T00:00:00Z'
          },
          {
            id: 'sub-2-3-5',
            name: 'Alert System',
            description: 'Sistema de alertas y notificaciones',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Nicolas Peña',
            dueDate: '2024-02-15',
            tags: ['alerts', 'notifications', 'system'],
            createdAt: '2024-01-11T00:00:00Z',
            updatedAt: '2024-01-11T00:00:00Z'
          },
          {
            id: 'sub-2-3-6',
            name: 'Mobile Responsive Design',
            description: 'Adaptación responsive para dispositivos móviles',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Emilia Castillo',
            dueDate: '2024-02-18',
            tags: ['mobile', 'responsive', 'design'],
            createdAt: '2024-01-12T00:00:00Z',
            updatedAt: '2024-01-12T00:00:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'main-3',
    name: 'API de Agentes IA',
    description: 'API RESTful para la gestión y comunicación con agentes de inteligencia artificial',
    status: 'active',
    priority: 'high',
    progress: 55,
    totalSubProjects: 18,
    completedSubProjects: 7,
    dueDate: '2024-02-28',
    tags: ['api', 'rest', 'ai-agents'],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    groups: [
      {
        id: 'group-3-1',
        name: 'Core API',
        description: 'Endpoints principales de la API',
        color: 'indigo',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-15T14:20:00Z',
        subProjects: [
          {
            id: 'sub-3-1-1',
            name: 'Agent CRUD Operations',
            description: 'Operaciones CRUD para gestión de agentes',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Ricardo Mendoza',
            dueDate: '2024-01-20',
            tags: ['crud', 'agents', 'api'],
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-20T16:45:00Z'
          },
          {
            id: 'sub-3-1-2',
            name: 'Authentication Endpoints',
            description: 'Endpoints de autenticación y autorización',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Paola Guerrero',
            dueDate: '2024-01-18',
            tags: ['auth', 'endpoints', 'security'],
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-18T13:30:00Z'
          },
          {
            id: 'sub-3-1-3',
            name: 'Task Management API',
            description: 'API para gestión de tareas de agentes',
            status: 'in-progress',
            priority: 'high',
            progress: 75,
            assignee: 'Andres Rojas',
            dueDate: '2024-01-25',
            tags: ['tasks', 'management', 'api'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-15T17:15:00Z'
          },
          {
            id: 'sub-3-1-4',
            name: 'Real-time Communication',
            description: 'WebSocket para comunicación en tiempo real',
            status: 'in-progress',
            priority: 'medium',
            progress: 60,
            assignee: 'Mariana Campos',
            dueDate: '2024-01-30',
            tags: ['websocket', 'real-time', 'communication'],
            createdAt: '2024-01-07T00:00:00Z',
            updatedAt: '2024-01-15T15:45:00Z'
          }
        ]
      },
      {
        id: 'group-3-2',
        name: 'Data Management',
        description: 'Gestión de datos y almacenamiento',
        color: 'teal',
        createdAt: '2024-01-04T00:00:00Z',
        updatedAt: '2024-01-15T15:30:00Z',
        subProjects: [
          {
            id: 'sub-3-2-1',
            name: 'Database Schema',
            description: 'Diseño del esquema de base de datos',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Gonzalo Vargas',
            dueDate: '2024-01-15',
            tags: ['database', 'schema', 'design'],
            createdAt: '2024-01-04T00:00:00Z',
            updatedAt: '2024-01-15T14:20:00Z'
          },
          {
            id: 'sub-3-2-2',
            name: 'Data Validation',
            description: 'Validación de datos de entrada',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Fernanda Lara',
            dueDate: '2024-01-22',
            tags: ['validation', 'data', 'security'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-22T11:45:00Z'
          },
          {
            id: 'sub-3-2-3',
            name: 'Data Migration Tools',
            description: 'Herramientas para migración de datos',
            status: 'completed',
            priority: 'medium',
            progress: 100,
            assignee: 'Esteban Moreno',
            dueDate: '2024-01-28',
            tags: ['migration', 'tools', 'data'],
            createdAt: '2024-01-06T00:00:00Z',
            updatedAt: '2024-01-28T16:30:00Z'
          },
          {
            id: 'sub-3-2-4',
            name: 'Backup System',
            description: 'Sistema automatizado de respaldos',
            status: 'in-progress',
            priority: 'medium',
            progress: 40,
            assignee: 'Catalina Reyes',
            dueDate: '2024-02-05',
            tags: ['backup', 'automation', 'system'],
            createdAt: '2024-01-08T00:00:00Z',
            updatedAt: '2024-01-15T12:15:00Z'
          },
          {
            id: 'sub-3-2-5',
            name: 'Data Analytics',
            description: 'Endpoints para análisis de datos',
            status: 'pending',
            priority: 'low',
            progress: 0,
            assignee: 'Maximiliano Silva',
            dueDate: '2024-02-10',
            tags: ['analytics', 'data', 'endpoints'],
            createdAt: '2024-01-10T00:00:00Z',
            updatedAt: '2024-01-10T00:00:00Z'
          }
        ]
      },
      {
        id: 'group-3-3',
        name: 'Performance & Security',
        description: 'Optimización y seguridad de la API',
        color: 'pink',
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-15T16:00:00Z',
        subProjects: [
          {
            id: 'sub-3-3-1',
            name: 'API Rate Limiting',
            description: 'Implementación de límites de velocidad',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Ignacio Herrera',
            dueDate: '2024-01-25',
            tags: ['rate-limiting', 'security', 'performance'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-25T15:20:00Z'
          },
          {
            id: 'sub-3-3-2',
            name: 'Request Caching',
            description: 'Sistema de caché para optimizar respuestas',
            status: 'in-progress',
            priority: 'medium',
            progress: 65,
            assignee: 'Valeria Nunez',
            dueDate: '2024-02-01',
            tags: ['caching', 'performance', 'optimization'],
            createdAt: '2024-01-07T00:00:00Z',
            updatedAt: '2024-01-15T14:45:00Z'
          },
          {
            id: 'sub-3-3-3',
            name: 'API Documentation',
            description: 'Documentación completa de la API con Swagger',
            status: 'in-progress',
            priority: 'medium',
            progress: 50,
            assignee: 'Rodrigo Paz',
            dueDate: '2024-02-08',
            tags: ['documentation', 'swagger', 'api'],
            createdAt: '2024-01-09T00:00:00Z',
            updatedAt: '2024-01-15T13:30:00Z'
          },
          {
            id: 'sub-3-3-4',
            name: 'Load Testing',
            description: 'Pruebas de carga y rendimiento',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Antonella Medina',
            dueDate: '2024-02-12',
            tags: ['testing', 'load', 'performance'],
            createdAt: '2024-01-11T00:00:00Z',
            updatedAt: '2024-01-11T00:00:00Z'
          },
          {
            id: 'sub-3-3-5',
            name: 'Security Audit',
            description: 'Auditoría de seguridad completa',
            status: 'pending',
            priority: 'high',
            progress: 0,
            assignee: 'Benjamin Castro',
            dueDate: '2024-02-15',
            tags: ['security', 'audit', 'testing'],
            createdAt: '2024-01-12T00:00:00Z',
            updatedAt: '2024-01-12T00:00:00Z'
          },
          {
            id: 'sub-3-3-6',
            name: 'Error Handling',
            description: 'Sistema robusto de manejo de errores',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Constanza Flores',
            dueDate: '2024-02-18',
            tags: ['error-handling', 'robustness', 'api'],
            createdAt: '2024-01-13T00:00:00Z',
            updatedAt: '2024-01-13T00:00:00Z'
          },
          {
            id: 'sub-3-3-7',
            name: 'Monitoring & Logging',
            description: 'Sistema de monitoreo y logs detallados',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Emilio Gutierrez',
            dueDate: '2024-02-20',
            tags: ['monitoring', 'logging', 'observability'],
            createdAt: '2024-01-14T00:00:00Z',
            updatedAt: '2024-01-14T00:00:00Z'
          },
          {
            id: 'sub-3-3-8',
            name: 'API Versioning',
            description: 'Sistema de versionado de API',
            status: 'pending',
            priority: 'low',
            progress: 0,
            assignee: 'Florencia Ramos',
            dueDate: '2024-02-25',
            tags: ['versioning', 'api', 'compatibility'],
            createdAt: '2024-01-15T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'main-4',
    name: 'Sistema de Notificaciones',
    description: 'Plataforma completa de notificaciones en tiempo real para usuarios y agentes IA',
    status: 'active',
    priority: 'medium',
    progress: 40,
    totalSubProjects: 10,
    completedSubProjects: 3,
    dueDate: '2024-03-15',
    tags: ['notifications', 'real-time', 'messaging'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
    groups: [
      {
        id: 'group-4-1',
        name: 'Core Notifications',
        description: 'Sistema base de notificaciones',
        color: 'yellow',
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-15T16:30:00Z',
        subProjects: [
          {
            id: 'sub-4-1-1',
            name: 'Notification Service',
            description: 'Servicio principal de notificaciones',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Cristian Morales',
            dueDate: '2024-01-30',
            tags: ['service', 'notifications', 'core'],
            createdAt: '2024-01-05T00:00:00Z',
            updatedAt: '2024-01-30T14:45:00Z'
          },
          {
            id: 'sub-4-1-2',
            name: 'Push Notifications',
            description: 'Notificaciones push para dispositivos móviles',
            status: 'completed',
            priority: 'high',
            progress: 100,
            assignee: 'Alejandra Vega',
            dueDate: '2024-02-05',
            tags: ['push', 'mobile', 'notifications'],
            createdAt: '2024-01-06T00:00:00Z',
            updatedAt: '2024-02-05T16:20:00Z'
          },
          {
            id: 'sub-4-1-3',
            name: 'Email Notifications',
            description: 'Sistema de notificaciones por email',
            status: 'completed',
            priority: 'medium',
            progress: 100,
            assignee: 'Mauricio Torres',
            dueDate: '2024-02-08',
            tags: ['email', 'notifications', 'smtp'],
            createdAt: '2024-01-07T00:00:00Z',
            updatedAt: '2024-02-08T11:30:00Z'
          },
          {
            id: 'sub-4-1-4',
            name: 'In-App Notifications',
            description: 'Notificaciones dentro de la aplicación',
            status: 'in-progress',
            priority: 'high',
            progress: 70,
            assignee: 'Carla Jimenez',
            dueDate: '2024-02-12',
            tags: ['in-app', 'notifications', 'ui'],
            createdAt: '2024-01-08T00:00:00Z',
            updatedAt: '2024-01-15T17:45:00Z'
          }
        ]
      },
      {
        id: 'group-4-2',
        name: 'Notification Management',
        description: 'Gestión y configuración de notificaciones',
        color: 'lime',
        createdAt: '2024-01-06T00:00:00Z',
        updatedAt: '2024-01-15T17:00:00Z',
        subProjects: [
          {
            id: 'sub-4-2-1',
            name: 'User Preferences',
            description: 'Panel de preferencias de notificaciones',
            status: 'in-progress',
            priority: 'medium',
            progress: 55,
            assignee: 'Joaquin Herrera',
            dueDate: '2024-02-15',
            tags: ['preferences', 'user', 'settings'],
            createdAt: '2024-01-06T00:00:00Z',
            updatedAt: '2024-01-15T15:30:00Z'
          },
          {
            id: 'sub-4-2-2',
            name: 'Notification Templates',
            description: 'Sistema de plantillas para notificaciones',
            status: 'in-progress',
            priority: 'medium',
            progress: 45,
            assignee: 'Valentina Ruiz',
            dueDate: '2024-02-18',
            tags: ['templates', 'notifications', 'customization'],
            createdAt: '2024-01-09T00:00:00Z',
            updatedAt: '2024-01-15T14:15:00Z'
          },
          {
            id: 'sub-4-2-3',
            name: 'Notification History',
            description: 'Historial de notificaciones enviadas',
            status: 'pending',
            priority: 'low',
            progress: 0,
            assignee: 'Gabriel Martinez',
            dueDate: '2024-02-22',
            tags: ['history', 'tracking', 'notifications'],
            createdAt: '2024-01-10T00:00:00Z',
            updatedAt: '2024-01-10T00:00:00Z'
          },
          {
            id: 'sub-4-2-4',
            name: 'Notification Analytics',
            description: 'Análisis de efectividad de notificaciones',
            status: 'pending',
            priority: 'low',
            progress: 0,
            assignee: 'Isidora Campos',
            dueDate: '2024-02-25',
            tags: ['analytics', 'metrics', 'notifications'],
            createdAt: '2024-01-11T00:00:00Z',
            updatedAt: '2024-01-11T00:00:00Z'
          },
          {
            id: 'sub-4-2-5',
            name: 'Bulk Notifications',
            description: 'Sistema de notificaciones masivas',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Leonardo Soto',
            dueDate: '2024-02-28',
            tags: ['bulk', 'mass', 'notifications'],
            createdAt: '2024-01-12T00:00:00Z',
            updatedAt: '2024-01-12T00:00:00Z'
          },
          {
            id: 'sub-4-2-6',
            name: 'Notification Scheduling',
            description: 'Programación de notificaciones',
            status: 'pending',
            priority: 'medium',
            progress: 0,
            assignee: 'Martina Delgado',
            dueDate: '2024-03-05',
            tags: ['scheduling', 'automation', 'notifications'],
            createdAt: '2024-01-13T00:00:00Z',
            updatedAt: '2024-01-13T00:00:00Z'
          }
        ]
      }
    ]
  }
]
