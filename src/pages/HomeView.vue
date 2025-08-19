<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
    <!-- Hero Banner Section -->
    <section class="py-16 lg:py-24 relative overflow-hidden">
      <!-- Background blur effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/40 to-indigo-100/60 dark:from-gray-900/80 dark:via-blue-900/60 dark:to-purple-900/80 backdrop-blur-3xl"></div>
      <div class="absolute inset-0">
        <div class="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="animate-fade-in-up">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-lg">
            {{ personalStore.fullName }}
          </h1>
          <p class="text-xl lg:text-2xl text-blue-600 dark:text-blue-300 mb-6 font-medium drop-shadow-md">
            {{ personalStore.info.title }}
          </p>
          <p class="text-lg text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {{ personalStore.info.bio }}
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a
              v-for="link in personalStore.info.socialLinks"
              :key="link.platform"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 text-gray-900 dark:text-white bg-white/20 dark:bg-white/10 backdrop-blur-md border border-gray-300/30 dark:border-white/20 rounded-lg hover:bg-white/30 dark:hover:bg-white/20 hover:border-gray-400/40 dark:hover:border-white/30 transition-all duration-300 shadow-lg"
            >
              <Github v-if="link.icon === 'github'" class="w-5 h-5 mr-2" />
              <ExternalLink v-else-if="link.icon === 'globe'" class="w-5 h-5 mr-2" />
              {{ link.platform }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section id="portfolio" class="py-12 relative">
      <div class="absolute inset-0 bg-white/30 dark:bg-black/20 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8 animate-fade-in-up text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg">
            我的项目
          </h2>
          <p class="text-gray-700 dark:text-gray-200 drop-shadow-sm">
            乱七八糟的东西
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            :ref="el => projectCardRefs[index] = el as HTMLElement"
            @mousemove="(event) => handleProjectCardMouseMove(event, index)"
            @mouseleave="() => handleProjectCardMouseLeave(index)"
            class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-2xl overflow-hidden hover:bg-white/70 dark:hover:bg-white/15 hover:border-gray-400/50 dark:hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl project-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- 鼠标跟随效果 -->
            <div 
              v-if="projectCardEffects[index]?.show"
              class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0 animate-pulse"
              :style="{
                left: projectCardEffects[index]?.x - 80 + 'px',
                   top: projectCardEffects[index]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 30%, rgba(59, 130, 246, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(59, 130, 246, 0.5), 0 0 160px rgba(59, 130, 246, 0.3)'
              }"
            ></div>
            <div class="relative z-10 aspect-video bg-gray-100/50 dark:bg-black/20 flex items-center justify-center overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="relative z-10 p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 drop-shadow-md">{{ project.title }}</h3>
              <p class="text-gray-700 dark:text-gray-200 mb-4 text-sm leading-relaxed">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 text-xs text-gray-800 dark:text-white bg-gray-200/60 dark:bg-white/20 backdrop-blur-sm rounded-full border border-gray-300/40 dark:border-white/30"
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
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  过一步了解 >
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  代码
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <a
            href="/portfolio"
            class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 text-sm transition-colors duration-200 inline-block font-medium"
          >
            查看所有项目 →
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Sites Section -->
    <section class="py-12 relative">
      <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 animate-fade-in-up text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg">
            网站
          </h2>
          <p class="text-gray-700 dark:text-gray-200 drop-shadow-sm">
            一些在线的东西
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            v-for="(site, index) in featuredSites"
            :key="site.id"
            :ref="el => siteCardRefs[index] = el as HTMLElement"
            @mousemove="(event) => handleSiteCardMouseMove(event, index)"
            @mouseleave="() => handleSiteCardMouseLeave(index)"
            class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-2xl overflow-hidden hover:bg-white/70 dark:hover:bg-white/15 hover:border-gray-400/50 dark:hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl site-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- 鼠标跟随效果 -->
            <div 
              v-if="siteCardEffects[index]?.show"
              class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0 animate-pulse"
              :style="{
                left: siteCardEffects[index]?.x - 80 + 'px',
                top: siteCardEffects[index]?.y - 80 + 'px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, rgba(34, 197, 94, 0.3) 30%, rgba(34, 197, 94, 0.15) 60%, transparent 90%)',
                boxShadow: '0 0 80px rgba(34, 197, 94, 0.5), 0 0 160px rgba(34, 197, 94, 0.3)'
              }"
            ></div>
            <div class="aspect-video bg-gray-100/50 dark:bg-black/20 flex items-center justify-center overflow-hidden">
              <img
                :src="site.image"
                :alt="site.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 drop-shadow-md">{{ site.title }}</h3>
              <p class="text-gray-700 dark:text-gray-200 mb-4 text-sm leading-relaxed">{{ site.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in site.technologies"
                  :key="tech"
                  class="px-3 py-1 text-xs text-gray-800 dark:text-white bg-gray-200/60 dark:bg-white/20 backdrop-blur-sm rounded-full border border-gray-300/40 dark:border-white/30"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 text-sm">
                <a
                  :href="site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  过一步了解 >
                </a>
                <a
                  v-if="site.githubUrl"
                  :href="site.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  代码
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <a
            href="/sites"
            class="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 text-sm transition-colors duration-200 inline-block font-medium"
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
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.project-card {
  animation: fadeInUp 0.6s ease-out both;
}

.site-card {
  animation: fadeInUp 0.6s ease-out both;
}
</style>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { Eye, Mail, Code, ArrowRight, ExternalLink, Github, Phone } from 'lucide-vue-next'
import { usePersonalStore } from '@/stores/personal'
import { useProjectsStore } from '@/stores/projects'
import { useSitesStore } from '@/stores/sites'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import TenYearPromise from '@/components/ui/TenYearPromise.vue'

const siteCardRefs = ref<HTMLElement[]>([])
const siteCardEffects = reactive<Record<number, { x: number; y: number; show: boolean }>>({})
const projectCardRefs = ref<HTMLElement[]>([])
const projectCardEffects = reactive<Record<number, { x: number; y: number; show: boolean }>>({})

const handleSiteCardMouseMove = (event: MouseEvent, index: number) => {
  const card = siteCardRefs.value[index]
  if (!card) return
  
  const rect = card.getBoundingClientRect()
  siteCardEffects[index] = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    show: true
  }
}

const handleSiteCardMouseLeave = (index: number) => {
  if (siteCardEffects[index]) {
    siteCardEffects[index].show = false
  }
}

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