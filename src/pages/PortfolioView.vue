<template>
  <div class="bg-white dark:bg-gray-900 transition-colors duration-200">
    <!-- Hero Section -->
    <section class="bg-gray-50 dark:bg-gray-800 py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          作品集
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          一些做过的项目
        </p>
      </div>
    </section>

    <!-- Filter and Stats -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card
            v-for="stat in stats"
            :key="stat.label"
            variant="shadow"
            padding="md"
            class="text-center bg-white dark:bg-gray-700"
          >
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ stat.value }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">{{ stat.label }}</div>
          </Card>
        </div>

        <!-- Technology Filter -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">按技术筛选</h3>
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedTech = null"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                selectedTech === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
              ]"
            >
              全部
            </button>
            <button
              v-for="tech in projectsStore.technologies"
              :key="tech"
              @click="selectedTech = tech"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                selectedTech === tech
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
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
          <h2 class="text-3xl font-bold text-gray-900 mb-4">主要项目</h2>
          <p class="text-xl text-gray-600">最近在做的一些东西</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card
            v-for="project in featuredProjects"
            :key="project.id"
            variant="shadow"
            padding="none"
            hover
            class="overflow-hidden group"
          >
            <div class="relative aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                  <a
                    v-if="project.demoUrl"
                    :href="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
                  >
                    <ExternalLink class="w-4 h-4 mr-2" />
                    演示
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
                  >
                    <Github class="w-4 h-4 mr-2" />
                    代码
                  </a>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-900">{{ project.title }}</h3>
                <span v-if="project.featured" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Star class="w-3 h-3 mr-1" />
                  精选
                </span>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ formatDate(project.createdAt) }}</span>
                <div class="flex space-x-4">
                  <a
                    v-if="project.demoUrl"
                    :href="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
                  >
                    <ExternalLink class="w-4 h-4 mr-1" />
                    演示
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-600 hover:text-gray-800 transition-colors inline-flex items-center"
                  >
                    <Github class="w-4 h-4 mr-1" />
                    代码
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <!-- All Projects -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">所有项目</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            {{ filteredProjects.length }} 个项目
            <span v-if="selectedTech">使用 {{ selectedTech }}</span>
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="project in filteredProjects"
            :key="project.id"
            variant="shadow"
            padding="none"
            hover
            class="overflow-hidden bg-white dark:bg-gray-700 group"
          >
            <div class="relative aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-if="project.featured" class="absolute top-3 right-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Star class="w-3 h-3 mr-1" />
                  精选
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{{ project.description }}</p>
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tech in project.technologies.slice(0, 3)"
                  :key="tech"
                  class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                >
                  {{ tech }}
                </span>
                <span
                  v-if="project.technologies.length > 3"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded"
                >
                  +{{ project.technologies.length - 3 }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">{{ formatDate(project.createdAt) }}</span>
                <div class="flex space-x-2">
                  <a
                    v-if="project.demoUrl"
                    :href="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                    title="查看演示"
                  >
                    <ExternalLink class="w-4 h-4" />
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-600 hover:text-gray-800 transition-colors"
                    title="查看代码"
                  >
                    <Github class="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
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