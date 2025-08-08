"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import type { SubProject } from '@/utils/main-projects-data'

interface EditSubProjectDialogProps {
  projectId: string
  groupId: string
  subProject: SubProject
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSubProjectDialog({ 
  projectId, 
  groupId, 
  subProject, 
  open, 
  onOpenChange 
}: EditSubProjectDialogProps) {
  const { isDark } = useTheme()
  const { updateSubProject, deleteSubProject } = useProjects()
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pending' as const,
    priority: 'medium' as const,
    progress: 0,
    assignee: '',
    dueDate: '',
    tags: ''
  })

  useEffect(() => {
    if (subProject) {
      setFormData({
        name: subProject.name,
        description: subProject.description,
        status: subProject.status,
        priority: subProject.priority,
        progress: subProject.progress,
        assignee: subProject.assignee || '',
        dueDate: subProject.dueDate || '',
        tags: subProject.tags.join(', ')
      })
    }
  }, [subProject])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      updateSubProject(projectId, groupId, subProject.id, {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        progress: formData.progress,
        assignee: formData.assignee || undefined,
        dueDate: formData.dueDate || undefined,
        tags: tagsArray
      })

      onOpenChange(false)
    } catch (error) {
      console.error('Error updating sub-project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = () => {
    if (showDeleteConfirm) {
      deleteSubProject(projectId, groupId, subProject.id)
      onOpenChange(false)
      setShowDeleteConfirm(false)
    } else {
      setShowDeleteConfirm(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[500px] ${
        isDark ? 'bg-black border-white/10' : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={isDark ? 'text-white' : 'text-gray-900'}>
            Editar Sub-proyecto
          </DialogTitle>
          <DialogDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Modifica los detalles del sub-proyecto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Nombre del Sub-proyecto
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Descripción
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Estado
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in-progress">En Progreso</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="on-hold">En Pausa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Prioridad
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="progress" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Progreso (%)
              </Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Asignado a
              </Label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Fecha de Vencimiento
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Etiquetas (separadas por comas)
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
            />
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="mr-auto"
            >
              {showDeleteConfirm ? 'Confirmar Eliminación' : 'Eliminar Sub-proyecto'}
            </Button>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className={isDark ? 'border-white/20 text-gray-300 hover:bg-white/10' : ''}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading || !formData.name || !formData.description}
                className={isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
