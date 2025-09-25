import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import ArticlesView from '@/pages/ArticlesView.vue'
import PortfolioView from '@/pages/PortfolioView.vue'
import SitesView from '@/pages/SitesView.vue'
import FriendsView from '@/pages/FriendsView.vue'
import SponsorView from '@/pages/SponsorView.vue'
import CircleView from '@/pages/CircleView.vue'
import MomentView from '@/pages/MomentView.vue'

// 定义路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: '关于我'
    }
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticlesView,
    meta: {
      title: '文章'
    }
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsView,
    meta: {
      title: '友链'
    }
  },
  {
    path: '/circle',
    name: 'friendscircle',
    component: CircleView,
    meta: {
      title: '鱼塘'
    }
  },
  {
    path: '/moment',
    name: 'moment',
    component: MomentView,
    meta: {
      title: '动态'
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView,
    meta: {
      title: '项目作品'
    }
  },
  {
    path: '/sites',
    name: 'sites',
    component: SitesView,
    meta: {
      title: '我的网站'
    }
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: SponsorView,
    meta: {
      title: '赞助支持'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: HomeView,
    meta: {
      title: '首页'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
