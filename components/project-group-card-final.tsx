"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { GlowButton } from '@/components/ui/glow-button'
import { useTheme } from '@/hooks/use-theme'
import { CheckCircle, Clock, PlayCircle, AlertCircle, Users, ChevronDown, ChevronUp, Eye, Calendar, User, FileText } from 'lucide-react'
import type { ProjectGroup } from '@/utils/project-data'

interface ProjectGroupCardProps {
  group: ProjectGroup
}

export function ProjectGroupCardFinal({ group }: ProjectGroupCardProps) {
  const { isDark } = useTheme()
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set())

  const toggleProjectExpansion = (projectIndex: number) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectIndex)) {
      newExpanded.delete(projectIndex)
    } else {
      newExpanded.add(projectIndex)
    }
    setExpandedProjects(newExpanded)
  }

  const getProjectDescription = (project: any) => {
    if (project.observaciones) {
      return project.observaciones
    }
    
    const projectName = project.proyecto.toLowerCase()
    if (projectName.includes('login')) {
      return 'Sistema de autenticación seguro integrado con la plataforma PJN. Permite el acceso controlado de usuarios con diferentes niveles de permisos y roles específicos.'
    } else if (projectName.includes('clasificador') && projectName.includes('documento') && !projectName.includes('v2')) {
      return 'Sistema inteligente de clasificación automática de documentos utilizando algoritmos de machine learning. Procesa y categoriza documentos legales con alta precisión.'
    } else if (projectName.includes('clasificador') && projectName.includes('v2')) {
      return 'Segunda versión mejorada del clasificador de documentos con algoritmos más avanzados, mayor precisión y capacidades de procesamiento en tiempo real.'
    } else if (projectName.includes('calificador') && projectName.includes('embargo')) {
      return 'Herramienta de IA para la evaluación y calificación automática de embargos. Analiza documentos legales y determina la viabilidad y características de los embargos.'
    } else if (projectName.includes('calificador') && projectName.includes('liquidacion')) {
      return 'Sistema de IA para la evaluación y procesamiento automático de liquidaciones. Analiza documentos financieros y calcula montos con precisión.'
    } else if (projectName.includes('planilla') && projectName.includes('embargo')) {
      return 'Sistema automatizado para la generación de planillas de embargos. Crea documentos estructurados con toda la información legal requerida.'
    } else if (projectName.includes('descarga') && projectName.includes('pdf')) {
      return 'Módulo optimizado para la descarga segura y eficiente de documentos PDF. Incluye validación de integridad y control de acceso.'
    } else if (projectName.includes('subida') && projectName.includes('pdf')) {
      return 'Sistema de carga de documentos PDF con validación automática, procesamiento de metadatos y almacenamiento seguro en la nube.'
    } else if (projectName.includes('correo') && projectName.includes('alerta')) {
      return 'Sistema automatizado de notificaciones por correo electrónico para alertas de embargos. Envía notificaciones personalizadas a los usuarios relevantes.'
    } else if (projectName.includes('supervisor')) {
      return 'Agente inteligente de supervisión que monitorea todos los procesos del sistema, detecta anomalías y toma acciones correctivas automáticamente.'
    } else if (projectName.includes('sin nombre')) {
      return 'Proyecto en fase de definición. Se están evaluando diferentes opciones y alcances para determinar la funcionalidad específica que aportará al ecosistema de agentes IA.'
    }
    
    return 'Proyecto del ecosistema de Agentes IA diseñado para optimizar y automatizar procesos específicos del sistema.'
  }

  const getGroupColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          border: 'border-emerald-500/20',
          bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
          text: 'text-emerald-600',
          icon: 'text-emerald-500',
          accent: 'bg-emerald-500/20'
        }
      case 'blue':
        return {
          border: 'border-blue-500/20',
          bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
          text: 'text-blue-600',
          icon: 'text-blue-500',
          accent: 'bg-blue-500/20'
        }
      case 'purple':
        return {
          border: 'border-purple-500/20',
          bg: isDark ? 'bg-purple-500/10' : 'bg-purple-50',
          text: 'text-purple-600',
          icon: 'text-purple-500',
          accent: 'bg-purple-500/20'
        }
      default:
        return {
          border: 'border-gray-500/20',
          bg: isDark ? 'bg-gray-500/10' : 'bg-gray-50',
          text: 'text-gray-600',
          icon: 'text-gray-500',
          accent: 'bg-gray-500/20'
        }
    }
  }

  const colorClasses = getGroupColorClasses(group.color)
  
  const totalProjects = group.projects.length
  const completedProjects = group.projects.filter(p => p.progreso >= 100).length
  const avgProgress = totalProjects > 0 
    ? Math.round(group.projects.reduce((acc, p) => acc + p.progreso, 0) / totalProjects)
    : 0

  const getStatusIcon = (estado: string) => {
    const estadoLower = estado.toLowerCase()
    if (estadoLower.includes('completado') || estadoLower.includes('terminado')) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else if (estadoLower.includes('desarrollo') || estadoLower.includes('progreso')) {
      return <PlayCircle className="h-4 w-4 text-blue-500" />
    } else if (estadoLower.includes('planificación') || estadoLower.includes('pendiente')) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    } else if (estadoLower.includes('definición')) {
      return <Clock className="h-4 w-4 text-gray-500" />
    }
    return <Clock className="h-4 w-4 text-gray-500" />
  }

  const getStatusColor = (estado: string) => {
    const estadoLower = estado.toLowerCase()
    if (estadoLower.includes('completado') || estadoLower.includes('terminado')) {
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    } else if (estadoLower.includes('desarrollo') || estadoLower.includes('progreso')) {
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    } else if (estadoLower.includes('planificación') || estadoLower.includes('pendiente')) {
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    } else if (estadoLower.includes('definición')) {
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
    return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  const getPriorityColor = (prioridad: string) => {
    const prioridadLower = prioridad.toLowerCase()
    if (prioridadLower.includes('alta') || prioridadLower.includes('crítica')) {
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    } else if (prioridadLower.includes('media') || prioridadLower.includes('normal')) {
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    } else if (prioridadLower.includes('baja')) {
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    } else if (prioridadLower.includes('definir')) {
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
    return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  return (
    <Card className={`backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
      isDark 
        ? `bg-black/40 ${colorClasses.border}` 
        : `bg-white/80 ${colorClasses.border}`
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={`text-xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {group.name}
            </CardTitle>
            <p className={`text-sm mt-1 transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {group.description}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
            <Users className={`h-6 w-6 ${colorClasses.icon}`} />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className={`text-lg font-bold ${colorClasses.text}`}>{totalProjects}</div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{completedProjects}</div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completados</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${colorClasses.text}`}>{avgProgress}%</div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Promedio</div>
          </div>
        </div>
        
        <Progress 
          value={avgProgress} 
          className={`h-2 mt-3 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
        />
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Individual Project Cards */}
        {group.projects.map((project, index) => {
          const isExpanded = expandedProjects.has(index)
          
          return (
            <Card 
              key={index}
              className={`transition-all duration-300 ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              } ${isExpanded ? 'shadow-lg' : 'shadow-sm'}`}
            >
              <CardContent className="p-4">
                {/* Project Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 flex-1">
                    {getStatusIcon(project.estado)}
                    <div className="flex-1">
                      <h4 className={`font-semibold text-sm ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.proyecto}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`${getStatusColor(project.estado)} border text-xs`}>
                          {project.estado}
                        </Badge>
                        <Badge className={`${getPriorityColor(project.prioridad)} border text-xs`}>
                          {project.prioridad}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <GlowButton
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 ml-2"
                    onClick={() => toggleProjectExpansion(index)}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </GlowButton>
                </div>
                
                {/* Progress Bar */}
                <div className="flex items-center space-x-3 mb-3">
                  <Progress value={project.progreso} className="flex-1 h-2" />
                  <span className={`text-sm font-medium min-w-[3rem] text-right ${
                    project.progreso >= 100 ? 'text-green-500' :
                    project.progreso >= 50 ? colorClasses.text : 'text-yellow-500'
                  }`}>
                    {project.progreso}%
                  </span>
                </div>
                
                {/* Basic Info */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {project.responsable}
                    </span>
                  </div>
                  {project.fechaInicio && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {project.fechaInicio}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`mt-4 pt-4 border-t transition-all duration-300 ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    <div className="space-y-3">
                      {/* Description */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <h5 className={`font-medium text-sm ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            Descripción del Proyecto
                          </h5>
                        </div>
                        <p className={`text-sm leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {getProjectDescription(project)}
                        </p>
                      </div>
                      
                      {/* Additional Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {project.tecnologia && (
                          <div className={`p-2 rounded ${colorClasses.bg}`}>
                            <span className="font-medium">Tecnología:</span>
                            <br />
                            <span className={colorClasses.text}>{project.tecnologia}</span>
                          </div>
                        )}
                        
                        {project.fechaFin && (
                          <div className={`p-2 rounded ${
                            isDark ? 'bg-white/5' : 'bg-gray-100'
                          }`}>
                            <span className="font-medium">Fecha Estimada:</span>
                            <br />
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                              {project.fechaFin}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 pt-2">
                        <GlowButton variant="ghost" size="sm" className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>Ver Detalles</span>
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
        
        {group.projects.length === 0 && (
          <div className={`text-center py-8 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No hay proyectos en este grupo
          </div>
        )}
      </CardContent>
    </Card>
  )
}
