<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          关于我
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          了解更多关于我的背景、经历和热情
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Profile Image -->
          <div class="lg:col-span-1">
            <div class="sticky top-8">
              <Card variant="glass" padding="lg" class="text-center">
                <div class="mb-6">
                  <img
                    :src="personalStore.avatar"
                    :alt="personalStore.fullName"
                    class="w-48 h-48 rounded-full mx-auto object-cover mb-4"
                  />
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {{ personalStore.fullName }}
                  </h2>
                  <p class="text-lg text-blue-600 dark:text-blue-400 mb-4">
                    {{ personalStore.info.title }}
                  </p>
                  <div class="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-6">
                    <MapPin class="w-4 h-4 mr-2" />
                    {{ personalStore.info.location }}
                  </div>
                </div>
                
                <div class="space-y-4">
                  <a
                    :href="`mailto:${personalStore.contactEmail}`"
                    class="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Mail class="w-4 h-4 mr-2" />
                    发送邮件
                  </a>
                  
                  <div class="flex justify-center space-x-4">
                    <a
                      v-for="link in personalStore.socialLinks"
                      :key="link.platform"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      :aria-label="link.platform"
                    >
                      <component :is="getIcon(link.icon)" class="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <!-- Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Bio Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">关于我</h3>
              <div class="prose prose-lg text-gray-600 dark:text-gray-300 max-w-none">
                <p class="mb-4">
                  {{ personalStore.info.bio }}
                </p>
                <p class="mb-4">
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
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">工作经历</h3>
              <div class="space-y-8">
                <div v-for="(experience, index) in experiences" :key="index" class="relative">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Briefcase class="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div class="ml-6">
                      <Card variant="bordered" padding="lg" class="w-full">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ experience.position }}</h4>
                          <span class="text-sm text-blue-600 dark:text-blue-400 font-medium">{{ experience.period }}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 font-medium mb-2">{{ experience.company }}</p>
                        <p class="text-gray-500 dark:text-gray-400">{{ experience.description }}</p>
                      </Card>
                    </div>
                  </div>
                  <div v-if="index < experiences.length - 1" class="absolute left-5 top-10 w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            </div>
            
            <!-- Education -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">教育背景</h3>
              <Card variant="glass" padding="lg">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <GraduationCap class="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">计算机科学与技术</h4>
                    <p class="text-gray-600 dark:text-gray-300 mb-2">2018-2022</p>
                    <p class="text-gray-500 dark:text-gray-400">
                      大学四年学了不少理论知识，但真正有用的还是自己课外折腾的那些项目。
                      印象最深的是第一次用JavaScript做出一个能跑的网页，那种成就感至今难忘。
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            <!-- Interests -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">兴趣爱好</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card
                  v-for="interest in interests"
                  :key="interest.name"
                  variant="bordered"
                  padding="md"
                  hover
                  class="text-center"
                >
                  <component :is="interest.icon" class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ interest.name }}</h4>
                </Card>
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