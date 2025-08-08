"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { initialMainProjects, type MainProject, type ProjectGroup, type SubProject } from '@/utils/main-projects-data'

interface ProjectsContextType {
  projects: MainProject[]
  createProject: (project: Omit<MainProject, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, updates: Partial<MainProject>) => void
  deleteProject: (id: string) => void
  createGroup: (projectId: string, group: Omit<ProjectGroup, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGroup: (projectId: string, groupId: string, updates: Partial<ProjectGroup>) => void
  deleteGroup: (projectId: string, groupId: string) => void
  createSubProject: (projectId: string, groupId: string, subProject: Omit<SubProject, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateSubProject: (projectId: string, groupId: string, subProjectId: string, updates: Partial<SubProject>) => void
  deleteSubProject: (projectId: string, groupId: string, subProjectId: string) => void
  getStats: () => {
    totalMainProjects: number
    totalSubProjects: number
    totalCompleted: number
    avgProgress: number
  }
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<MainProject[]>(initialMainProjects)

  const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const createProject = useCallback((projectData: Omit<MainProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: MainProject = {
      ...projectData,
      id: generateId(),
      groups: projectData.groups || [],
      tags: projectData.tags || [],
      totalSubProjects: projectData.totalSubProjects || 0,
      completedSubProjects: projectData.completedSubProjects || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setProjects(prev => [...prev, newProject])
  }, [])

  const updateProject = useCallback((id: string, updates: Partial<MainProject>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ))
  }, [])

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id))
  }, [])

  const createGroup = useCallback((projectId: string, groupData: Omit<ProjectGroup, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGroup: ProjectGroup = {
      ...groupData,
      id: generateId(),
      subProjects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? { 
            ...project, 
            groups: [...(project.groups || []), newGroup],
            updatedAt: new Date().toISOString()
          }
        : project
    ))
  }, [])

  const updateGroup = useCallback((projectId: string, groupId: string, updates: Partial<ProjectGroup>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? {
            ...project,
            groups: (project.groups || []).map(group =>
              group.id === groupId
                ? { ...group, ...updates, updatedAt: new Date().toISOString() }
                : group
            ),
            updatedAt: new Date().toISOString()
          }
        : project
    ))
  }, [])

  const deleteGroup = useCallback((projectId: string, groupId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? {
            ...project,
            groups: (project.groups || []).filter(group => group.id !== groupId),
            updatedAt: new Date().toISOString()
          }
        : project
    ))
  }, [])

  const createSubProject = useCallback((projectId: string, groupId: string, subProjectData: Omit<SubProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSubProject: SubProject = {
      ...subProjectData,
      id: generateId(),
      tags: subProjectData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? {
            ...project,
            groups: (project.groups || []).map(group =>
              group.id === groupId
                ? {
                    ...group,
                    subProjects: [...(group.subProjects || []), newSubProject],
                    updatedAt: new Date().toISOString()
                  }
                : group
            ),
            totalSubProjects: (project.totalSubProjects || 0) + 1,
            updatedAt: new Date().toISOString()
          }
        : project
    ))
  }, [])

  const updateSubProject = useCallback((projectId: string, groupId: string, subProjectId: string, updates: Partial<SubProject>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? {
            ...project,
            groups: (project.groups || []).map(group =>
              group.id === groupId
                ? {
                    ...group,
                    subProjects: (group.subProjects || []).map(subProject =>
                      subProject.id === subProjectId
                        ? { ...subProject, ...updates, updatedAt: new Date().toISOString() }
                        : subProject
                    ),
                    updatedAt: new Date().toISOString()
                  }
                : group
            ),
            updatedAt: new Date().toISOString()
          }
        : project
    ))
  }, [])

  const deleteSubProject = useCallback((projectId: string, groupId: string, subProjectId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? {
            ...project,
            groups: (project.groups || []).map(group =>
              group.id === groupId
                ? {
                    ...group,
                    subProjects: (group.subProjects || []).filter(subProject => subProject.id !== subProjectId),
                    updatedAt: new Date().toISOString()
                  }
                : group
            ),
            totalSubProjects: Math.max(0, (project.totalSubProjects || 0) - 1),
            updatedAt: new Date().toISOString()
          }
        : project
    ))
  }, [])

  const getStats = useCallback(() => {
    const totalMainProjects = projects.length
    const totalSubProjects = projects.reduce((acc, project) => 
      acc + (project.groups || []).reduce((groupAcc, group) => groupAcc + (group.subProjects || []).length, 0), 0
    )
    const totalCompleted = projects.reduce((acc, project) => 
      acc + (project.groups || []).reduce((groupAcc, group) => 
        groupAcc + (group.subProjects || []).filter(sub => sub.status === 'completed').length, 0
      ), 0
    )
    const avgProgress = totalMainProjects > 0 
      ? Math.round(projects.reduce((acc, project) => acc + (project.progress || 0), 0) / totalMainProjects)
      : 0

    return {
      totalMainProjects,
      totalSubProjects,
      totalCompleted,
      avgProgress
    }
  }, [projects])

  return (
    <ProjectsContext.Provider value={{
      projects,
      createProject,
      updateProject,
      deleteProject,
      createGroup,
      updateGroup,
      deleteGroup,
      createSubProject,
      updateSubProject,
      deleteSubProject,
      getStats
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}
