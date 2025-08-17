<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 py-16 border-b border-gray-100 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-medium text-gray-900 dark:text-white mb-3">
          项目
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          一些做过的东西
        </p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Technology Filter -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">筛选</h3>
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedTech = null"
              :class="[
                'px-3 py-1 text-sm border rounded transition-colors',
                selectedTech === null
                  ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
              ]"
            >
              全部
            </button>
            <button
              v-for="tech in projectsStore.technologies"
              :key="tech"
              @click="selectedTech = tech"
              :class="[
                'px-3 py-1 text-sm border rounded transition-colors',
                selectedTech === tech
                  ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
              ]"
            >
              {{ tech }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-xl font-medium text-gray-900 mb-6">主要项目</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="border border-gray-200 dark:border-gray-700 rounded p-6"
          >
            <div class="mb-4">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-48 object-cover rounded border border-gray-100 dark:border-gray-700"
              />
            </div>
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{{ project.title }}</h4>
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">{{ project.description }}</p>
            
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded"
              >
                {{ tech }}
              </span>
            </div>
            
            <!-- Date -->
            <div class="text-xs text-gray-500 dark:text-gray-500 mb-4">
              {{ formatDate(project.createdAt) }}
            </div>
            
            <!-- Links -->
            <div class="flex gap-4 text-sm">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                演示
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                代码
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Projects -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-6">所有项目</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            {{ filteredProjects.length }} 个项目
            <span v-if="selectedTech">使用 {{ selectedTech }}</span>
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="border border-gray-200 dark:border-gray-700 rounded p-4"
          >
            <div class="mb-3">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-32 object-cover rounded border border-gray-100 dark:border-gray-700"
              />
            </div>
            <h4 class="text-base font-medium text-gray-900 dark:text-white mb-2">{{ project.title }}</h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">{{ project.description }}</p>
            
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="tech in project.technologies.slice(0, 3)"
                :key="tech"
                class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded"
              >
                {{ tech }}
              </span>
              <span
                v-if="project.technologies.length > 3"
                class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded"
              >
                +{{ project.technologies.length - 3 }}
              </span>
            </div>
            
            <!-- Date -->
            <div class="text-xs text-gray-500 dark:text-gray-500 mb-3">
              {{ formatDate(project.createdAt) }}
            </div>
            
            <!-- Links -->
            <div class="flex gap-3 text-sm">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                演示
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                代码
              </a>
            </div>
          </div>
        </div>
        
        <div v-if="filteredProjects.length === 0" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <Search class="w-16 h-16 mx-auto" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">没有找到项目</h3>
          <p class="text-gray-600">尝试选择其他技术标签或查看所有项目</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExternalLink, Github, Star, Search } from 'lucide-vue-next'
import { useProjectsStore } from '@/stores/projects'
import Card from '@/components/ui/Card.vue'

const projectsStore = useProjectsStore()
const selectedTech = ref<string | null>(null)

const stats = computed(() => [
  { label: '总项目数', value: projectsStore.totalProjects },
  { label: '精选项目', value: projectsStore.featuredProjects.length },
  { label: '使用技术', value: projectsStore.technologies.length },
  { label: '最新项目', value: new Date().getFullYear() }
])

const featuredProjects = computed(() => projectsStore.featuredProjects)

const filteredProjects = computed(() => {
  if (!selectedTech.value) {
    return projectsStore.allProjects
  }
  return projectsStore.projectsByTechnology[selectedTech.value] || []
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long'
  })
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>