<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <Header />
    
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <Transition
          name="page"
          mode="out-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
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