<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="py-16 border-b border-gray-100 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-medium text-gray-900 dark:text-white mb-3">
          网站
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          一些做过的网站
        </p>
      </div>
    </section>

    <!-- Sites Grid -->
    <section class="py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="site in sites"
            :key="site.id"
            class="border border-gray-200 dark:border-gray-700 rounded p-6"
          >
            <div class="mb-4">
              <img
                :src="site.image"
                :alt="site.title"
                class="w-full h-48 object-cover rounded border border-gray-100 dark:border-gray-700"
              />
            </div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {{ site.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {{ site.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in site.technologies"
                  :key="tech"
                  class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 text-sm">
                <a
                  :href="site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                >
                  访问
                </a>
                <a
                  v-if="site.githubUrl"
                  :href="site.githubUrl"
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
import { ExternalLink, Github } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const sites = [
  {
    id: 'personal-blog',
    title: '个人博客',
    description: '这是我的个人博客，分享技术、生活和学习心得。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=personal%20blog%20website%20responsive%20design%20multiple%20devices%20clean%20interface&image_size=landscape_16_9',
    technologies: ['Vue3', 'Nuxt', 'Markdown', 'Tailwind CSS'],
    url: 'https://blog.fis.ink',
    githubUrl: 'https://blog.fis.ink/'
  },
  {
    id: 'code-snippets',
    title: '代码片段',
    description: '代码片段分享，天天有一些不一样的玩法！',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=code%20snippets%20sharing%20website%20clean%20interface%20responsive%20design&image_size=landscape_16_9',
    technologies: ['React', 'TypeScript', 'Prism.js', 'Node.js'],
    url: 'https://code.fis.ink',
    githubUrl: 'https://github.com/fishcpy/code-snippets'
  },
  {
    id: 'life-album',
    title: '生活相册',
    description: '记录生活的点滴，满满都是我分享我的世界。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=photo%20gallery%20website%20life%20moments%20responsive%20design%20clean%20layout&image_size=landscape_16_9',
    technologies: ['Vue3', 'Vite', 'Tailwind CSS', 'Cloudinary'],
    url: 'https://photos.fis.ink',
    githubUrl: 'https://github.com/fishcpy/life-album'
  },
  {
    id: 'photography-filters',
    title: '摄影滤镜',
    description: '自动随笔、摄影滤镜，即兴发挥等，记录生活的瞬间，分享人的感悟。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=photography%20filters%20app%20dark%20interface%20image%20editing%20responsive&image_size=landscape_16_9',
    technologies: ['React', 'Canvas API', 'WebGL', 'Express.js'],
    url: 'https://filters.fis.ink',
    githubUrl: 'https://github.com/fishcpy/photo-filters'
  },
  {
    id: 'task-manager',
    title: '任务管理',
    description: '简洁高效的任务管理工具，帮助提升工作效率。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=task%20management%20app%20clean%20interface%20todo%20list%20responsive%20design&image_size=landscape_16_9',
    technologies: ['Vue3', 'TypeScript', 'Pinia', 'IndexedDB'],
    url: 'https://tasks.fis.ink',
    githubUrl: 'https://github.com/fishcpy/task-manager'
  },
  {
    id: 'ai-tools',
    title: 'AI工具集',
    description: '集成多种AI功能的工具平台，提升日常工作效率。',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ai%20tools%20platform%20modern%20interface%20dark%20theme%20responsive%20design&image_size=landscape_16_9',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    url: 'https://ai.fis.ink',
    githubUrl: 'https://github.com/fishcpy/ai-tools'
  }
]
</script>