<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 rounded-lg overflow-hidden">
              <img src="https://www.fis.ink/img/logo_c.png" alt="fishcpy logo" class="w-full h-full object-cover" />
            </div>
            <span class="font-semibold text-xl">{{ personalStore.fullName }}</span>
          </div>
          <p class="text-gray-300 mb-4 max-w-md">
            {{ personalStore.info.bio }}
          </p>
          <div class="flex space-x-4">
            <a
              v-for="link in personalStore.socialLinks"
              :key="link.platform"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors"
              :aria-label="link.platform"
            >
              <component :is="getIcon(link.icon)" class="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">快速导航</h3>
          <ul class="space-y-2">
            <li v-for="item in navigation" :key="item.name">
              <router-link
                :to="item.href"
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">联系方式</h3>
          <ul class="space-y-2">
            <li class="flex items-center space-x-2">
              <Mail class="w-4 h-4 text-gray-400" />
              <a
                :href="`mailto:${personalStore.contactEmail}`"
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ personalStore.contactEmail }}
              </a>
            </li>
            <li v-if="personalStore.info.phone" class="flex items-center space-x-2">
              <Phone class="w-4 h-4 text-gray-400" />
              <span class="text-gray-300">{{ personalStore.info.phone }}</span>
            </li>
            <li class="flex items-center space-x-2">
              <MapPin class="w-4 h-4 text-gray-400" />
              <span class="text-gray-300">{{ personalStore.info.location }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          &copy; {{ currentYear }} {{ personalStore.fullName }}. 保留所有权利。
        </p>
        <p class="text-gray-400 text-sm mt-2 md:mt-0">
          使用 Vue 3 + TypeScript 构建
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageCircle } from 'lucide-vue-next'
import { usePersonalStore } from '@/stores/personal'

const personalStore = usePersonalStore()

const currentYear = computed(() => new Date().getFullYear())

const navigation = [
  { name: '首页', href: '/' },
  { name: '关于我', href: '/about' },
  { name: '技能', href: '/skills' },
  { name: '作品集', href: '/portfolio' },
  { name: '联系我', href: '/contact' }
]

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  'message-circle': MessageCircle,
  mail: Mail,
  phone: Phone,
  'map-pin': MapPin
}

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || MessageCircle
}
</script>