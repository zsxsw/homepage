<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
    <Header />
    
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <Transition
          name="page"
          mode="out-in"
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <component :is="Component" />
        </Transition>
      </router-view>
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
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>