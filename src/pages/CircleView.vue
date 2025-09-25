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
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 relative">
          <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
              友链朋友圈
            </h1>
            <p class="text-xl text-gray-700 dark:text-gray-200 mb-4 drop-shadow-sm">
              发现朋友们的精彩内容
            </p>
            <!-- <div class="flex justify-center">
              <div class="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-lg p-3 font-mono text-sm shadow-xl">
                <span class="text-gray-700 dark:text-gray-200">RSS:</span>
                <a 
                  href="https://blog.zhzsx.cn/rss.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  https://blog.zhzsx.cn/rss.xml
                </a>
              </div>
            </div> -->
          </div>
        </div>

        <!-- 友链朋友圈容器 -->
        <div class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-xl border border-gray-300/40 dark:border-white/20 overflow-hidden shadow-xl">
          <div id="friend-circle-lite-root" class="p-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 初始化友链朋友圈
  if (typeof UserConfig === 'undefined') {
    window.UserConfig = {
      // 填写你的fc Lite地址
      private_api_url: 'https://fc.kemeow.top/',
      // 点击加载更多时，一次最多加载几篇文章，默认20
      page_turning_number: 24,
      // 头像加载失败时，默认头像地址
      error_img: 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg',
    }
  }

  // 动态加载友链朋友圈CSS和JS
  const loadFriendCircle = () => {
    // 检查是否已加载
    if (document.querySelector('link[href="https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css"]')) {
      return
    }

    // 加载CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css'
    document.head.appendChild(link)

    // 加载JS
    const script = document.createElement('script')
    script.src = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js'
    document.body.appendChild(script)
  }

  loadFriendCircle()
})
</script>

<style>
/* 自定义友链朋友圈样式以匹配您的主题 */
#friend-circle-lite-root {
  --fcl-primary: rgba(59, 130, 246, 0.8);
  --fcl-primary-hover: rgba(37, 99, 235, 0.9);
  --fcl-secondary: rgba(156, 163, 175, 0.6);
  --fcl-secondary-hover: rgba(107, 114, 128, 0.7);
  --fcl-bg: transparent;
  --fcl-card-bg: rgba(255, 255, 255, 0.4);
  --fcl-card-bg-hover: rgba(255, 255, 255, 0.5);
  --fcl-text: rgba(17, 24, 39, 0.9);
  --fcl-text-secondary: rgba(75, 85, 99, 0.8);
  --fcl-border: rgba(209, 213, 219, 0.4);
  --fcl-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --fcl-radius: 0.75rem;
  --fcl-transition: all 0.2s ease;
}

.dark #friend-circle-lite-root {
  --fcl-primary: rgba(96, 165, 250, 0.8);
  --fcl-primary-hover: rgba(59, 130, 246, 0.9);
  --fcl-secondary: rgba(156, 163, 175, 0.6);
  --fcl-secondary-hover: rgba(209, 213, 219, 0.7);
  --fcl-bg: transparent;
  --fcl-card-bg: rgba(255, 255, 255, 0.05);
  --fcl-card-bg-hover: rgba(255, 255, 255, 0.1);
  --fcl-text: rgba(229, 231, 235, 0.9);
  --fcl-text-secondary: rgba(209, 213, 219, 0.8);
  --fcl-border: rgba(55, 65, 81, 0.4);
  --fcl-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

/* 调整友链朋友圈内部元素的样式 */
#friend-circle-lite-root .fcl-header {
  background: transparent !important;
  border-bottom: 1px solid var(--fcl-border) !important;
}

#friend-circle-lite-root .fcl-card {
  backdrop-filter: blur(8px);
  transition: var(--fcl-transition) !important;
}

#friend-circle-lite-root .fcl-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}

#friend-circle-lite-root .fcl-load-more {
  background: var(--fcl-card-bg) !important;
  border: 1px solid var(--fcl-border) !important;
  backdrop-filter: blur(8px);
}

#friend-circle-lite-root .fcl-load-more:hover {
  background: var(--fcl-card-bg-hover) !important;
}
</style>