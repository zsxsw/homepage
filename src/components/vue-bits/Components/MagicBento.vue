<template>
  <div class="magic-bento-container">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(card, index) in cardData"
        :key="index"
        :ref="el => cardRefs[index] = el as HTMLElement"
        @mousemove="(event) => handleMouseMove(event, index)"
        @mouseleave="() => handleMouseLeave(index)"
        @click="(event) => handleClick(event, index)"
        class="magic-bento-card relative overflow-hidden cursor-pointer"
        :style="{
          backgroundColor: card.color,
          '--glow-x': cardStates[index]?.glowX || '50%',
          '--glow-y': cardStates[index]?.glowY || '50%',
          '--glow-intensity': cardStates[index]?.glowIntensity || '0',
          '--glow-radius': `${spotlightRadius}px`
        }"
      >
        <!-- Border Glow Effect -->
        <div
          v-if="enableBorderGlow && !disableAnimations"
          class="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
          :class="{ 'opacity-100': cardStates[index]?.isHovered }"
          :style="{
            background: `radial-gradient(${spotlightRadius}px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, 0.4), transparent 70%)`,
            filter: 'blur(2px)'
          }"
        ></div>

        <!-- Spotlight Effect -->
        <div
          v-if="enableSpotlight && !disableAnimations"
          class="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          :class="{ 'opacity-100': cardStates[index]?.isHovered }"
          :style="{
            background: `radial-gradient(${spotlightRadius}px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, 0.15), transparent 70%)`
          }"
        ></div>

        <!-- Particles Container -->
        <div
          v-if="enableStars && !disableAnimations"
          :ref="el => particleContainers[index] = el as HTMLElement"
          class="absolute inset-0 pointer-events-none overflow-hidden"
        ></div>

        <!-- Card Content -->
        <div class="relative z-10 p-6 h-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/70 dark:hover:bg-white/15 hover:border-gray-400/50 dark:hover:border-white/30 shadow-xl hover:shadow-2xl">
          <div class="flex flex-col h-full">
            <div class="mb-2">
              <span class="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                {{ card.label }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-opacity duration-300" :class="{ 'opacity-0': textAutoHide && cardStates[index]?.isHovered }">
              {{ card.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 flex-1 transition-opacity duration-300" :class="{ 'opacity-0': textAutoHide && cardStates[index]?.isHovered }">
              {{ card.description }}
            </p>
          </div>
        </div>

        <!-- Click Ripple Effect -->
        <div
          v-if="clickEffect && cardStates[index]?.ripples"
          class="absolute inset-0 pointer-events-none"
        >
          <div
            v-for="ripple in cardStates[index].ripples"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { computed, nextTick, onMounted, onUnmounted, ref, reactive, watch } from 'vue'

interface BentoCardProps {
  color?: string
  title?: string
  description?: string
  label?: string
}

interface BentoProps {
  textAutoHide?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  particleCount?: number
  enableTilt?: boolean
  glowColor?: string
  clickEffect?: boolean
  enableMagnetism?: boolean
}

interface CardState {
  isHovered: boolean
  glowX: string
  glowY: string
  glowIntensity: number
  ripples: Array<{
    id: number
    x: number
    y: number
    size: number
  }>
}

interface Particle {
  element: HTMLElement
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = '77, 254, 6'
const MOBILE_BREAKPOINT = 768

const props = withDefaults(defineProps<BentoProps>(), {
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  disableAnimations: false,
  spotlightRadius: DEFAULT_SPOTLIGHT_RADIUS,
  particleCount: DEFAULT_PARTICLE_COUNT,
  enableTilt: false,
  glowColor: DEFAULT_GLOW_COLOR,
  clickEffect: true,
  enableMagnetism: true
})

const cardData: BentoCardProps[] = [
  {
    color: '#000C00',
    title: 'Analytics',
    description: 'Track user behavior and gain insights',
    label: 'Insights'
  },
  {
    color: '#000C00',
    title: 'Dashboard',
    description: 'Centralized data view and control',
    label: 'Overview'
  },
  {
    color: '#000C00',
    title: 'Collaboration',
    description: 'Work together seamlessly',
    label: 'Teamwork'
  },
  {
    color: '#000C00',
    title: 'Automation',
    description: 'Streamline your workflows',
    label: 'Efficiency'
  },
  {
    color: '#000C00',
    title: 'Integration',
    description: 'Connect your favorite tools',
    label: 'Connectivity'
  },
  {
    color: '#000C00',
    title: 'Security',
    description: 'Enterprise-grade protection',
    label: 'Protection'
  }
]

const cardRefs = ref<HTMLElement[]>([])
const particleContainers = ref<HTMLElement[]>([])
const cardStates = reactive<Record<number, CardState>>({})
const particles = ref<Record<number, Particle[]>>({})
const animationFrameId = ref<number | null>(null)
const rippleCounter = ref(0)

const isMobile = computed(() => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < MOBILE_BREAKPOINT
})

const shouldDisableAnimations = computed(() => {
  return props.disableAnimations || isMobile.value
})

const createParticle = (container: HTMLElement, x: number, y: number): Particle => {
  const element = document.createElement('div')
  element.className = 'particle'
  element.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${props.glowColor}, 1);
    box-shadow: 0 0 6px rgba(${props.glowColor}, 0.6);
    pointer-events: none;
    z-index: 100;
  `
  
  container.appendChild(element)
  
  return {
    element,
    x,
    y,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 0,
    maxLife: 60 + Math.random() * 60
  }
}

const updateParticles = (cardIndex: number) => {
  const cardParticles = particles.value[cardIndex]
  if (!cardParticles || !cardStates[cardIndex]?.isHovered) return

  cardParticles.forEach((particle, index) => {
    particle.life++
    particle.x += particle.vx
    particle.y += particle.vy
    
    const opacity = 1 - (particle.life / particle.maxLife)
    particle.element.style.left = particle.x + 'px'
    particle.element.style.top = particle.y + 'px'
    particle.element.style.opacity = opacity.toString()
    
    if (particle.life >= particle.maxLife) {
      particle.element.remove()
      cardParticles.splice(index, 1)
    }
  })
}

const animateParticles = () => {
  Object.keys(particles.value).forEach(key => {
    const cardIndex = parseInt(key)
    updateParticles(cardIndex)
  })
  
  animationFrameId.value = requestAnimationFrame(animateParticles)
}

const handleMouseMove = (event: MouseEvent, cardIndex: number) => {
  const card = cardRefs.value[cardIndex]
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const relativeX = (x / rect.width) * 100
  const relativeY = (y / rect.height) * 100

  if (!cardStates[cardIndex]) {
    cardStates[cardIndex] = {
      isHovered: true,
      glowX: `${relativeX}%`,
      glowY: `${relativeY}%`,
      glowIntensity: 1,
      ripples: []
    }
  } else {
    cardStates[cardIndex].isHovered = true
    cardStates[cardIndex].glowX = `${relativeX}%`
    cardStates[cardIndex].glowY = `${relativeY}%`
    cardStates[cardIndex].glowIntensity = 1
  }

  // Tilt effect
  if (props.enableTilt && !shouldDisableAnimations.value) {
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / centerY * -10
    const rotateY = (x - centerX) / centerX * 10
    
    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  // Magnetism effect
  if (props.enableMagnetism && !shouldDisableAnimations.value) {
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const deltaX = (x - centerX) * 0.1
    const deltaY = (y - centerY) * 0.1
    
    gsap.to(card, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  // Create particles
  if (props.enableStars && !shouldDisableAnimations.value) {
    const container = particleContainers.value[cardIndex]
    if (container && Math.random() < 0.3) {
      if (!particles.value[cardIndex]) {
        particles.value[cardIndex] = []
      }
      
      if (particles.value[cardIndex].length < props.particleCount) {
        const particle = createParticle(container, x, y)
        particles.value[cardIndex].push(particle)
      }
    }
  }
}

const handleMouseLeave = (cardIndex: number) => {
  if (cardStates[cardIndex]) {
    cardStates[cardIndex].isHovered = false
    cardStates[cardIndex].glowIntensity = 0
  }

  const card = cardRefs.value[cardIndex]
  if (card) {
    // Reset tilt and magnetism
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  // Clear particles
  if (particles.value[cardIndex]) {
    particles.value[cardIndex].forEach(particle => {
      gsap.to(particle.element, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.element.remove()
        }
      })
    })
    particles.value[cardIndex] = []
  }
}

const handleClick = (event: MouseEvent, cardIndex: number) => {
  if (!props.clickEffect || shouldDisableAnimations.value) return

  const card = cardRefs.value[cardIndex]
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  if (!cardStates[cardIndex]) {
    cardStates[cardIndex] = {
      isHovered: false,
      glowX: '50%',
      glowY: '50%',
      glowIntensity: 0,
      ripples: []
    }
  }

  const rippleId = rippleCounter.value++
  const ripple = {
    id: rippleId,
    x,
    y,
    size: 0
  }

  cardStates[cardIndex].ripples.push(ripple)

  // Animate ripple
  gsap.to(ripple, {
    size: 200,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => {
      const index = cardStates[cardIndex].ripples.findIndex(r => r.id === rippleId)
      if (index > -1) {
        cardStates[cardIndex].ripples.splice(index, 1)
      }
    }
  })
}

// Initialize card states
const initializeCardStates = () => {
  cardData.forEach((_, index) => {
    cardStates[index] = {
      isHovered: false,
      glowX: '50%',
      glowY: '50%',
      glowIntensity: 0,
      ripples: []
    }
  })
}

onMounted(() => {
  initializeCardStates()
  
  if (!shouldDisableAnimations.value) {
    animateParticles()
  }
})

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
  
  // Clean up particles
  Object.values(particles.value).forEach(cardParticles => {
    cardParticles.forEach(particle => {
      particle.element.remove()
    })
  })
})

watch(() => shouldDisableAnimations.value, (newValue) => {
  if (newValue && animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
    animationFrameId.value = null
  } else if (!newValue && !animationFrameId.value) {
    animateParticles()
  }
})
</script>

<style scoped>
.magic-bento-card {
  transform-style: preserve-3d;
}

.particle {
  will-change: transform, opacity;
}

@media (max-width: 768px) {
  .magic-bento-card {
    transform: none !important;
  }
}
</style>