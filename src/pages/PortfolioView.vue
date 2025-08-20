<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-blue-900 relative">
    <!-- Background blur effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="hidden absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
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
          <PortfolioMagicCard
            v-for="project in projectsStore.allProjects"
            :key="project.id"
            :project="project"
            :enable-stars="true"
            :enable-spotlight="true"
            :enable-border-glow="true"
            :enable-tilt="false"
            :enable-magnetism="false"
            :click-effect="true"
            :spotlight-radius="300"
            :particle-count="12"
            glow-color="132, 0, 255"
          />
        </div>
        

      </div>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects'
import PortfolioMagicCard from '@/components/ui/PortfolioMagicCard.vue'

const projectsStore = useProjectsStore()
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