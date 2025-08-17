import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Article } from '@/types'
import { RSSService } from '@/lib/rssService'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetchTime = ref<number | null>(null)
  
  const CACHE_DURATION = 5 * 60 * 1000
  
  const sortedArticles = computed(() => {
    return [...articles.value].sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime()
      const dateB = new Date(b.pubDate).getTime()
      return dateB - dateA
    })
  })
  
  const featuredArticles = computed(() => {
    return sortedArticles.value.slice(0, 3)
  })
  
  const articlesByCategory = computed(() => {
    const categorized: Record<string, Article[]> = {}
    
    articles.value.forEach(article => {
      if (article.categories && article.categories.length > 0) {
        article.categories.forEach(category => {
          if (!categorized[category]) {
            categorized[category] = []
          }
          categorized[category].push(article)
        })
      } else {
        if (!categorized['未分类']) {
          categorized['未分类'] = []
        }
        categorized['未分类'].push(article)
      }
    })
    
    return categorized
  })
  
  const shouldRefetch = computed(() => {
    if (!lastFetchTime.value) return true
    return Date.now() - lastFetchTime.value > CACHE_DURATION
  })
  
  const fetchArticles = async (forceRefresh = false) => {
    if (!forceRefresh && !shouldRefetch.value && articles.value.length > 0) {
      return articles.value
    }
    
    try {
      loading.value = true
      error.value = null
      
      const fetchedArticles = await RSSService.fetchArticles()
      articles.value = fetchedArticles
      lastFetchTime.value = Date.now()
      
      return fetchedArticles
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取文章失败'
      error.value = errorMessage
      console.error('获取文章失败:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const getArticleById = (id: string) => {
    return articles.value.find(article => article.id === id)
  }
  
  const getArticlesByCategory = (category: string) => {
    return articles.value.filter(article => 
      article.categories?.includes(category)
    )
  }
  
  const searchArticles = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return articles.value.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.description.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery)
    )
  }
  
  const clearError = () => {
    error.value = null
  }
  
  const refreshArticles = () => {
    return fetchArticles(true)
  }
  
  return {
    articles: sortedArticles,
    loading,
    error,
    lastFetchTime,
    featuredArticles,
    articlesByCategory,
    shouldRefetch,
    fetchArticles,
    getArticleById,
    getArticlesByCategory,
    searchArticles,
    clearError,
    refreshArticles
  }
})