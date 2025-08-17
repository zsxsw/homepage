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

    <!-- All Projects -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-6">所有项目</h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ projectsStore.allProjects.length }} 个项目
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in projectsStore.allProjects"
            :key="project.id"
            class="border border-gray-200 dark:border-gray-700 rounded p-6"
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
        

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()

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