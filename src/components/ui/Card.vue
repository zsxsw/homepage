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
    bordered: 'border border-gray-300 dark:border-gray-600',
    shadow: 'border border-gray-200 dark:border-gray-700',
    elevated: 'border border-gray-200 dark:border-gray-700',
    glass: 'border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50'
  }
  
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }
  
  const hoverClasses = props.hover ? 'hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer' : ''
  
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