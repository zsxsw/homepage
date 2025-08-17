<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <slot name="header" />
    </div>
    
    <div :class="contentClasses">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { clsx } from 'clsx'

interface Props {
  variant?: 'default' | 'bordered' | 'shadow' | 'elevated' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  rounded: 'lg',
  hover: false
})

const cardClasses = computed(() => {
  const baseClasses = props.variant === 'glass' 
    ? 'overflow-hidden transition-all duration-200'
    : 'bg-white dark:bg-gray-800 overflow-hidden transition-all duration-200'
  
  const variantClasses = {
    default: 'border border-gray-200 dark:border-gray-700',
    bordered: 'border-2 border-gray-300 dark:border-gray-600',
    shadow: 'shadow-md border border-gray-100 dark:border-gray-700 dark:shadow-gray-900/20 shadow-blue-500/5',
    elevated: 'shadow-lg border border-gray-100 dark:border-gray-700 dark:shadow-gray-900/30 shadow-blue-500/10',
    glass: 'backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 shadow-xl backdrop-saturate-150'
  }
  
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }
  
  const hoverClasses = props.hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer hover:-rotate-1' : ''
  
  return clsx(
    baseClasses,
    variantClasses[props.variant],
    roundedClasses[props.rounded],
    hoverClasses
  )
})

const contentClasses = computed(() => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return paddingClasses[props.padding]
})
</script>