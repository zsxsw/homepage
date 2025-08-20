<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Magic Bento Cards
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          交互式卡片组件，支持粒子动画、聚光灯效果和3D倾斜
        </p>
      </div>
    </div>

    <!-- Magic Bento Component -->
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <MagicBento
        :text-auto-hide="true"
        :enable-stars="true"
        :enable-spotlight="true"
        :enable-border-glow="true"
        :enable-tilt="true"
        :enable-magnetism="true"
        :click-effect="true"
        :spotlight-radius="300"
        :particle-count="12"
        glow-color="132, 0, 255"
      />
    </div>

    <!-- Controls Panel -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-2xl p-6 shadow-xl">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">控制面板</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <label class="flex items-center space-x-2">
            <input
              v-model="controls.textAutoHide"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700 dark:text-gray-300">文字自动隐藏</span>
          </label>
          
          <label class="flex items-center space-x-2">
            <input
              v-model="controls.enableStars"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700 dark:text-gray-300">粒子动画</span>
          </label>
          
          <label class="flex items-center space-x-2">
            <input
              v-model="controls.enableSpotlight"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700 dark:text-gray-300">聚光灯效果</span>
          </label>
          
          <label class="flex items-center space-x-2">
            <input
              v-model="controls.enableBorderGlow"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700 dark:text-gray-300">边框发光</span>
          </label>
          
          <label class="flex items-center space-x-2">
            <input
              v-model="controls.enableTilt"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700 dark:text-gray-300">3D倾斜</span>
          </label>
          
          <label class="flex items-center space-x-2">
            <input
              v-model="controls.enableMagnetism"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700 dark:text-gray-300">磁性效果</span>
          </label>
          
          <label class="flex items-center space-x-2">
            <input
              v-model="controls.clickEffect"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700 dark:text-gray-300">点击波纹</span>
          </label>
        </div>
        
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              聚光灯半径: {{ controls.spotlightRadius }}px
            </label>
            <input
              v-model.number="controls.spotlightRadius"
              type="range"
              min="100"
              max="500"
              step="50"
              class="w-full"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              粒子数量: {{ controls.particleCount }}
            </label>
            <input
              v-model.number="controls.particleCount"
              type="range"
              min="5"
              max="25"
              step="1"
              class="w-full"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import MagicBento from '@/components/vue-bits/Components/MagicBento.vue'

const controls = reactive({
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: true,
  enableMagnetism: true,
  clickEffect: true,
  spotlightRadius: 300,
  particleCount: 12
})
</script>