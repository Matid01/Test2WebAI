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

interface CreateSubProjectDialogProps {
  projectId: string
  groupId: string
  trigger: React.ReactNode
}

export function CreateSubProjectDialog({ projectId, groupId, trigger }: CreateSubProjectDialogProps) {
  const { isDark } = useTheme()
  const { addSubProject } = useProjects()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      addSubProject(projectId, groupId, {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        progress: formData.progress,
        assignee: formData.assignee || undefined,
        dueDate: formData.dueDate || undefined,
        tags: tagsArray
      })

      // Reset form
      setFormData({
        name: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        progress: 0,
        assignee: '',
        dueDate: '',
        tags: ''
      })

      setOpen(false)
    } catch (error) {
      console.error('Error creating sub-project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[500px] ${
        isDark ? 'bg-black border-white/10' : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={isDark ? 'text-white' : 'text-gray-900'}>
            Crear Nuevo Sub-proyecto
          </DialogTitle>
          <DialogDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Agrega un nuevo sub-proyecto a este grupo.
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
              placeholder="Ej: JWT Token Service"
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
              placeholder="Describe las tareas y objetivos..."
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
                placeholder="Nombre del responsable"
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
              placeholder="jwt, tokens, security"
              className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className={isDark ? 'border-white/20 text-gray-300 hover:bg-white/10' : ''}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name || !formData.description}
              className={isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}
            >
              {loading ? 'Creando...' : 'Crear Sub-proyecto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
