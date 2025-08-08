"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { GlowButton } from '@/components/ui/glow-button'
import { useTheme } from '@/hooks/use-theme'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { ProjectGroupCardFinal } from '@/components/project-group-card-final'
import type { MainProject } from '@/utils/main-projects-data'

interface ProjectDetailViewProps {
  project: MainProject
  onBack: () => void
}

export function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  const { isDark } = useTheme()

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          border: 'border-emerald-500/20',
          bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
          text: 'text-emerald-600',
          icon: 'text-emerald-500'
        }
      case 'blue':
        return {
          border: 'border-blue-500/20',
          bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
          text: 'text-blue-600',
          icon: 'text-blue-500'
        }
      case 'orange':
        return {
          border: 'border-orange-500/20',
          bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
          text: 'text-orange-600',
          icon: 'text-orange-500'
        }
      case 'purple':
        return {
          border: 'border-purple-500/20',
          bg: isDark ? 'bg-purple-500/10' : 'bg-purple-50',
          text: 'text-purple-600',
          icon: 'text-purple-500'
        }
      default:
        return {
          border: 'border-gray-500/20',
          bg: isDark ? 'bg-gray-500/10' : 'bg-gray-50',
          text: 'text-gray-600',
          icon: 'text-gray-500'
        }
    }
  }

  const colorClasses = getColorClasses(project.color)

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <GlowButton 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Proyectos Principales</span>
        </GlowButton>
      </div>

      {/* Project Overview */}
      <Card className={`backdrop-blur-sm transition-colors duration-300 ${
        isDark 
          ? `bg-black/40 ${colorClasses.border}` 
          : `bg-white/80 ${colorClasses.border}`
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.name}
              </CardTitle>
              <p className={`text-sm mt-2 transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
            </div>
            <Badge className={`${colorClasses.bg} ${colorClasses.text} border-0`}>
              {project.groups.length} grupos • {project.totalSubProjects} sub-proyectos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${colorClasses.text}`}>
                {project.totalSubProjects}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Sub-proyectos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">
                {project.completedSubProjects}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Completados
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">
                {project.totalSubProjects - project.completedSubProjects}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                En Progreso
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${colorClasses.text}`}>
                {project.avgProgress}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Progreso Promedio
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Progreso General del Proyecto
              </span>
              <span className={`font-semibold ${colorClasses.text}`}>
                {project.avgProgress}%
              </span>
            </div>
            <Progress 
              value={project.avgProgress} 
              className={`h-3 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sub-projects Groups */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className={`h-6 w-6 ${colorClasses.icon}`} />
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Sub-proyectos por Grupos
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {project.groups.map((group, index) => (
            <ProjectGroupCardFinal key={group.id} group={group} />
          ))}
        </div>
      </div>

      {/* Progress Summary by Groups */}
      <Card className={`backdrop-blur-sm transition-colors duration-300 ${
        isDark 
          ? 'bg-black/40 border-white/10' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <TrendingUp className={`h-5 w-5 ${colorClasses.icon}`} />
            <span>Resumen de Progreso por Grupos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {project.groups.map((group, index) => {
              const avgProgress = group.projects.length > 0 
                ? Math.round(group.projects.reduce((acc, p) => acc + p.progreso, 0) / group.projects.length)
                : 0
              
              return (
                <div key={group.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {group.name} ({group.projects.length} sub-proyectos)
                    </span>
                    <span className={`font-semibold transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {avgProgress}%
                    </span>
                  </div>
                  <Progress 
                    value={avgProgress} 
                    className={`h-2 transition-colors duration-300 ${
                      isDark ? 'bg-gray-800' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
