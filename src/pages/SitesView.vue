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
import sites from '@/data/sites.json'
</script>