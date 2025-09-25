<template>
  <!-- 1. 最外层统一支持深色 -->
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50
           dark:from-gray-900 dark:via-blue-900 dark:to-blue-900 relative py-12"
  >
    <!-- 背景大光晕 -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80
               bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"
      />
      <div
        class="hidden md:block absolute -bottom-40 -left-40 w-80 h-80
               bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-96 h-96 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl"
      />
    </div>

    <!-- 2. 内容区 -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 导航 -->
      <nav
        class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md
               rounded-xl border border-gray-300/40 dark:border-white/20 mb-6 shadow-xl"
      >
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <svg
              class="w-6 h-6 text-gray-700 dark:text-gray-200"
              viewBox="0 0 16 16" fill="currentColor"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              钟神秀的瞬间
            </span>
          </div>
        </div>
      </nav>

      <!-- 头部大图 -->
      <div
        class="relative mb-6 rounded-xl overflow-hidden border
               border-gray-300/40 dark:border-white/20 shadow-xl"
      >
        <div
          class="w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500
                 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-[url('https://img.314926.xyz/images/2025/09/22/20250922193025414.webp')]
                   bg-cover bg-center opacity-80"
          />
          <div class="relative z-10 p-6 h-full flex flex-col justify-end">
            <h1 class="text-3xl font-bold text-white drop-shadow-lg">
              即刻短文
            </h1>
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="space-y-6">
        <!-- 加载中 -->
        <div
          v-if="loading"
          class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md
                 rounded-xl border border-gray-300/40 dark:border-white/20
                 p-8 shadow-xl"
        >
          <div class="flex justify-center items-center space-x-3">
            <div
              class="w-6 h-6 border-2 border-blue-500 border-t-transparent
                     rounded-full animate-spin"
            />
            <span class="text-gray-700 dark:text-gray-300">加载中...</span>
          </div>
        </div>

        <!-- 失败 -->
        <div
          v-else-if="error"
          class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md
                 rounded-xl border border-gray-300/40 dark:border-white/20
                 p-8 shadow-xl"
        >
          <div class="text-center">
            <div class="text-red-500 dark:text-red-400 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              加载失败
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">{{ error }}</p>
            <button
              @click="fetchMoments"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              重试
            </button>
          </div>
        </div>

        <!-- 空态 -->
        <div
          v-else-if="moments.length === 0"
          class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md
                 rounded-xl border border-gray-300/40 dark:border-white/20
                 p-8 shadow-xl"
        >
          <div class="text-center text-gray-700 dark:text-gray-300">
            <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>暂无动态</p>
          </div>
        </div>

        <!-- 列表 -->
        <template v-else>
          <article
            v-for="moment in paginatedMoments"
            :key="moment.id"
            class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md
                   rounded-xl border border-gray-300/40 dark:border-white/20
                   overflow-hidden hover:bg-white/70 dark:hover:bg-white/15
                   transition-all duration-300 shadow-xl hover:shadow-2xl"
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
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      钟神秀 @zsxsw
                    </h3>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ formatTime(moment.created_at) }}
                    </span>
                  </div>
                  <div
                    class="mt-2 prose prose-sm max-w-none
                           text-gray-700 dark:text-gray-200"
                    v-html="marked.parse(moment.body)"
                  />
                </div>
              </div>
            </div>
          </article>

          <!-- 分页 -->
          <div
            v-if="totalPages > 1"
            class="flex justify-center items-center gap-2 mt-6"
          >
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-white/60 dark:bg-white/10 backdrop-blur-md
                     border border-gray-300/40 dark:border-white/20
                     rounded-lg text-gray-700 dark:text-gray-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
            >
              上一页
            </button>

            <template v-for="page in visiblePages" :key="page">
              <button
                @click="currentPage = page"
                :class="{
                  'bg-blue-600 text-white': currentPage === page,
                  'bg-white/60 dark:bg-white/10 text-gray-700 dark:text-gray-200':
                    currentPage !== page
                }"
                class="w-10 h-10 flex items-center justify-center backdrop-blur-md
                       border border-gray-300/40 dark:border-white/20
                       rounded-lg hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
              >
                {{ page }}
              </button>
            </template>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-white/60 dark:bg-white/10 backdrop-blur-md
                     border border-gray-300/40 dark:border-white/20
                     rounded-lg text-gray-700 dark:text-gray-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
            >
              下一页
            </button>
          </div>
        </template>
      </div>

      <!-- Giscus 评论区 -->
      <div
        class="mt-12 relative bg-white/60 dark:bg-white/10 backdrop-blur-md
               rounded-xl border border-gray-300/40 dark:border-white/20
               overflow-hidden shadow-xl"
      >
        <div class="giscus-container p-6" />
      </div>

      <!-- 浮动编辑按钮 -->
      <a
        href="https://github.com/zsxsw/github-issues-moments/issues/1"
        target="_blank"
        rel="noopener noreferrer"
        class="fixed right-6 bottom-6 w-12 h-12 flex items-center justify-center
               bg-white/60 dark:bg-white/10 backdrop-blur-md
               border border-gray-300/40 dark:border-white/20
               rounded-full text-gray-700 dark:text-gray-200
               hover:bg-white/80 dark:hover:bg-white/20
               shadow-xl hover:shadow-2xl transition-all"
        title="添加/编辑说说"
      >
        ✏️
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { marked } from 'marked'

