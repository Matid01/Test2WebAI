export interface ProjectData {
  proyecto: string
  estado: string
  progreso: number
  responsable: string
  prioridad: string
  grupo: string
  tecnologia: string
  fechaInicio: string
  fechaFin: string
  observaciones: string
}

export interface ProjectGroup {
  id: string
  name: string
  description: string
  color: string
  projects: ProjectData[]
}

// EXACTLY 11 projects as specified
export const projectsData: ProjectData[] = [
  // Group 1: Autenticación (1 project)
  {
    proyecto: 'Login PJN',
    estado: 'Completado',
    progreso: 100,
    responsable: 'Equipo Autenticación',
    fechaInicio: '01/11/2023',
    fechaFin: '15/12/2023',
    prioridad: 'Alta',
    grupo: 'Autenticación',
    tecnologia: 'React/Node.js',
    observaciones: 'Sistema de login integrado con PJN funcionando correctamente'
  },
  
  // Group 2: Procesamiento de Documentos (7 projects)
  {
    proyecto: 'Clasificador de Documentos',
    estado: 'En Desarrollo',
    progreso: 85,
    responsable: 'Equipo ML',
    fechaInicio: '15/01/2024',
    fechaFin: '28/02/2024',
    prioridad: 'Alta',
    grupo: 'Procesamiento de Documentos',
    tecnologia: 'Python/TensorFlow',
    observaciones: 'Modelo de clasificación con 95% de precisión'
  },
  {
    proyecto: 'Calificador de Embargos',
    estado: 'En Desarrollo',
    progreso: 70,
    responsable: 'Equipo Legal-IA',
    fechaInicio: '01/02/2024',
    fechaFin: '15/03/2024',
    prioridad: 'Alta',
    grupo: 'Procesamiento de Documentos',
    tecnologia: 'Python/scikit-learn',
    observaciones: 'Algoritmo de calificación en fase de pruebas'
  },
  {
    proyecto: 'Planilla de Embargos',
    estado: 'En Desarrollo',
    progreso: 60,
    responsable: 'Equipo Backend',
    fechaInicio: '10/02/2024',
    fechaFin: '20/03/2024',
    prioridad: 'Media',
    grupo: 'Procesamiento de Documentos',
    tecnologia: 'Node.js/Express',
    observaciones: 'Generación automática de planillas implementada'
  },
  {
    proyecto: 'Descarga PDF',
    estado: 'Completado',
    progreso: 100,
    responsable: 'Equipo Frontend',
    fechaInicio: '05/01/2024',
    fechaFin: '25/01/2024',
    prioridad: 'Media',
    grupo: 'Procesamiento de Documentos',
    tecnologia: 'React/PDF.js',
    observaciones: 'Sistema de descarga optimizado y funcionando'
  },
  {
    proyecto: 'Subida PDF',
    estado: 'Completado',
    progreso: 100,
    responsable: 'Equipo Frontend',
    fechaInicio: '05/01/2024',
    fechaFin: '20/01/2024',
    prioridad: 'Media',
    grupo: 'Procesamiento de Documentos',
    tecnologia: 'React/Multer',
    observaciones: 'Upload con validación y procesamiento automático'
  },
  {
    proyecto: 'Correo de Alerta Embargos',
    estado: 'En Desarrollo',
    progreso: 45,
    responsable: 'Equipo Notificaciones',
    fechaInicio: '20/02/2024',
    fechaFin: '10/04/2024',
    prioridad: 'Media',
    grupo: 'Procesamiento de Documentos',
    tecnologia: 'Node.js/Nodemailer',
    observaciones: 'Sistema de alertas automáticas en desarrollo'
  },
  {
    proyecto: 'Agente Supervisor',
    estado: 'Planificación',
    progreso: 25,
    responsable: 'Equipo IA Avanzada',
    fechaInicio: '01/03/2024',
    fechaFin: '30/05/2024',
    prioridad: 'Alta',
    grupo: 'Procesamiento de Documentos',
    tecnologia: 'Python/OpenAI',
    observaciones: 'Agente de supervisión inteligente en diseño'
  },
  
  // Group 3: Clasificación y Liquidaciones (3 projects)
  {
    proyecto: 'Clasificador de Documentos v2',
    estado: 'Planificación',
    progreso: 15,
    responsable: 'Equipo ML Avanzado',
    fechaInicio: '15/03/2024',
    fechaFin: '30/06/2024',
    prioridad: 'Media',
    grupo: 'Clasificación y Liquidaciones',
    tecnologia: 'Python/PyTorch',
    observaciones: 'Segunda versión del clasificador con mejoras'
  },
  {
    proyecto: 'Calificador de Liquidaciones',
    estado: 'Planificación',
    progreso: 10,
    responsable: 'Equipo Finanzas-IA',
    fechaInicio: '01/04/2024',
    fechaFin: '31/07/2024',
    prioridad: 'Alta',
    grupo: 'Clasificación y Liquidaciones',
    tecnologia: 'Python/Pandas',
    observaciones: 'Sistema de calificación de liquidaciones automático'
  },
  {
    proyecto: 'Proyecto Sin Nombre',
    estado: 'En Definición',
    progreso: 0,
    responsable: 'Por Asignar',
    fechaInicio: '',
    fechaFin: '',
    prioridad: 'Por Definir',
    grupo: 'Clasificación y Liquidaciones',
    tecnologia: 'Por Definir',
    observaciones: 'Proyecto en fase de definición de alcance y objetivos'
  }
]

