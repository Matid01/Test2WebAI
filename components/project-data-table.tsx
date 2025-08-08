"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { GlowButton } from '@/components/ui/glow-button'
import { useTheme } from '@/hooks/use-theme'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronDown, ChevronUp, Search, Eye, Calendar, User, AlertTriangle } from 'lucide-react'
import type { ProjectData } from '@/utils/project-data'

interface ProjectDataTableProps {
  data: ProjectData[]
}

export function ProjectDataTable({ data }: ProjectDataTableProps) {
  const { isDark } = useTheme()
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (estado: string) => {
    const estadoLower = estado.toLowerCase()
    if (estadoLower.includes('completado') || estadoLower.includes('terminado') || estadoLower.includes('finalizado')) {
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    } else if (estadoLower.includes('desarrollo') || estadoLower.includes('progreso') || estadoLower.includes('proceso')) {
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    } else if (estadoLower.includes('planificación') || estadoLower.includes('planificacion') || estadoLower.includes('pendiente')) {
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    } else if (estadoLower.includes('pausado') || estadoLower.includes('detenido')) {
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    } else if (estadoLower.includes('cancelado') || estadoLower.includes('rechazado')) {
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    }
    return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  const getPriorityColor = (prioridad: string) => {
    const prioridadLower = prioridad.toLowerCase()
    if (prioridadLower.includes('alta') || prioridadLower.includes('high') || prioridadLower.includes('crítica')) {
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    } else if (prioridadLower.includes('media') || prioridadLower.includes('medium') || prioridadLower.includes('normal')) {
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    } else if (prioridadLower.includes('baja') || prioridadLower.includes('low')) {
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    }
    return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  const getProgressColor = (progreso: number) => {
    if (progreso >= 100) return 'text-green-500'
    if (progreso >= 75) return 'text-blue-500'
    if (progreso >= 50) return 'text-yellow-500'
    if (progreso >= 25) return 'text-orange-500'
    return 'text-red-500'
  }

  const filteredAndSortedData = data
    .filter(item => {
      const matchesStatus = filterStatus === 'all' || item.estado.toLowerCase().includes(filterStatus.toLowerCase())
      const matchesSearch = searchTerm === '' || 
        item.proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.responsable.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tecnologia.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })
    .sort((a, b) => {
      if (!sortField) return 0
      
      let aVal = a[sortField as keyof ProjectData]
      let bVal = b[sortField as keyof ProjectData]
      
      if (sortField === 'progreso') {
        aVal = Number(aVal) || 0
        bVal = Number(bVal) || 0
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

  return (
    <Card className={`backdrop-blur-sm transition-colors duration-300 ${
      isDark 
        ? 'bg-black/40 border-white/10' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className={`transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Datos Detallados del Proyecto Agentes IA
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-md border text-sm transition-colors duration-300 ${
                  isDark 
                    ? 'bg-black/60 border-white/20 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 rounded-md border text-sm transition-colors duration-300 ${
                isDark 
                  ? 'bg-black/60 border-white/20 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">Todos los Estados</option>
              <option value="completado">Completados</option>
              <option value="desarrollo">En Desarrollo</option>
              <option value="planificación">Planificación</option>
              <option value="definición">En Definición</option>
            </select>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total</div>
            <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {filteredAndSortedData.length}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
            <div className="text-sm text-green-600">Completados</div>
            <div className="text-xl font-bold text-green-600">
              {filteredAndSortedData.filter(item => item.progreso >= 100).length}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
            <div className="text-sm text-blue-600">En Progreso</div>
            <div className="text-xl font-bold text-blue-600">
              {filteredAndSortedData.filter(item => item.progreso > 0 && item.progreso < 100).length}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
            <div className="text-sm text-yellow-600">Promedio</div>
            <div className="text-xl font-bold text-yellow-600">
              {Math.round(filteredAndSortedData.reduce((acc, item) => acc + item.progreso, 0) / filteredAndSortedData.length || 0)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className={isDark ? 'border-white/10' : 'border-gray-200'}>
                <TableHead 
                  className={`cursor-pointer hover:bg-purple-500/10 transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  onClick={() => handleSort('proyecto')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Proyecto</span>
                    {sortField === 'proyecto' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className={`cursor-pointer hover:bg-purple-500/10 transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  onClick={() => handleSort('estado')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Estado</span>
                    {sortField === 'estado' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className={`cursor-pointer hover:bg-purple-500/10 transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  onClick={() => handleSort('progreso')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Progreso</span>
                    {sortField === 'progreso' && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Responsable</span>
                  </div>
                </TableHead>
                <TableHead className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Prioridad</span>
                  </div>
                </TableHead>
                <TableHead className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Fechas</span>
                  </div>
                </TableHead>
                <TableHead className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((item, index) => (
                <TableRow 
                  key={index}
                  className={`transition-colors duration-200 ${
                    isDark 
                      ? 'border-white/10 hover:bg-white/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <TableCell className="max-w-xs">
                    <div>
                      <div className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.proyecto}
                      </div>
                      {item.observaciones && (
                        <div className={`text-xs mt-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.observaciones.substring(0, 50)}...
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(item.estado)} border text-xs`}>
                      {item.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={item.progreso} className="w-16 h-2" />
                      <span className={`text-sm font-medium ${getProgressColor(item.progreso)}`}>
                        {item.progreso}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {item.responsable.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm">{item.responsable}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(item.prioridad)} border text-xs`}>
                      {item.prioridad}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.fechaInicio && (
                      <div>Inicio: {item.fechaInicio}</div>
                    )}
                    {item.fechaFin && (
                      <div>Fin: {item.fechaFin}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <GlowButton variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-3 w-3" />
                    </GlowButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredAndSortedData.length === 0 && (
          <div className={`text-center py-8 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No se encontraron proyectos que coincidan con los filtros aplicados.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
