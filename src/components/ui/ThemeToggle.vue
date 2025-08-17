<template>
  <button
    @click="toggleTheme"
    class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <div class="relative w-5 h-5">
      <!-- 太阳图标 (浅色模式) -->
      <svg
        v-show="!isDark"
        class="absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 transform"
        :class="{
          'rotate-0 scale-100 opacity-100': !isDark,
          'rotate-90 scale-0 opacity-0': isDark
        }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      <!-- 月亮图标 (深色模式) -->
      <svg
        v-show="isDark"
        class="absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 transform"
        :class="{
          'rotate-0 scale-100 opacity-100': isDark,
          '-rotate-90 scale-0 opacity-0': !isDark
        }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </div>
    
    <!-- 切换动画背景 -->
    <div 
      class="absolute inset-0 rounded-lg transition-all duration-300"
      :class="{
        'bg-gradient-to-r from-yellow-400 to-orange-400 opacity-10': !isDark,
        'bg-gradient-to-r from-blue-600 to-purple-600 opacity-10': isDark
      }"
    ></div>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme, isDark } = useTheme()
</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>