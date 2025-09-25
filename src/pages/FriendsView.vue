<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-blue-900 relative py-12">
    <!-- Background blur effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Content overlay -->
    <div class="relative z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 relative">
          <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
              友情链接
            </h1>
            <p class="text-xl text-gray-700 dark:text-gray-200 mb-4 drop-shadow-sm">
              与志同道合的朋友们
            </p>
<!-- 修改按钮区域代码 -->
<div class="flex justify-center gap-4">
  <a 
    href="https://friends-api.kemeow.top/" 
    target="_blank" 
    rel="noopener noreferrer"
    class="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-lg p-3 font-mono text-sm shadow-xl hover:shadow-2xl transition-all"
  >
    <span class="text-gray-700 dark:text-gray-200">API来源</span>
  </a>
  <button 
    @click="refreshFriends" 
    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-xl hover:shadow-2xl flex items-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
    刷新数据
  </button>
  <a 
    href="https://github.com/kemiaofxjun/blog-friends" 
    target="_blank" 
    rel="noopener noreferrer"
    class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-xl hover:shadow-2xl flex items-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
    申请友链
  </a>
</div>
          </div>
        </div>

        <div v-if="loading" class="flex justify-center items-center py-12 relative">
          <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 flex items-center space-x-2 p-8">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-700 dark:text-gray-200 drop-shadow-sm">正在加载友链数据...</span>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-12 relative">
          <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <div class="text-red-600 dark:text-red-400 mb-4">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg font-medium drop-shadow-lg">加载友链失败</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-2 drop-shadow-sm">{{ error }}</p>
            </div>
            <button 
              @click="loadFriends" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors shadow-xl hover:shadow-2xl"
            >
              重试
            </button>
          </div>
        </div>

        <div v-else-if="friends.length === 0" class="text-center py-12 relative">
          <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <div class="text-gray-600 dark:text-gray-300">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg font-medium drop-shadow-lg">暂无友链</p>
              <p class="text-sm mt-2 drop-shadow-sm">快去添加一些朋友吧~</p>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(friend, index) in friends" 
            :key="friend.url"
            class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-xl border border-gray-300/40 dark:border-white/20 overflow-hidden hover:bg-white/70 dark:hover:bg-white/15 hover:border-gray-400/50 dark:hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <div class="relative z-10 p-6">
              <div class="flex items-start mb-4">
                <img 
                  :src="friend.icon" 
                  :alt="friend.title + '的图标'"
                  class="w-16 h-16 rounded-full object-cover border-2 border-white/50 dark:border-gray-700/50 shadow-md"
                  @error="handleImageError"
                >
                <div class="ml-4 flex-1">
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1 drop-shadow-md">
                    <a :href="friend.url" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200">
                      {{ friend.title }}
                    </a>
                  </h2>
                  <div v-if="friend.labels && friend.labels.length > 0" class="flex flex-wrap gap-1 mt-1">
                    <span 
                      v-for="label in friend.labels" 
                      :key="label.name"
                      class="px-2 py-0.5 text-xs rounded-full backdrop-blur-sm border"
                      :style="{
                        backgroundColor: `rgba(${hexToRgb(label.color)}, 0.2)`,
                        borderColor: `rgba(${hexToRgb(label.color)}, 0.3)`,
                        color: getContrastColor(label.color)
                      }"
                    >
                      {{ label.name }}
                    </span>
                  </div>
                </div>
              </div>
              
              <p class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4 drop-shadow-sm">
                {{ friend.description }}
              </p>
              
              <div v-if="friend.posts && friend.posts.length > 0" class="mb-4">
                <h3 class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  最新文章
                </h3>
                <ul class="space-y-1 text-sm">
                  <li v-for="post in friend.posts.slice(0, 3)" :key="post.link" class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mt-0.5 mr-1.5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a 
                      :href="post.link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 truncate transition-colors"
                      :title="post.title"
                    >
                      {{ post.title }}
                    </a>
                  </li>
                </ul>
              </div>
              
              <div class="flex items-center justify-between pt-2 border-t border-gray-200/50 dark:border-gray-700/30">
                <a 
                  :href="friend.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                >
                  访问网站
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
                
                <div class="flex items-center space-x-3">
                  <a 
                    v-if="friend.feed" 
                    :href="friend.feed" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    title="RSS订阅"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </a>
                  
                  <a 
                    v-if="friend.snapshot" 
                    :href="friend.snapshot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    title="网站截图"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Friend {
  title: string
  url: string
  icon: string
  snapshot?: string
  description: string
  feed?: string
  posts?: Array<{
    title: string
    link: string
    published: string
  }>
  issue_number?: number
  labels?: Array<{
    name: string
    color: string
    hue?: number
    saturation?: number
    lightness?: number
  }>
}

const friends = ref<Friend[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadFriends = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('https://friends-api.kemeow.top/v2/data.json')
    if (!response.ok) throw new Error('网络响应不正常')
    const data = await response.json()
    friends.value = data.content || []
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    console.error('加载友链失败:', err)
  } finally {
    loading.value = false
  }
}

const refreshFriends = () => {
  loadFriends()
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/128?text=No+Image'
}

const hexToRgb = (hex: string) => {
  // 移除#号
  hex = hex.replace('#', '')
  
  // 处理3位hex
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('')
  }
  
  // 转换为rgb
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  return `${r}, ${g}, ${b}`
}

const getContrastColor = (hexColor: string) => {
  // 移除#号
  hexColor = hexColor.replace('#', '')
  
  // 处理3位hex
  if (hexColor.length === 3) {
    hexColor = hexColor.split('').map(x => x + x).join('')
  }
  
  // 转换为rgb
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)
  
  // 计算亮度 (YIQ公式)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  // 返回黑色或白色
  return brightness > 128 ? '#000000' : '#ffffff'
}

onMounted(() => {
  loadFriends()
})
</script>