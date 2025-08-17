<template>
  <div class="bg-white dark:bg-gray-900 transition-colors duration-200">
    <!-- Hero Section -->
    <section class="relative bg-gray-50 dark:bg-gray-800 py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              嗨，我是
              <span class="text-blue-600 dark:text-blue-400">{{ personalStore.fullName }}</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {{ personalStore.info.title }}
            </p>
            <p class="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl">
              {{ personalStore.info.bio }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                @click="scrollToSection('portfolio')"
                class="inline-flex items-center"
              >
                <Eye class="w-5 h-5 mr-2" />
                查看作品
              </Button>
            </div>
          </div>
          
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <div class="w-80 h-80 rounded-2xl overflow-hidden shadow-lg">
                <img
                  :src="personalStore.avatar"
                  :alt="personalStore.fullName"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Featured Projects Section -->
    <section id="portfolio" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            一些项目
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            平时折腾的一些东西，有些还在完善中
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card
            v-for="project in featuredProjects"
            :key="project.id"
            variant="shadow"
            padding="none"
            hover
            class="overflow-hidden transform hover:rotate-1 transition-transform duration-300"
          >
            <div class="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="(tech, index) in project.technologies"
                  :key="tech"
                  :class="[
                    'px-3 py-1 text-sm rounded-full transition-all duration-200',
                    index % 2 === 0 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                      : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                  ]"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <ExternalLink class="w-4 h-4 mr-1" />
                  演示
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <Github class="w-4 h-4 mr-1" />
                  代码
                </a>
              </div>
            </div>
          </Card>
        </div>
        
        <div class="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            @click="$router.push('/portfolio')"
            class="inline-flex items-center"
          >
            查看所有项目
            <ArrowRight class="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Eye, Mail, Code, ArrowRight, ExternalLink, Github, Phone } from 'lucide-vue-next'
import { usePersonalStore } from '@/stores/personal'
import { useProjectsStore } from '@/stores/projects'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'


const personalStore = usePersonalStore()
const projectsStore = useProjectsStore()
const featuredProjects = computed(() => projectsStore.featuredProjects)

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}


</script>