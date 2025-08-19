<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 flex flex-col relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gray-400/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/3 -left-20 w-60 h-60 bg-gray-500/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gray-600/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-gray-300/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
    </div>
    
    <Header />
    
    <main class="flex-1 relative z-10">
    <Transition name="page" mode="out-in">
      <RouterView />
    </Transition>
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.02);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>