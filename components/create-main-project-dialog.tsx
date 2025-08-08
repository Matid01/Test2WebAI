"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProjects } from '@/hooks/use-projects'
import { useTheme } from '@/hooks/use-theme'
import type { MainProject } from '@/utils/main-projects-data'

interface CreateMainProjectDialogProps {
  trigger: React.ReactNode
}

export function CreateMainProjectDialog({ trigger }: CreateMainProjectDialogProps) {
  const { isDark } = useTheme()
  const { createProject } = useProjects()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as MainProject['status'],
    priority: 'medium' as MainProject['priority'],
    progress: 0,
    totalSubProjects: 0,
    completedSubProjects: 0,
    dueDate: '',
    tags: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const projectData: Omit<MainProject, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      progress: formData.progress,
      totalSubProjects: formData.totalSubProjects,
      completedSubProjects: formData.completedSubProjects,
      groups: [],
      dueDate: formData.dueDate || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }

    createProject(projectData)
    setOpen(false)
    setFormData({
      name: '',
      description: '',
      status: 'active',
      priority: 'medium',
      progress: 0,
      totalSubProjects: 0,
      completedSubProjects: 0,
      dueDate: '',
      tags: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={isDark ? 'text-white' : 'text-gray-900'}>
            Crear Nuevo Proyecto Principal
          </DialogTitle>
          <DialogDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Crea un nuevo proyecto principal para organizar tus sub-proyectos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Nombre del Proyecto
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Sistema de Autenticación"
                required
                className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Descripción
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el objetivo y alcance del proyecto..."
                required
                className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Estado
                </Label>
                <Select value={formData.status} onValueChange={(value: MainProject['status']) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="on-hold">En Pausa</SelectItem>
                    <SelectItem value="archived">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Prioridad
                </Label>
                <Select value={formData.priority} onValueChange={(value: MainProject['priority']) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Fecha de Vencimiento (Opcional)
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Etiquetas (separadas por comas)
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="auth, security, backend"
                className={isDark ? 'bg-gray-800 border-gray-600 text-white' : ''}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className={
              isDark 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }>
              Crear Proyecto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
