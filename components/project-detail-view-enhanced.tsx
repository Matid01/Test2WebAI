"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Plus, Calendar, Target, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { ProjectGroupCardEnhanced } from '@/components/project-group-card-enhanced'
import { CreateGroupDialog } from '@/components/create-group-dialog'
import type { MainProject } from '@/utils/main-projects-data'

interface ProjectDetailViewEnhancedProps {
  project: MainProject
  onBack: () => void
}

export function ProjectDetailViewEnhanced({ project, onBack }: ProjectDetailViewEnhancedProps) {
  const { isDark } = useTheme()

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className={`${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Button>
        </div>
        <CreateGroupDialog
          projectId={project.id}
          trigger={
            <Button className={`${
              isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Grupo
            </Button>
          }
        />
      </div>

      {/* Project Overview */}
      <Card className={`backdrop-blur-sm ${
        isDark 
          ? 'bg-black/40 border-white/10' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.name}
              </CardTitle>
              <p className={`mt-2 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Badge className={`${getStatusColor(project.status)} border-0`}>
                  {project.status}
                </Badge>
                <Badge className={`${getPriorityColor(project.priority)} border-0`}>
                  {project.priority}
                </Badge>
                {project.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className={`${
                      isDark 
                        ? 'border-white/20 text-gray-300' 
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Progreso General del Proyecto
              </span>
              <span className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-2">
                <Target className={`h-5 w-5 ${
                  isDark ? 'text-purple-400' : 'text-blue-600'
                }`} />
                <div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.groups.length}
                  </div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Grupos
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.totalSubProjects}
                  </div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Sub-proyectos
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.completedSubProjects}
                  </div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Completados
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-400" />
                <div>
                  <div className={`text-sm font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.dueDate 
                      ? new Date(project.dueDate).toLocaleDateString()
                      : 'Sin fecha'
                    }
                  </div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Vencimiento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Grupos del Proyecto
          </h2>
          <Badge className={`${
            isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-600'
          } border-0`}>
            {project.groups.length} grupos
          </Badge>
        </div>

        {project.groups.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {project.groups.map((group) => (
              <ProjectGroupCardEnhanced
                key={group.id}
                group={group}
                projectId={project.id}
              />
            ))}
          </div>
        ) : (
          <Card className={`backdrop-blur-sm ${
            isDark 
              ? 'bg-black/40 border-white/10' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <CardContent className="p-12 text-center">
              <div className={`text-6xl mb-4 ${
                isDark ? 'text-gray-600' : 'text-gray-300'
              }`}>
                📁
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                No hay grupos creados
              </h3>
              <p className={`text-sm mb-6 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Crea tu primer grupo para organizar los sub-proyectos de este proyecto principal
              </p>
              <CreateGroupDialog
                projectId={project.id}
                trigger={
                  <Button className={`${
                    isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primer Grupo
                  </Button>
                }
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
