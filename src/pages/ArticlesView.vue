<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          我的文章
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-4">
          记录一些想法
        </p>
        <div class="flex justify-center">
          <a 
            href="https://blog.fis.ink/rss.xml" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
            </svg>
            RSS 订阅
          </a>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 dark:text-red-400 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">加载文章失败</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ error }}</p>
        </div>
        <button 
          @click="loadArticles" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          重试
        </button>
      </div>

      <div v-else-if="articles.length === 0" class="text-center py-12">
        <div class="text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-lg font-medium">暂无文章</p>
          <p class="text-sm mt-2">文章正在路上...</p>
        </div>
      </div>

      <div v-else class="space-y-8">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <div class="p-8">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <a :href="article.link" target="_blank" rel="noopener noreferrer" class="hover:underline">
                    {{ article.title }}
                  </a>
                </h2>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(article.pubDate) }}
                  <span v-if="article.author" class="ml-4 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    {{ article.author }}
                  </span>
                </div>
              </div>
              <a 
                :href="article.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="ml-4 p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="查看原文"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {{ article.description }}
            </p>
            
            <div v-if="article.categories && article.categories.length > 0" class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="category in article.categories" 
                :key="category"
                class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {{ category }}
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <a 
                :href="article.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                阅读全文
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Article } from '@/types'
import { RSSService } from '@/lib/rssService'

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadArticles = async () => {
  try {
    loading.value = true
    error.value = null
    articles.value = await RSSService.fetchArticles()
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    console.error('加载文章失败:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  return RSSService.formatDate(dateString)
}

onMounted(() => {
  loadArticles()
})
</script>