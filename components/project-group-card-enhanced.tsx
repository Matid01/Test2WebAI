"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { GlowButton } from '@/components/ui/glow-button'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { useProjects } from '@/hooks/use-projects'
import { CheckCircle, Clock, PlayCircle, AlertCircle, Users, TrendingUp, ChevronDown, ChevronUp, Eye, Calendar, User, FileText, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CreateSubProjectDialog } from '@/components/create-sub-project-dialog'
import { EditSubProjectDialog } from '@/components/edit-sub-project-dialog'
import type { ProjectGroup, SubProject } from '@/utils/main-projects-data'

interface ProjectGroupCardEnhancedProps {
  group: ProjectGroup
  projectId: string
}

export function ProjectGroupCardEnhanced({ group, projectId }: ProjectGroupCardEnhancedProps) {
  const { isDark } = useTheme()
  const { deleteGroup, deleteSubProject } = useProjects()
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const [editingSubProject, setEditingSubProject] = useState<SubProject | null>(null)

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedProjects(newExpanded)
  }

  const getProjectDescription = (project: SubProject) => {
    if (project.description) {
      return project.description
    }
    
    const projectName = project.name.toLowerCase()
    if (projectName.includes('login') || projectName.includes('auth')) {
      return 'Sistema de autenticación seguro integrado con la plataforma. Permite el acceso controlado de usuarios con diferentes niveles de permisos y roles específicos.'
    } else if (projectName.includes('dashboard')) {
      return 'Panel de control principal del sistema con métricas en tiempo real, visualización de datos y herramientas de administración avanzadas.'
    } else if (projectName.includes('api')) {
      return 'Interfaz de programación de aplicaciones que permite la comunicación entre diferentes componentes del sistema de manera segura y eficiente.'
    } else if (projectName.includes('database') || projectName.includes('bd')) {
      return 'Sistema de gestión de base de datos optimizado para el almacenamiento y recuperación eficiente de información crítica del sistema.'
    } else if (projectName.includes('ui') || projectName.includes('interfaz')) {
      return 'Interfaz de usuario moderna y responsiva diseñada para proporcionar la mejor experiencia de usuario posible.'
    } else if (projectName.includes('test') || projectName.includes('prueba')) {
      return 'Suite completa de pruebas automatizadas que garantiza la calidad y estabilidad del sistema en todos los entornos.'
    } else if (projectName.includes('deploy') || projectName.includes('despliegue')) {
      return 'Sistema automatizado de despliegue que permite actualizaciones continuas y sin interrupciones del servicio.'
    } else if (projectName.includes('monitor') || projectName.includes('monitoreo')) {
      return 'Sistema de monitoreo en tiempo real que supervisa el rendimiento, disponibilidad y salud general del sistema.'
    } else if (projectName.includes('security') || projectName.includes('seguridad')) {
      return 'Módulo de seguridad avanzado que protege el sistema contra amenazas y garantiza la integridad de los datos.'
    } else if (projectName.includes('backup') || projectName.includes('respaldo')) {
      return 'Sistema automatizado de respaldos que garantiza la recuperación de datos en caso de fallos o emergencias.'
    }
    
    return 'Componente del ecosistema diseñado para optimizar y automatizar procesos específicos del sistema con tecnología de vanguardia.'
  }

  const getGroupColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
      case 'green':
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
      case 'red':
        return {
          border: 'border-red-500/20',
          bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
          text: 'text-red-600',
          icon: 'text-red-500',
          accent: 'bg-red-500/20'
        }
      case 'orange':
        return {
          border: 'border-orange-500/20',
          bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
          text: 'text-orange-600',
          icon: 'text-orange-500',
          accent: 'bg-orange-500/20'
        }
      case 'cyan':
        return {
          border: 'border-cyan-500/20',
          bg: isDark ? 'bg-cyan-500/10' : 'bg-cyan-50',
          text: 'text-cyan-600',
          icon: 'text-cyan-500',
          accent: 'bg-cyan-500/20'
        }
      case 'pink':
        return {
          border: 'border-pink-500/20',
          bg: isDark ? 'bg-pink-500/10' : 'bg-pink-50',
          text: 'text-pink-600',
          icon: 'text-pink-500',
          accent: 'bg-pink-500/20'
        }
      case 'yellow':
        return {
          border: 'border-yellow-500/20',
          bg: isDark ? 'bg-yellow-500/10' : 'bg-yellow-50',
          text: 'text-yellow-600',
          icon: 'text-yellow-500',
          accent: 'bg-yellow-500/20'
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
  
  const totalProjects = group.subProjects.length
  const completedProjects = group.subProjects.filter(p => p.status === 'completed').length
  const avgProgress = totalProjects > 0 
    ? Math.round(group.subProjects.reduce((acc, p) => acc + p.progress, 0) / totalProjects)
    : 0

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <PlayCircle className="h-4 w-4 text-blue-500" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'on-hold':
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'on-hold':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getPriorityColor = (priority: string) => {
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

  const handleDeleteGroup = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar el grupo "${group.name}"? Esto eliminará todos los sub-proyectos del grupo.`)) {
      deleteGroup(projectId, group.id)
    }
  }

  const handleDeleteSubProject = (subProjectId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este sub-proyecto?')) {
      deleteSubProject(projectId, group.id, subProjectId)
    }
  }

  return (
    <>
      <Card className={`backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
        isDark 
          ? `bg-black/40 ${colorClasses.border}` 
          : `bg-white/80 ${colorClasses.border}`
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <CardTitle className={`text-xl font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {group.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDeleteGroup} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar Grupo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className={`text-sm mt-1 transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {group.description}
              </p>
            </div>
            <div className={`p-3 rounded-lg ml-4 ${colorClasses.bg}`}>
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
        
        <CardContent className="space-y-4">
          {group.subProjects.map((project) => {
            const isExpanded = expandedProjects.has(project.id)
            
            return (
              <Card 
                key={project.id}
                className={`transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                } ${isExpanded ? 'shadow-lg' : 'shadow-sm'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      {getStatusIcon(project.status)}
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                            {project.status === 'completed' ? 'Completado' :
                             project.status === 'in-progress' ? 'En Progreso' :
                             project.status === 'pending' ? 'Pendiente' : 'En Pausa'}
                          </Badge>
                          <Badge className={`${getPriorityColor(project.priority)} border text-xs`}>
                            {project.priority === 'urgent' ? 'Urgente' :
                             project.priority === 'high' ? 'Alta' : 
                             project.priority === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setEditingSubProject(project)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteSubProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <GlowButton
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 ml-2"
                        onClick={() => toggleProjectExpansion(project.id)}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </GlowButton>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <Progress value={project.progress} className="flex-1 h-2" />
                    <span className={`text-sm font-medium min-w-[3rem] text-right ${
                      project.progress >= 100 ? 'text-green-500' :
                      project.progress >= 50 ? colorClasses.text : 'text-yellow-500'
                    }`}>
                      {project.progress}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {project.assignee || 'Sin asignar'}
                      </span>
                    </div>
                    {project.dueDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          {new Date(project.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {isExpanded && (
                    <div className={`mt-4 pt-4 border-t transition-all duration-300 ${
                      isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                      <div className="space-y-3">
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
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {project.tags && project.tags.length > 0 && (
                            <div className={`p-2 rounded ${colorClasses.bg}`}>
                              <span className="font-medium">Tecnologías:</span>
                              <br />
                              <div className="flex flex-wrap gap-1 mt-1">
                                {project.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {project.dueDate && (
                            <div className={`p-2 rounded ${
                              isDark ? 'bg-white/5' : 'bg-gray-100'
                            }`}>
                              <span className="font-medium">Fecha Estimada:</span>
                              <br />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                {new Date(project.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
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
          
          {/* Add Sub-project Button */}
          <CreateSubProjectDialog
            projectId={projectId}
            groupId={group.id}
            trigger={
              <Card className={`transition-all duration-300 border-2 border-dashed cursor-pointer hover:shadow-md ${
                isDark 
                  ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30' 
                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-3 rounded-full ${colorClasses.bg}`}>
                      <Plus className={`h-6 w-6 ${colorClasses.icon}`} />
                    </div>
                    <h4 className={`font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Agregar Sub-proyecto
                    </h4>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Crear un nuevo sub-proyecto en este grupo
                    </p>
                  </div>
                </CardContent>
              </Card>
            }
          />
          
          {group.subProjects.length === 0 && (
            <div className={`text-center py-8 text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="text-4xl mb-4">📝</div>
              <p className="mb-2">No hay sub-proyectos en este grupo</p>
              <p className="text-xs">Haz clic en "Agregar Sub-proyecto" para comenzar</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Sub-project Dialog */}
      {editingSubProject && (
        <EditSubProjectDialog
          projectId={projectId}
          groupId={group.id}
          subProject={editingSubProject}
          open={!!editingSubProject}
          onOpenChange={(open) => !open && setEditingSubProject(null)}
        />
      )}
    </>
  )
}
