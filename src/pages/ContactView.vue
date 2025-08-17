<template>
  <div class="bg-white dark:bg-gray-900 transition-colors duration-200">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          联系我
        </h1>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Contact Info -->
        <div>
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">联系方式</h2>
          </div>
            
          <div class="space-y-6">
            <!-- Email -->
            <div class="backdrop-blur-lg bg-white/5 dark:bg-gray-800/5 border border-white/30 dark:border-gray-700/30 rounded-lg p-6 shadow-xl backdrop-saturate-150">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Mail class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">邮箱</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-2">最佳联系方式</p>
                  <a
                    :href="`mailto:${personalStore.contactEmail}`"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
                  >
                    {{ personalStore.contactEmail }}
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Phone -->
            <div class="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg p-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Phone class="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">电话</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-2">工作时间联系</p>
                  <span class="text-gray-900 dark:text-white font-medium">
                    {{ personalStore.info.phone || '+86 138-0000-0000' }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Location -->
            <div class="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg p-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <MapPin class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">位置</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-2">当前所在地</p>
                  <span class="text-gray-900 dark:text-white font-medium">
                    {{ personalStore.info.location }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-lg p-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <Users class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">社交媒体</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">关注我的最新动态</p>
                  <div class="flex space-x-4">
                    <a
                      v-for="link in personalStore.socialLinks"
                      :key="link.platform"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      :title="link.platform"
                    >
                      <component :is="getIcon(link.icon)" class="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Response Time -->
          <div class="mt-8 backdrop-blur-sm bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30 rounded-lg p-6">
            <div class="text-center">
              <Clock class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">响应时间</h3>
              <p class="text-gray-600 dark:text-gray-300">
                我通常会在 <span class="font-semibold text-blue-600 dark:text-blue-400">24小时内</span> 回复您的消息
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin, Users, Clock, Github, Linkedin, Twitter, MessageCircle } from 'lucide-vue-next'
import { usePersonalStore } from '@/stores/personal'

const personalStore = usePersonalStore()

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  'message-circle': MessageCircle
}

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || MessageCircle
}
</script>