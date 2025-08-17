import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import sitesData from '@/data/sites.json'

export interface Site {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  url: string
  githubUrl?: string
  featured: boolean
  createdAt: string
}

export const useSitesStore = defineStore('sites', () => {
  const sites = ref<Site[]>(sitesData)

  const featuredSites = computed(() => 
    sites.value.filter(site => site.featured)
  )

  const allSites = computed(() => sites.value)

  return {
    sites,
    featuredSites,
    allSites
  }
})