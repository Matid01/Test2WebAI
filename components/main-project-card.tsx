"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { MoreVertical, Calendar, Users, CheckCircle, Clock, ArrowRight, Layers, Target, TrendingUp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'
import { EditMainProjectDialog } from '@/components/edit-main-project-dialog'
import { useProjects } from '@/hooks/use-projects'
import type { MainProject } from '@/utils/main-projects-data'

interface MainProjectCardProps {
  project: MainProject
  onSelect: (project: MainProject) => void
}

export function MainProjectCard({ project, onSelect }: MainProjectCardProps) {
  const { isDark } = useTheme()
  const { deleteProject } = useProjects()
  const [showEditDialog, setShowEditDialog] = useState(false)

  // Verificar que project existe y tiene las propiedades necesarias
  if (!project) {
    return null
  }

  const groups = project.groups || []
  const tags = project.tags || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-500/20 text-green-600'
      case 'completed': return isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-500/20 text-blue-600'
      case 'on-hold': return isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-600'
      case 'archived': return isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-500/20 text-gray-600'
      default: return isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-500/20 text-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-500/20 text-red-600'
      case 'high': return isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-500/20 text-orange-600'
      case 'medium': return isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-600'
      case 'low': return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-500/20 text-green-600'
      default: return isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-500/20 text-gray-600'
    }
  }

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el proyecto "${project.name}"?`)) {
      deleteProject(project.id)
    }
  }

  return (
    <>
      <Card className={`backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
        isDark 
          ? 'bg-black/40 border-white/10 hover:border-purple-500/30' 
          : 'bg-white/80 border-gray-200 hover:border-blue-300'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                isDark ? 'bg-purple-500/20' : 'bg-blue-500/20'
              }`}>
                <Layers className={`h-5 w-5 ${
                  isDark ? 'text-purple-400' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <CardTitle className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.name}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`${getStatusColor(project.status)} border-0 text-xs`}>
                    {project.status}
                  </Badge>
                  <Badge className={`${getPriorityColor(project.priority)} border-0 text-xs`}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  Editar Proyecto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSelect(project)}>
                  Ver Detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  Eliminar Proyecto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4" onClick={() => onSelect(project)}>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Progreso General
              </span>
              <span className={`text-sm font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {groups.length}
              </div>
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Grupos
              </div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.totalSubProjects || 0}
              </div>
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Sub-proyectos
              </div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.completedSubProjects || 0}
              </div>
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Completados
              </div>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={`text-xs ${
                    isDark 
                      ? 'border-white/20 text-gray-300' 
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    isDark 
                      ? 'border-white/20 text-gray-400' 
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Due Date */}
          {project.dueDate && (
            <div className="flex items-center space-x-2">
              <Calendar className={`h-4 w-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Vence: {new Date(project.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Action Button */}
          <Button 
            className={`w-full mt-4 ${
              isDark 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(project)
            }}
          >
            Ver Proyecto Completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <EditMainProjectDialog
        project={project}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  )
}
