<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="py-12 lg:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="text-center lg:text-left animate-fade-in-left">
            <h1 class="text-3xl lg:text-5xl font-medium text-gray-900 dark:text-white mb-4">
              {{ personalStore.fullName }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {{ personalStore.info.title }}
            </p>
            <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-xl">
              {{ personalStore.info.bio }}
            </p>
            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                v-for="link in personalStore.info.socialLinks"
                :key="link.platform"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 hover:scale-105 transition-all duration-200 ease-out"
              >
                <Github v-if="link.icon === 'github'" class="w-4 h-4 mr-2" />
                <ExternalLink v-else-if="link.icon === 'globe'" class="w-4 h-4 mr-2" />
                {{ link.platform }}
              </a>
            </div>
          </div>
          
          <div class="flex justify-center lg:justify-end animate-fade-in-right">
            <div class="w-64 h-64 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-out">
              <img
                :src="personalStore.avatar"
                :alt="personalStore.fullName"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section id="portfolio" class="py-12 border-t border-gray-100 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8 animate-fade-in-up">
          <h2 class="text-2xl font-medium text-gray-900 dark:text-white mb-3">
            项目
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            一些做过的东西
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out project-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-out"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 text-sm">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  演示
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  代码
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8">
          <a
            href="/portfolio"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
          >
            查看所有项目 →
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Sites Section -->
    <section class="py-12 border-t border-gray-100 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 animate-fade-in-up">
          <h2 class="text-2xl font-medium text-gray-900 dark:text-white mb-3">
            网站
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            一些在线的东西
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            v-for="(site, index) in featuredSites"
            :key="site.id"
            class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out site-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              <img
                :src="site.image"
                :alt="site.title"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-out"
              />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{{ site.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ site.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in site.technologies"
                  :key="tech"
                  class="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 text-sm">
                <a
                  :href="site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  访问
                </a>
                <a
                  v-if="site.githubUrl"
                  :href="site.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  代码
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8">
          <a
            href="/sites"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
          >
            查看所有网站 →
          </a>
        </div>
      </div>
    </section>

    <!-- Ten Year Promise Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 animate-fade-in-up">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            十年之约
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            从2024年9月6日开始，记录这段时光
          </p>
        </div>
        
        <TenYearPromise />
      </div>
    </section>


  </div>
</template>

<style scoped>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.project-card {
  animation: fadeInUp 0.6s ease-out both;
}

.site-card {
  animation: fadeInUp 0.6s ease-out both;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { Eye, Mail, Code, ArrowRight, ExternalLink, Github, Phone } from 'lucide-vue-next'
import { usePersonalStore } from '@/stores/personal'
import { useProjectsStore } from '@/stores/projects'
import { useSitesStore } from '@/stores/sites'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import TenYearPromise from '@/components/ui/TenYearPromise.vue'


const personalStore = usePersonalStore()
const projectsStore = useProjectsStore()
const sitesStore = useSitesStore()
const featuredProjects = computed(() => projectsStore.featuredProjects)
const featuredSites = computed(() => sitesStore.featuredSites)

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}


</script>