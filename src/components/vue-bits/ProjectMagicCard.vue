<template>
  <div
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    class="magic-card relative overflow-hidden cursor-pointer transition-all duration-300"
    :style="{
      '--glow-x': glowX + '%',
      '--glow-y': glowY + '%',
      '--glow-intensity': glowIntensity,
      '--glow-radius': `${spotlightRadius}px`,
      transform: tiltEnabled ? `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)` : 'none'
    }"
  >
    <!-- Border Glow Effect -->
    <div
      v-if="enableBorderGlow"
      class="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
      :class="{ 'opacity-100': isHovered }"
      :style="{
        background: `radial-gradient(${spotlightRadius}px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, 0.4), transparent 70%)`,
        filter: 'blur(2px)'
      }"
    ></div>

    <!-- Spotlight Effect -->
    <div
      v-if="enableSpotlight"
      class="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
      :class="{ 'opacity-100': isHovered }"
      :style="{
        background: `radial-gradient(${spotlightRadius}px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, 0.15), transparent 70%)`
      }"
    ></div>

    <!-- Particles Container -->
    <div
      v-if="enableStars"
      ref="particleContainer"
      class="absolute inset-0 pointer-events-none overflow-hidden"
    ></div>

    <!-- Card Content -->
    <div class="relative z-10 h-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/70 dark:hover:bg-white/15 hover:border-gray-400/50 dark:hover:border-white/30 shadow-xl hover:shadow-2xl">
      <slot />
    </div>

    <!-- Click Ripple Effect -->
    <div
      v-if="clickEffect && ripples.length > 0"
      class="absolute inset-0 pointer-events-none"
    >
      <div
        v-for="ripple in ripples"
        :key="ripple.id"
        class="absolute rounded-full border-2 opacity-75"
        :style="{
          left: ripple.x + 'px',
          top: ripple.y + 'px',
          width: ripple.size + 'px',
          height: ripple.size + 'px',
          borderColor: `rgba(${glowColor}, 0.6)`,
          transform: 'translate(-50%, -50%)'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

interface Props {
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  rippleOnClick?: boolean
  glowColor?: string
  borderGlowOpacity?: number
  spotlightRadius?: number
  particleCount?: number
}

const props = withDefaults(defineProps<{
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  rippleOnClick?: boolean
  glowColor?: string
  borderGlowOpacity?: number
  spotlightRadius?: number
  particleCount?: number
}>(), {
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: true,
  enableMagnetism: true,
  clickEffect: true,
  rippleOnClick: true,
  glowColor: '132, 0, 255',
  borderGlowOpacity: 0.5,
  spotlightRadius: 300,
  particleCount: 8,
})

const cardRef = ref<HTMLElement>()
const particleContainer = ref<HTMLElement>()
const isHovered = ref(false)
const glowX = ref(50)
const glowY = ref(50)
const glowIntensity = ref(0)
const tiltX = ref(0)
const tiltY = ref(0)
const tiltEnabled = ref(false)
const ripples = ref<Ripple[]>([])
const particles = ref<HTMLElement[]>([])

let rippleId = 0
let animationFrame: number | null = null

const handleMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  glowX.value = (x / rect.width) * 100
  glowY.value = (y / rect.height) * 100
  glowIntensity.value = 1
  isHovered.value = true

  // Tilt effect
  if (props.enableTilt) {
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / centerY * -10
    const rotateY = (x - centerX) / centerX * 10
    
    tiltX.value = rotateY
    tiltY.value = rotateX
    tiltEnabled.value = true
  }

  // Create particles on mouse move
  if (props.enableStars && particleContainer.value) {
    createParticle(x, y)
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
  glowIntensity.value = 0
  
  if (props.enableTilt) {
    gsap.to({ tiltX: tiltX.value, tiltY: tiltY.value }, {
      tiltX: 0,
      tiltY: 0,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: function() {
        tiltX.value = this.targets()[0].tiltX
        tiltY.value = this.targets()[0].tiltY
      },
      onComplete: () => {
        tiltEnabled.value = false
      }
    })
  }
}

const handleClick = (event: MouseEvent) => {
  if (!props.clickEffect || !cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const ripple: Ripple = {
    id: rippleId++,
    x,
    y,
    size: 0
  }

  ripples.value.push(ripple)

  gsap.to(ripple, {
    size: 300,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => {
      const index = ripples.value.findIndex(r => r.id === ripple.id)
      if (index > -1) {
        ripples.value.splice(index, 1)
      }
    }
  })
}

const createParticle = (x: number, y: number) => {
  if (!particleContainer.value || particles.value.length >= props.particleCount) return

  const particle = document.createElement('div')
  particle.className = 'absolute w-1 h-1 bg-white rounded-full pointer-events-none'
  particle.style.left = x + 'px'
  particle.style.top = y + 'px'
  particle.style.opacity = '0.8'
  
  particleContainer.value.appendChild(particle)
  particles.value.push(particle)

  const angle = Math.random() * Math.PI * 2
  const velocity = 2 + Math.random() * 3
  const lifetime = 1 + Math.random() * 2

  gsap.to(particle, {
    x: Math.cos(angle) * velocity * 50,
    y: Math.sin(angle) * velocity * 50,
    opacity: 0,
    scale: 0,
    duration: lifetime,
    ease: 'power2.out',
    onComplete: () => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
      const index = particles.value.indexOf(particle)
      if (index > -1) {
        particles.value.splice(index, 1)
      }
    }
  })
}

const cleanupParticles = () => {
  particles.value.forEach(particle => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle)
    }
  })
  particles.value = []
}

onMounted(() => {
  // Initialize any mounted logic if needed
})

onUnmounted(() => {
  cleanupParticles()
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.magic-card {
  transform-style: preserve-3d;
}
</style>