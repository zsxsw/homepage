<template>
  <header class="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-lg overflow-hidden">
              <img src="https://www.fis.ink/img/logo_c.png" alt="fishcpy logo" class="w-full h-full object-cover" />
            </div>
            <span class="font-semibold text-xl text-gray-900 dark:text-white">{{ personalStore.fullName }}</span>
          </router-link>
        </div>
        
        <div class="hidden md:flex items-center space-x-4">
          <div class="flex items-baseline space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                'px-3 py-2 rounded text-sm font-medium',
                $route.path === item.href
                  ? 'text-gray-900 dark:text-white border-b border-gray-900 dark:border-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
          <ThemeToggle />
        </div>
        
        <div class="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-expanded="false"
          >
            <span class="sr-only">打开主菜单</span>
            <svg
              :class="[mobileMenuOpen ? 'hidden' : 'block', 'h-6 w-6']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              :class="[mobileMenuOpen ? 'block' : 'hidden', 'h-6 w-6']"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <Transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                'block px-3 py-2 rounded text-base font-medium',
                $route.path === item.href
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
              @click="mobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePersonalStore } from '@/stores/personal'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const personalStore = usePersonalStore()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: '首页', href: '/' },
  { name: '关于我', href: '/about' },
  { name: '文章', href: '/articles' },
  { name: '项目作品', href: '/portfolio' },
  { name: '我的网站', href: '/sites' }
]
</script>