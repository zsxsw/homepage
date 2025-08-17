<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-medium text-gray-900 dark:text-white mb-4">
          关于我
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
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
              <div class="text-center">
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
                    class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
                      class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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
            <div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">关于我</h3>
              <div class="text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
                <p>
                  {{ personalStore.info.bio }}
                </p>
                <p>
                  写代码这事儿从大学就开始了，一开始纯粹是因为好奇心。
                  后来发现能用代码解决实际问题还挺有意思的，就一直坚持到现在。
                </p>
                <p>
                  平时除了工作项目，也会自己折腾一些小东西。
                  有时候是为了验证某个想法，有时候纯粹是觉得好玩。
                  代码写多了，发现最有成就感的还是看到自己的作品被人使用。
                </p>
              </div>
            </div>
            
            <!-- Experience Timeline -->
            <div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">工作经历</h3>
              <div class="space-y-6">
                <div v-for="(experience, index) in experiences" :key="index" class="relative">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
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
                  <div v-if="index < experiences.length - 1" class="absolute left-1 top-4 w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
            
            <!-- Education -->
            <div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">教育背景</h3>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
                </div>
                <div class="ml-4">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-1">计算机科学与技术</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">2018-2022</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    大学四年学了不少理论知识，但真正有用的还是自己课外折腾的那些项目。
                    印象最深的是第一次用JavaScript做出一个能跑的网页，那种成就感至今难忘。
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Interests -->
            <div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">兴趣爱好</h3>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="interest in interests"
                  :key="interest.name"
                  class="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                >
                  <component :is="interest.icon" class="w-4 h-4" />
                  <span class="text-sm">{{ interest.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Contact Section -->
            <div>
              <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4">联系我</h3>
              <div class="space-y-3">
                <div class="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail class="w-4 h-4 mr-3" />
                  <a 
                    :href="`mailto:${personalStore.contactEmail}`"
                    class="hover:text-gray-900 dark:hover:text-white"
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
    position: '独立开发者',
    company: '自由工作',
    period: '2022年至今',
    description: '主要做一些Web项目，从前端到后端都自己搞。偶尔接点外包，大部分时间在研究新技术和做自己的项目。'
  },
  {
    position: '前端开发',
    company: '小团队',
    period: '2020-2022',
    description: '在一个小公司做前端，主要用Vue和React。那时候学了不少东西，也踩了不少坑，算是正式入门了。'
  },
  {
    position: '实习生',
    company: '初创公司',
    period: '2019-2020',
    description: '第一份实习，什么都不会，就是跟着师傅学。从HTML/CSS开始，慢慢接触JavaScript，算是编程启蒙。'
  }
]

const interests = [
  { name: '编程', icon: Code },
  { name: '摄影', icon: Camera },
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