export function groupProjectsByCategory(projects: ProjectData[]): ProjectGroup[] {
  const groups: ProjectGroup[] = [
    {
      id: 'auth',
      name: 'Autenticación',
      description: 'Sistema de autenticación y acceso',
      color: 'emerald',
      projects: []
    },
    {
      id: 'documents',
      name: 'Procesamiento de Documentos',
      description: 'Clasificación, embargos y gestión documental',
      color: 'blue',
      projects: []
    },
    {
      id: 'liquidations',
      name: 'Clasificación y Liquidaciones',
      description: 'Sistemas de clasificación avanzada y liquidaciones',
      color: 'purple',
      projects: []
    }
  ]

  projects.forEach(project => {
    const grupo = project.grupo?.toLowerCase() || ''
    
    if (grupo.includes('autenticación') || grupo.includes('auth')) {
      groups[0].projects.push(project)
    } else if (grupo.includes('procesamiento') || grupo.includes('document')) {
      groups[1].projects.push(project)
    } else if (grupo.includes('clasificación') || grupo.includes('liquidacion')) {
      groups[2].projects.push(project)
    } else {
      // Default fallback
      groups[1].projects.push(project)
    }
  })

  return groups
}

export function getProjectStats(projects: ProjectData[]) {
  const total = projects.length
  
  const completed = projects.filter(p => 
    p.estado.toLowerCase().includes('completado') || 
    p.estado.toLowerCase().includes('terminado') ||
    p.estado.toLowerCase().includes('finalizado') ||
    p.progreso >= 100
  ).length
  
  const inProgress = projects.filter(p => 
    p.estado.toLowerCase().includes('desarrollo') || 
    p.estado.toLowerCase().includes('progreso') ||
    p.estado.toLowerCase().includes('proceso') ||
    (p.progreso > 0 && p.progreso < 100)
  ).length
  
  const planned = projects.filter(p => 
    p.estado.toLowerCase().includes('planificación') || 
    p.estado.toLowerCase().includes('planificacion') ||
    p.estado.toLowerCase().includes('pendiente') ||
    p.estado.toLowerCase().includes('planeado') ||
    p.estado.toLowerCase().includes('definición') ||
    p.progreso === 0
  ).length

  const avgProgress = total > 0 
    ? Math.round(projects.reduce((acc, p) => acc + p.progreso, 0) / total)
    : 0
  
  return {
    total,
    completed,
    inProgress,
    planned,
    avgProgress
  }
}
