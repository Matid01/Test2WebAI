"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Plus, MoreVertical, Calendar, User, Tag, Clock, CheckCircle, AlertCircle, Pause, Play } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'
import { useProjects } from '@/hooks/use-projects'
import { CreateSubProjectDialog } from '@/components/create-sub-project-dialog'
import { EditSubProjectDialog } from '@/components/edit-sub-project-dialog'
import { getStatusColor, getPriorityColor, type ProjectGroup, type SubProject } from '@/utils/main-projects-data'

interface ProjectGroupCardProps {
  projectId: string
  group: ProjectGroup
}

export function ProjectGroupCard({ projectId, group }: ProjectGroupCardProps) {
  const { isDark } = useTheme()
  const { deleteGroup, deleteSubProject } = useProjects()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingSubProject, setEditingSubProject] = useState<SubProject | null>(null)

  const subProjects = group.subProjects || []
  const completedCount = subProjects.filter(sub => sub.status === 'completed').length
  const totalCount = subProjects.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const averageProgress = totalCount > 0 
    ? Math.round(subProjects.reduce((acc, sub) => acc + (sub.progress || 0), 0) / totalCount)
    : 0

  const getGroupColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: isDark ? 'border-blue-500/30 bg-blue-500/5' : 'border-blue-300 bg-blue-50',
      green: isDark ? 'border-green-500/30 bg-green-500/5' : 'border-green-300 bg-green-50',
      red: isDark ? 'border-red-500/30 bg-red-500/5' : 'border-red-300 bg-red-50',
      purple: isDark ? 'border-purple-500/30 bg-purple-500/5' : 'border-purple-300 bg-purple-50',
      cyan: isDark ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-cyan-300 bg-cyan-50',
      orange: isDark ? 'border-orange-500/30 bg-orange-500/5' : 'border-orange-300 bg-orange-50',
      indigo: isDark ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-indigo-300 bg-indigo-50',
      teal: isDark ? 'border-teal-500/30 bg-teal-500/5' : 'border-teal-300 bg-teal-50',
      pink: isDark ? 'border-pink-500/30 bg-pink-500/5' : 'border-pink-300 bg-pink-50',
      yellow: isDark ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-yellow-300 bg-yellow-50',
      lime: isDark ? 'border-lime-500/30 bg-lime-500/5' : 'border-lime-300 bg-lime-50'
    }
    return colorMap[color] || (isDark ? 'border-gray-500/30 bg-gray-500/5' : 'border-gray-300 bg-gray-50')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />
      case 'on-hold':
        return <Pause className="h-4 w-4 text-orange-500" />
      case 'pending':
      case 'todo':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const handleDeleteGroup = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el grupo "${group.name}"? Esto eliminará también todos sus sub-proyectos.`)) {
      deleteGroup(projectId, group.id)
    }
  }

  const handleDeleteSubProject = (subProjectId: string, subProjectName: string) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el sub-proyecto "${subProjectName}"?`)) {
      deleteSubProject(projectId, group.id, subProjectId)
    }
  }

  return (
    <>
      <Card className={`transition-all duration-300 ${getGroupColorClasses(group.color)} ${
        isDark ? 'border-white/10' : 'border-gray-200'
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full bg-${group.color}-500`}></div>
              <div>
                <CardTitle className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {group.name}
                </CardTitle>
                <p className={`text-sm mt-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {group.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowCreateDialog(true)}>
                    Agregar Sub-proyecto
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDeleteGroup} className="text-red-600">
                    Eliminar Grupo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {totalCount}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Total
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-green-500`}>
                {completedCount}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Completados
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {averageProgress}%
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Progreso
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Progreso del Grupo
              </span>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {progressPercentage}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Add Sub-project Button */}
          <Button
            onClick={() => setShowCreateDialog(true)}
            className={`w-full mt-4 ${
              isDark 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Sub-proyecto
          </Button>
        </CardHeader>

        {/* Expandable Content */}
        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {subProjects.length > 0 ? (
                subProjects.map((subProject) => (
                  <Card 
                    key={subProject.id} 
                    className={`transition-all duration-200 hover:shadow-md ${
                      isDark 
                        ? 'bg-black/20 border-white/10 hover:border-white/20' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(subProject.status)}
                            <h4 className={`font-semibold ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {subProject.name}
                            </h4>
                            <Badge className={`${getStatusColor(subProject.status)} text-xs`}>
                              {subProject.status}
                            </Badge>
                            <Badge className={`${getPriorityColor(subProject.priority)} text-xs`}>
                              {subProject.priority}
                            </Badge>
                          </div>
                          
                          <p className={`text-sm mb-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {subProject.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-3">
                            {subProject.assignee && (
                              <div className="flex items-center space-x-2">
                                <User className={`h-4 w-4 ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <span className={`text-sm ${
                                  isDark ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {subProject.assignee}
                                </span>
                              </div>
                            )}
                            {subProject.dueDate && (
                              <div className="flex items-center space-x-2">
                                <Calendar className={`h-4 w-4 ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <span className={`text-sm ${
                                  isDark ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {new Date(subProject.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          {subProject.tags && subProject.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {subProject.tags.map((tag, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className={`text-xs ${
                                    isDark 
                                      ? 'border-white/20 text-gray-300' 
                                      : 'border-gray-300 text-gray-600'
                                  }`}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Progress */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className={`text-xs ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                Progreso
                              </span>
                              <span className={`text-xs font-medium ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {subProject.progress}%
                              </span>
                            </div>
                            <Progress value={subProject.progress} className="h-1" />
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSubProject(subProject)}
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSubProject(subProject.id, subProject.name)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className={`text-center py-8 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-sm">No hay sub-proyectos en este grupo</p>
                  <p className="text-xs mt-1">Haz clic en "Agregar Sub-proyecto" para comenzar</p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      <CreateSubProjectDialog
        projectId={projectId}
        groupId={group.id}
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

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
