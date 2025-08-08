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

interface CreateGroupDialogProps {
  projectId: string
  trigger: React.ReactNode
}

const groupColors = [
  { value: 'blue', label: 'Azul', class: 'bg-blue-500' },
  { value: 'green', label: 'Verde', class: 'bg-green-500' },
  { value: 'red', label: 'Rojo', class: 'bg-red-500' },
  { value: 'purple', label: 'Morado', class: 'bg-purple-500' },
  { value: 'cyan', label: 'Cian', class: 'bg-cyan-500' },
  { value: 'orange', label: 'Naranja', class: 'bg-orange-500' },
  { value: 'indigo', label: 'Índigo', class: 'bg-indigo-500' },
  { value: 'teal', label: 'Verde azulado', class: 'bg-teal-500' },
  { value: 'pink', label: 'Rosa', class: 'bg-pink-500' },
  { value: 'yellow', label: 'Amarillo', class: 'bg-yellow-500' },
  { value: 'lime', label: 'Lima', class: 'bg-lime-500' },
]

export function CreateGroupDialog({ projectId, trigger }: CreateGroupDialogProps) {
  const { isDark } = useTheme()
  const { addGroup } = useProjects()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'blue'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      addGroup(projectId, {
        name: formData.name,
        description: formData.description,
        color: formData.color,
        subProjects: []
      })

      // Reset form
      setFormData({
        name: '',
        description: '',
        color: 'blue'
      })

      setOpen(false)
    } catch (error) {
      console.error('Error creating group:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${
        isDark ? 'bg-black border-white/10' : 'bg-white border-gray-200'
      }`}>
        <DialogHeader>
          <DialogTitle className={isDark ? 'text-white' : 'text-gray-900'}>
            Crear Nuevo Grupo
          </DialogTitle>
          <DialogDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Crea un nuevo grupo para organizar sub-proyectos relacionados.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Nombre del Grupo
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Backend Authentication"
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
              placeholder="Describe el propósito de este grupo..."
              required
              className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Color del Grupo
            </Label>
            <Select
              value={formData.color}
              onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
            >
              <SelectTrigger className={isDark ? 'bg-black/50 border-white/20 text-white' : ''}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {groupColors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${color.class}`} />
                      <span>{color.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {loading ? 'Creando...' : 'Crear Grupo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
