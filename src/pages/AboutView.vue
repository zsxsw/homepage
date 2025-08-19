<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-medium text-gray-900 dark:text-white mb-4 animate-fade-in">
          关于我
        </h1>
        <p class="text-gray-600 dark:text-gray-400 animate-fade-in-delay">
          一个喜欢折腾代码的人
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <!-- Profile Image -->
          <div class="lg:col-span-1">
            <div class="sticky top-8">
              <div class="text-center animate-fade-in-up">
                <img
                  :src="personalStore.avatar"
                  :alt="personalStore.fullName"
                  class="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                />
                <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  {{ personalStore.fullName }}
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {{ personalStore.info.title }}
                </p>
                <div class="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                  <MapPin class="w-3 h-3 mr-1" />
                  {{ personalStore.info.location }}
                </div>
                
                <div class="space-y-3">
                  <a
                    :href="`mailto:${personalStore.contactEmail}`"
                    class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <Mail class="w-4 h-4 mr-2" />
                    发邮件
                  </a>
                  
                  <div class="flex justify-center space-x-3">
                    <a
                      v-for="link in personalStore.socialLinks"
                      :key="link.platform"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="social-link text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      :aria-label="link.platform"
                    >
                      <component :is="getIcon(link.icon)" class="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="lg:col-span-3 space-y-12">
            <!-- Bio Section -->
            <div class="animate-fade-in-up">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">关于我</h3>
              <div class="text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
                <p>
                  {{ personalStore.info.bio }}
                </p>
                <p>
                  --占位符--
                </p>
              </div>
            </div>
            
            <!-- Experience Timeline -->
            <div class="animate-fade-in-up">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">站点历程</h3>
              <div class="space-y-6">
                <div v-for="(experience, index) in experiences" :key="index" class="relative timeline-item hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-3 -m-3">
                  <div class="timeline-content">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 timeline-dot"></div>
                      </div>
                    <div class="ml-4">
                      <div class="pb-6">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                          <h4 class="font-medium text-gray-900 dark:text-white">{{ experience.position }}</h4>
                          <span class="text-sm text-gray-500 dark:text-gray-400">{{ experience.period }}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">{{ experience.company }}</p>
                        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ experience.description }}</p>
                      </div>
                    </div>
                    </div>
                    <div v-if="index < experiences.length - 1" class="absolute left-1 top-4 w-px h-6 bg-gray-200 dark:bg-gray-700 timeline-line"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Education -->
            <div class="animate-fade-in-up">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">--2大占位符--</h3>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
                </div>
                <div class="ml-4">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-1">--2.1小占位符--</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">--2.2小占位符--</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    --2.3小占位符--
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Interests -->
            <div class="animate-fade-in-up">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">兴趣爱好</h3>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="interest in interests"
                  :key="interest.name"
                  class="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-default"
                >
                  <component :is="interest.icon" class="w-4 h-4" />
                  <span class="text-sm">{{ interest.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Contact Section -->
            <div class="animate-fade-in-up">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">联系我</h3>
              <div class="space-y-3">
                <div class="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail class="w-4 h-4 mr-3" />
                  <a 
                    :href="`mailto:${personalStore.contactEmail}`"
                    class="hover:text-blue-500 dark:hover:text-blue-400 hover:underline"
                  >
                    {{ personalStore.contactEmail }}
                  </a>
                </div>
                <div class="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin class="w-4 h-4 mr-3" />
                  <span>{{ personalStore.info.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Mail, Briefcase, GraduationCap, Github, Linkedin, Twitter, MessageCircle, Code, Camera, Music, Gamepad2 } from 'lucide-vue-next'
import { usePersonalStore } from '@/stores/personal'
import Card from '@/components/ui/Card.vue'

const personalStore = usePersonalStore()

const experiences = [
  {
    position: '使用vue3和AI开发新主页',
    company: '看不见我---',
    period: '2025.8',
    description: '就是本站啦。'
  },
  {
    position: '给ink备案啦',
    company: '7.29提交的管理局，8.7号终于通过了',
    period: '2025-8',
    description: '大陆CDN，启动！'
  },
  {
    position: '注册第一个ink',
    company: 'ink有好多3位域名哎，',
    period: '2025-6',
    description: '果断注册fis.ink，续费还可以'
  },
  {
    position: '注册第一个top',
    company: 'cn居然隐私保护要花钱！',
    period: '2025-3',
    description: '注册top并迁移大量服务到top，cn不续了！'
  },
  {
    position: '注册第一个正式意义上的域名',
    company: '注册了一个cn，',
    period: '2024-11',
    description: '好开心。'
  },
  {
    position: '第一个域名',
    company: '跟着技术爬爬虾注册了第一个域名,',
    period: '2024.7',
    description: '是cloudns.be的子域，并注册cloudflare账号'
  }
]

const interests = [
  { name: '编程', icon: Code },
  { name: '音乐', icon: Music },
  { name: '游戏', icon: Gamepad2 }
]

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  'message-circle': MessageCircle
}

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || MessageCircle
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.6s ease-out 0.2s both;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.timeline-item {
  animation: fadeInUp 0.6s ease-out;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }



.timeline-line {
  animation: drawLine 0.8s ease-out;
  transform-origin: top;
}

@keyframes drawLine {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}






</style>