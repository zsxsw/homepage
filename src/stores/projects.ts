import { defineStore } from 'pinia'
import type { Project } from '@/types'
import projectsData from '@/data/projects.json'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: projectsData as Project[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    featuredProjects: (state) => {
      return state.projects.filter(project => project.featured)
    },

    allProjects: (state) => {
      return state.projects.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    },

    projectById: (state) => (id: string) => {
      return state.projects.find(project => project.id === id)
    },

    projectsByTechnology: (state) => (tech: string) => {
      return state.projects.filter(project => 
        project.technologies.includes(tech)
      )
    },

    totalProjects: (state) => state.projects.length,

    technologies: (state) => {
      const allTechs = state.projects.flatMap(project => project.technologies)
      return [...new Set(allTechs)].sort()
    }
  },

  actions: {
    addProject(project: Project) {
      this.projects.unshift(project)
    },

    updateProject(id: string, updates: Partial<Project>) {
      const index = this.projects.findIndex(p => p.id === id)
      if (index !== -1) {
        this.projects[index] = { ...this.projects[index], ...updates }
      }
    },

    deleteProject(id: string) {
      const index = this.projects.findIndex(p => p.id === id)
      if (index !== -1) {
        this.projects.splice(index, 1)
      }
    },

    toggleFeatured(id: string) {
      const project = this.projects.find(p => p.id === id)
      if (project) {
        project.featured = !project.featured
      }
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string | null) {
      this.error = error
    }
  }
})