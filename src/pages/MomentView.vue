<template>
  <!-- 确保所有标签正确闭合 -->
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 relative py-12">
    <!-- Background blur effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Content overlay -->
    <div class="relative z-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Navigation -->
        <nav class="relative bg-white/60 backdrop-blur-md rounded-xl border border-gray-300/40 mb-6 shadow-xl">
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-gray-700" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              <span class="text-lg font-semibold text-gray-800">钟神秀的瞬间</span>
            </div>
          </div>
        </nav>

        <!-- Header Image -->
        <div class="relative mb-6 rounded-xl overflow-hidden border border-gray-300/40 shadow-xl">
          <div class="w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://img.314926.xyz/images/2025/09/22/20250922193025414.webp')] bg-cover bg-center opacity-80"></div>
            <div class="relative z-10 p-6 h-full flex flex-col justify-end">
              <h1 class="text-3xl font-bold text-white drop-shadow-lg">即刻短文</h1>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="space-y-6">
          <!-- Loading State -->
          <div v-if="loading" class="relative bg-white/60 backdrop-blur-md rounded-xl border border-gray-300/40 p-8 shadow-xl">
            <div class="flex justify-center items-center space-x-3">
              <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-gray-700">加载中...</span>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="relative bg-white/60 backdrop-blur-md rounded-xl border border-gray-300/40 p-8 shadow-xl">
            <div class="text-center">
              <div class="text-red-500 mb-4">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">加载失败</h3>
              <p class="text-gray-700 mb-4">{{ error }}</p>
              <button 
                @click="fetchMoments"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                重试
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="moments.length === 0" class="relative bg-white/60 backdrop-blur-md rounded-xl border border-gray-300/40 p-8 shadow-xl">
            <div class="text-center text-gray-700">
              <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6mm-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p>暂无动态</p>
            </div>
          </div>

          <!-- Moments List -->
          <template v-else>
            <article 
              v-for="moment in paginatedMoments" 
              :key="moment.id"
              class="relative bg-white/60 backdrop-blur-md rounded-xl border border-gray-300/40 overflow-hidden hover:bg-white/70 hover:border-gray-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div class="p-6">
                <div class="flex items-start gap-4">
                  <img 
                    :src="moment.user.avatar_url || 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg'" 
                    alt="Avatar" 
                    class="w-10 h-10 rounded-full border-2 border-gray-200/60"
                    @error="handleImageError"
                  />
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold text-gray-900">钟神秀 @zsxsw</h3>
                      <span class="text-xs text-gray-500">{{ formatTime(moment.created_at) }}</span>
                    </div>
                    <div class="mt-2 prose prose-sm max-w-none" v-html="marked.parse(moment.body)"></div>
                  </div>
                </div>
              </div>
            </article>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-6">
              <button 
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-4 py-2 bg-white/60 backdrop-blur-md border border-gray-300/40 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/80 transition-colors"
              >
                上一页
              </button>
              
              <template v-for="page in visiblePages" :key="page">
                <button 
                  @click="currentPage = page"
                  :class="{
                    'bg-blue-600 text-white': currentPage === page,
                    'bg-white/60 text-gray-700': currentPage !== page
                  }"
                  class="w-10 h-10 flex items-center justify-center backdrop-blur-md border border-gray-300/40 rounded-lg hover:bg-white/80 transition-colors"
                >
                  {{ page }}
                </button>
              </template>
              
              <button 
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-white/60 backdrop-blur-md border border-gray-300/40 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/80 transition-colors"
              >
                下一页
              </button>
            </div>
          </template>
        </div>

        <!-- Giscus Comments -->
        <div class="mt-12 relative bg-white/60 backdrop-blur-md rounded-xl border border-gray-300/40 overflow-hidden shadow-xl">
          <div class="giscus-container p-6"></div>
        </div>

        <!-- Floating Edit Button -->
        <a 
          href="https://github.com/zsxsw/github-issues-moments/issues/1" 
          target="_blank" 
          rel="noopener noreferrer"
          class="fixed right-6 bottom-6 w-12 h-12 flex items-center justify-center bg-white/60 backdrop-blur-md border border-gray-300/40 rounded-full text-gray-700 hover:bg-white/80 shadow-xl hover:shadow-2xl transition-all"
          title="添加/编辑说说"
        >
          ✏️
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'

// Info Modal
const showInfoModal = ref(false)

// Moments Data
const moments = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const itemsPerPage = 5

const fetchMoments = async () => {
  try {
    loading.value = true
    error.value = null
    // Replace with your actual API endpoint
    const response = await fetch('https://github-api.zhzsx.cn/api/comments')
    if (!response.ok) throw new Error('网络错误: ' + response.status)
    const data = await response.json()
    moments.value = Array.isArray(data) ? data.reverse() : []
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    console.error('加载动态失败:', err)
  } finally {
    loading.value = false
  }
}

// Pagination
const totalPages = computed(() => Math.ceil(moments.value.length / itemsPerPage))
const paginatedMoments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return moments.value.slice(start, end)
})

const visiblePages = computed(() => {
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)
  let start = 1
  let end = totalPages.value
  
  if (totalPages.value > maxVisible) {
    if (currentPage.value <= half + 1) {
      end = maxVisible
    } else if (currentPage.value >= totalPages.value - half) {
      start = totalPages.value - maxVisible + 1
    } else {
      start = currentPage.value - half
      end = currentPage.value + half
    }
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Format time
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000
  
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`
  
  return date.toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  })
}

// Image error handler
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg'
}

// Giscus Comments
const loadGiscus = () => {
  const container = document.querySelector('.giscus-container')
  if (!container) return
  
  container.innerHTML = ''
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', 'zsxsw/github-issues-moments')
  script.setAttribute('data-repo-id', 'R_kgDOP0jWOA')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOP0jWOM4Cvv6S')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-theme', 'light')
  container.appendChild(script)
}

// Initial fetch
onMounted(() => {
  fetchMoments()
  loadGiscus()
})
</script>

<style>
/* Custom prose styles for markdown content */
.prose {
  color: var(--fg);
}

.prose a {
  color: var(--link);
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}

.prose pre {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.prose code {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.9em;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
}

.prose img {
  max-width: 100%;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.prose blockquote {
  border-left: 3px solid var(--border);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--fg);
  opacity: 0.8;
}
</style>