/* ---------------- 深色模式（仅跟随系统/本地存储，无按钮） ---------------- */
const darkMode = ref(false)

const syncTheme = () => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  darkMode.value = saved ? saved === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', darkMode.value)
  nextTick(loadGiscus)
}

onMounted(() => {
  syncTheme()
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncTheme)
})

onUnmounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', syncTheme)
})

/* ---------------- 数据 & 分页 ---------------- */
const moments = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const itemsPerPage = 5

const totalPages = computed(() => Math.ceil(moments.value.length / itemsPerPage))
const paginatedMoments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return moments.value.slice(start, start + itemsPerPage)
})
const visiblePages = computed(() => {
  const max = 5
  let s = 1, e = totalPages.value
  if (totalPages.value > max) {
    const half = Math.floor(max / 2)
    if (currentPage.value <= half + 1) e = max
    else if (currentPage.value >= totalPages.value - half) s = totalPages.value - max + 1
    else { s = currentPage.value - half; e = currentPage.value + half }
  }
  return Array.from({ length: e - s + 1 }, (_, i) => s + i)
})

/* ---------------- 请求数据 ---------------- */
const fetchMoments = async () => {
  try {
    loading.value = true
    error.value = null
    const res = await fetch('https://github-api.zhzsx.cn/api/comments')
    if (!res.ok) throw new Error('网络错误: ' + res.status)
    const data = await res.json()
    moments.value = Array.isArray(data) ? data.reverse() : []
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
  } finally {
    loading.value = false
  }
}

/* ---------------- 工具函数 ---------------- */
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} 天前`
  return date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
}

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg'
}

/* ---------------- Giscus 评论区 ---------------- */
let giscusObserver: MutationObserver | null = null
const loadGiscus = () => {
  const container = document.querySelector('.giscus-container') as HTMLElement
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
  script.setAttribute('data-theme', darkMode.value ? 'dark' : 'light')
  container.appendChild(script)
}

/* ---------------- 生命周期 ---------------- */
onMounted(() => {
  fetchMoments()
  loadGiscus()
  // 监听 html class 变化，实时重载评论区
  giscusObserver = new MutationObserver(() => loadGiscus())
  giscusObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => giscusObserver?.disconnect())
</script>

<style scoped>
/* 自定义 markdown 样式 */
.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}
.prose pre {
  @apply bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg p-3 overflow-x-auto;
}
.prose code {
  @apply bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5 text-sm;
}
.prose blockquote {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 text-gray-600 dark:text-gray-300;
}
</style>