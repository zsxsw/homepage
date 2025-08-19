<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative">
    <!-- Background blur effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Content overlay -->
    <div class="relative z-10">
    <!-- Hero Section -->
    <section class="py-16 border-b border-gray-200/50 dark:border-gray-700/50 relative">
      <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-medium text-gray-900 dark:text-white mb-3 drop-shadow-lg">
          项目
        </h1>
        <p class="text-gray-700 dark:text-gray-200 drop-shadow-sm">
          一些做过的东西
        </p>
      </div>
    </section>

    <!-- All Projects -->
    <section class="py-16 relative">
      <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-6 drop-shadow-lg">所有项目</h2>
          <p class="text-gray-700 dark:text-gray-200 drop-shadow-sm">
            {{ projectsStore.allProjects.length }} 个项目
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(project, index) in projectsStore.allProjects"
            :key="project.id"
            :ref="el => projectCardRefs[index] = el"
            @mousemove="(event) => handleProjectCardMouseMove(event, index)"
            @mouseleave="() => handleProjectCardMouseLeave(index)"
            class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-2xl p-6 hover:bg-white/70 dark:hover:bg-white/15 hover:border-gray-400/50 dark:hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <!-- 鼠标跟随效果 -->
            <div 
              v-if="projectCardEffects[index]?.show"
              class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0 animate-pulse"
              :style="{
                left: projectCardEffects[index]?.x - 80 + 'px',
                   top: projectCardEffects[index]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, rgba(34, 197, 94, 0.3) 30%, rgba(34, 197, 94, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(34, 197, 94, 0.5), 0 0 160px rgba(34, 197, 94, 0.3)'
              }"
            ></div>
            <div class="relative z-10 mb-3">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-32 object-cover rounded border border-gray-100 dark:border-gray-700"
              />
            </div>
            <h4 class="relative z-10 text-base font-medium text-gray-900 dark:text-white mb-2 drop-shadow-md">{{ project.title }}</h4>
            <p class="relative z-10 text-gray-700 dark:text-gray-200 text-sm mb-3 drop-shadow-sm">{{ project.description }}</p>
            
            <!-- Tech Stack -->
            <div class="relative z-10 flex flex-wrap gap-1 mb-3">
              <span
                v-for="tech in project.technologies.slice(0, 3)"
                :key="tech"
                class="px-2 py-1 text-xs bg-gray-200/60 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 rounded backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
              >
                {{ tech }}
              </span>
              <span
                v-if="project.technologies.length > 3"
                class="px-2 py-1 text-xs bg-gray-200/60 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 rounded backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
              >
                +{{ project.technologies.length - 3 }}
              </span>
            </div>
            
            <!-- Date -->
            <div class="relative z-10 text-xs text-gray-600 dark:text-gray-400 mb-3 drop-shadow-sm">
              {{ formatDate(project.createdAt) }}
            </div>
            
            <!-- Links -->
            <div class="relative z-10 flex gap-3 text-sm">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 font-medium drop-shadow-sm"
              >
                演示
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 font-medium drop-shadow-sm"
              >
                代码
              </a>
            </div>
          </div>
        </div>
        

      </div>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const projectCardRefs = ref<HTMLElement[]>([])
const projectCardEffects = reactive<Record<number, { x: number; y: number; show: boolean }>>({})

const handleProjectCardMouseMove = (event: MouseEvent, index: number) => {
  const card = projectCardRefs.value[index]
  if (!card) return
  
  const rect = card.getBoundingClientRect()
  projectCardEffects[index] = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    show: true
  }
}

const handleProjectCardMouseLeave = (index: number) => {
  if (projectCardEffects[index]) {
    projectCardEffects[index].show = false
  }
}

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