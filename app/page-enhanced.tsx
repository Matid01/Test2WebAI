"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Brain, Code, TrendingUp, Users, Clock, CheckCircle, RefreshCw, BarChart3, Download, Layers, Plus } from 'lucide-react'
import { GlowButton } from '@/components/ui/glow-button'
import { FloatingActionMenu } from '@/components/floating-action-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from '@/hooks/use-theme'
import { useProjects } from '@/hooks/use-projects'
import { MainProjectCard } from '@/components/main-project-card'
import { ProjectDetailViewEnhanced } from '@/components/project-detail-view-enhanced'
import { CreateMainProjectDialog } from '@/components/create-main-project-dialog'
import type { MainProject } from '@/utils/main-projects-data'

export default function AIProjectDashboardEnhanced() {
  const { isDark, toggleTheme } = useTheme()
  const { projects, getStats } = useProjects()
  const [selectedProject, setSelectedProject] = useState<MainProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [stats, setStats] = useState({
    totalMainProjects: 0,
    totalSubProjects: 0,
    totalCompleted: 0,
    avgProgress: 0
  })

  const loadData = () => {
    try {
      setLoading(true)
      console.log('Loading projects data...')
      
      // Calculate stats from context
      const calculatedStats = getStats()
      setStats(calculatedStats)
      
      console.log('Projects:', projects)
      console.log('Stats:', calculatedStats)
      
      setLastUpdated(new Date())
      setLoading(false)
    } catch (error) {
      console.error('Error loading data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [projects, getStats])

  const handleProjectSelect = (project: MainProject) => {
    setSelectedProject(project)
  }

  const handleBackToMain = () => {
    setSelectedProject(null)
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-black' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-32 w-32 border-b-2 mx-auto mb-4 ${
            isDark ? 'border-purple-500' : 'border-blue-500'
          }`}></div>
          <p className={`text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Cargando Proyecto Agentes IA...
          </p>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Organizando {stats.totalMainProjects} proyectos principales con {stats.totalSubProjects} sub-proyectos...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      {/* Header */}
      <div className={`border-b backdrop-blur-sm transition-colors duration-300 ${
        isDark 
          ? 'border-white/10 bg-black/20' 
          : 'border-gray-200 bg-white/80'
      }`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${
                isDark ? 'bg-purple-500/20' : 'bg-blue-500/20'
              }`}>
                <Brain className={`h-8 w-8 transition-colors duration-300 ${
                  isDark ? 'text-purple-400' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Proyecto Agentes IA
                </h1>
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-purple-300' : 'text-blue-600'
                }`}>
                  {selectedProject ? `${selectedProject.name}` : 'Monitoreo en tiempo real del proyecto'}
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {selectedProject 
                    ? `${selectedProject.totalSubProjects} sub-proyectos en ${selectedProject.groups.length} grupos`
                    : `${stats.totalMainProjects} proyectos principales • ${stats.totalSubProjects} sub-proyectos total`
                  } • Última actualización: {lastUpdated.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <GlowButton variant="primary" size="sm">
                  Dashboard
                </GlowButton>
                <GlowButton variant="secondary" size="sm">
                  Analytics
                </GlowButton>
                <GlowButton variant="accent" size="sm">
                  Settings
                </GlowButton>
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              
              <div className="flex items-center space-x-2 ml-4">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Sistema Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className={`backdrop-blur-sm transition-colors duration-300 ${
            isDark 
              ? 'bg-black/40 border-purple-500/20' 
              : 'bg-white/80 border-blue-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    isDark ? 'text-purple-300' : 'text-blue-600'
                  }`}>
                    Proyectos Principales
                  </p>
                  <p className={`text-3xl font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stats.totalMainProjects}
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Páginas del sistema
                  </p>
                </div>
                <div className={`p-3 rounded-lg transition-colors duration-300 ${
                  isDark ? 'bg-purple-500/20' : 'bg-blue-500/20'
                }`}>
                  <Layers className={`h-6 w-6 transition-colors duration-300 ${
                    isDark ? 'text-purple-400' : 'text-blue-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`backdrop-blur-sm transition-colors duration-300 ${
            isDark 
              ? 'bg-black/40 border-blue-500/20' 
              : 'bg-white/80 border-blue-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Sub-proyectos</p>
                  <p className={`text-3xl font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stats.totalSubProjects}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Code className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`backdrop-blur-sm transition-colors duration-300 ${
            isDark 
              ? 'bg-black/40 border-green-500/20' 
              : 'bg-white/80 border-green-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Completados</p>
                  <p className={`text-3xl font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stats.totalCompleted}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`backdrop-blur-sm transition-colors duration-300 ${
            isDark 
              ? 'bg-black/40 border-orange-500/20' 
              : 'bg-white/80 border-orange-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Progreso Promedio</p>
                  <p className={`text-3xl font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stats.avgProgress}%
                  </p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <CreateMainProjectDialog 
            trigger={
              <GlowButton variant="primary" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nuevo Proyecto Principal
              </GlowButton>
            }
          />
          <GlowButton 
            variant="secondary" 
            className="flex items-center gap-2"
            onClick={loadData}
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar Datos
          </GlowButton>
          <GlowButton variant="accent" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Ver Analytics
          </GlowButton>
          <GlowButton variant="ghost" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </GlowButton>
        </div>

        {/* Main Content */}
        {selectedProject ? (
          <ProjectDetailViewEnhanced 
            project={selectedProject} 
            onBack={handleBackToMain}
          />
        ) : (
          <div>
            {/* Main Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Layers className={`h-6 w-6 ${isDark ? 'text-purple-400' : 'text-blue-600'}`} />
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Proyectos Principales
                  </h2>
                  <Badge className={`${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-600'} border-0`}>
                    {stats.totalMainProjects} páginas del sistema
                  </Badge>
                </div>
              </div>
              
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <MainProjectCard 
                      key={project.id} 
                      project={project} 
                      onSelect={handleProjectSelect}
                    />
                  ))}
                </div>
              ) : (
                <Card className={`backdrop-blur-sm transition-colors duration-300 ${
                  isDark 
                    ? 'bg-black/40 border-white/10' 
                    : 'bg-white/80 border-gray-200'
                }`}>
                  <CardContent className="p-12 text-center">
                    <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                      🚀
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      No hay proyectos principales
                    </h3>
                    <p className={`text-sm mb-6 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Crea tu primer proyecto principal para comenzar a organizar tus sub-proyectos
                    </p>
                    <CreateMainProjectDialog 
                      trigger={
                        <GlowButton variant="primary" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Crear Primer Proyecto
                        </GlowButton>
                      }
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
      <FloatingActionMenu />
    </div>
  )
}
