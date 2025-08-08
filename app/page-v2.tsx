"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Activity, Brain, Code, Database, Zap, TrendingUp, Users, Clock, CheckCircle, AlertCircle, PlayCircle, RefreshCw, Filter, BarChart3, Download, Calendar, AlertTriangle, Layers } from 'lucide-react'
import { GlowButton } from '@/components/ui/glow-button'
import { FloatingActionMenu } from '@/components/floating-action-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from '@/hooks/use-theme'
import { fetchCSVData, normalizeProjectData, groupProjectsByCategory, type CSVProjectData, type ProjectGroup } from '@/utils/csv-data-fetcher-v2'
import { CSVDataTable } from '@/components/csv-data-table'
import { ProjectGroupCardV2 } from '@/components/project-group-card-v2'

interface ProjectData {
  [key: string]: any
}

export default function AIProjectDashboardV2() {
  const { isDark, toggleTheme } = useTheme()
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [projectGroups, setProjectGroups] = useState<ProjectGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    planned: 0,
    avgProgress: 0
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      console.log('Fetching CSV data...')
      
      // Fetch real CSV data
      const rawData = await fetchCSVData()
      const normalizedData = normalizeProjectData(rawData)
      
      console.log('Normalized data:', normalizedData)
      console.log('Total projects after normalization:', normalizedData.length)
      
      setProjects(normalizedData)
      
      // Group projects by category
      const groups = groupProjectsByCategory(normalizedData)
      setProjectGroups(groups)
      
      console.log('Project groups:', groups)
      console.log('Projects per group:', groups.map(g => ({ name: g.name, count: g.projects.length })))
      
      // Calculate comprehensive stats based on EXACTLY the normalized data
      const totalProjects = normalizedData.length // Should be exactly 11

      const completed = normalizedData.filter(p => 
        p.estado.toLowerCase().includes('completado') || 
        p.estado.toLowerCase().includes('terminado') ||
        p.estado.toLowerCase().includes('finalizado') ||
        p.progreso >= 100
      ).length
      
      const inProgress = normalizedData.filter(p => 
        p.estado.toLowerCase().includes('desarrollo') || 
        p.estado.toLowerCase().includes('progreso') ||
        p.estado.toLowerCase().includes('proceso') ||
        (p.progreso > 0 && p.progreso < 100)
      ).length
      
      const planned = normalizedData.filter(p => 
        p.estado.toLowerCase().includes('planificación') || 
        p.estado.toLowerCase().includes('planificacion') ||
        p.estado.toLowerCase().includes('pendiente') ||
        p.estado.toLowerCase().includes('planeado') ||
        p.estado.toLowerCase().includes('definición') ||
        p.progreso === 0
      ).length

      const avgProgress = totalProjects > 0 
        ? Math.round(normalizedData.reduce((acc, p) => acc + p.progreso, 0) / totalProjects)
        : 0
      
      setStats({
        total: totalProjects, // This MUST be 11
        completed,
        inProgress,
        planned,
        avgProgress
      })
      
      console.log('Final stats:', {
        total: totalProjects,
        completed,
        inProgress,
        planned,
        avgProgress
      })
      
      setLastUpdated(new Date())
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
            Organizando 11 proyectos en 3 grupos...
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
                  Monitoreo en tiempo real del proyecto
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  11 proyectos organizados en 3 grupos • Última actualización: {lastUpdated.toLocaleString()}
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                    Total Proyectos
                  </p>
                  <p className={`text-3xl font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    11
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Proyectos únicos
                  </p>
                </div>
                <div className={`p-3 rounded-lg transition-colors duration-300 ${
                  isDark ? 'bg-purple-500/20' : 'bg-blue-500/20'
                }`}>
                  <Code className={`h-6 w-6 transition-colors duration-300 ${
                    isDark ? 'text-purple-400' : 'text-blue-600'
                  }`} />
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
                    {stats.completed}
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
              ? 'bg-black/40 border-blue-500/20' 
              : 'bg-white/80 border-blue-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">En Desarrollo</p>
                  <p className={`text-3xl font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stats.inProgress}
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`backdrop-blur-sm transition-colors duration-300 ${
            isDark 
              ? 'bg-black/40 border-yellow-500/20' 
              : 'bg-white/80 border-yellow-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Planificación</p>
                  <p className={`text-3xl font-bold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stats.planned}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-400" />
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
          <GlowButton 
            variant="primary" 
            className="flex items-center gap-2"
            onClick={fetchData}
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar Datos
          </GlowButton>
          <GlowButton variant="accent" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Ver Analytics
          </GlowButton>
          <GlowButton variant="secondary" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Vista por Grupos
          </GlowButton>
          <GlowButton variant="ghost" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </GlowButton>
        </div>

        {/* Project Groups Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Layers className={`h-6 w-6 ${isDark ? 'text-purple-400' : 'text-blue-600'}`} />
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Grupos de Proyectos
            </h2>
            <Badge className={`${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-600'} border-0`}>
              11 proyectos total
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projectGroups.map((group, index) => (
              <ProjectGroupCardV2 key={group.id} group={group} />
            ))}
          </div>
        </div>

        {/* Progress Summary */}
        <Card className={`mb-8 backdrop-blur-sm transition-colors duration-300 ${
          isDark 
            ? 'bg-black/40 border-white/10' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <TrendingUp className={`h-5 w-5 transition-colors duration-300 ${
                isDark ? 'text-purple-400' : 'text-blue-600'
              }`} />
              <span>Resumen de Progreso por Grupos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projectGroups.map((group, index) => {
                const avgProgress = group.projects.length > 0 
                  ? Math.round(group.projects.reduce((acc, p) => acc + p.progreso, 0) / group.projects.length)
                  : 0
                
                return (
                  <div key={group.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {group.name} ({group.projects.length} proyectos)
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

        {/* Enhanced CSV Data Table */}
        <CSVDataTable data={projects} />
      </div>
      <FloatingActionMenu />
    </div>
  )
}
