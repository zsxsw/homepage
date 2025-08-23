import type { Article, RSSFeed } from '@/types'

export class RSSService {
  private static readonly RSS_URL = 'https://api.fis.ink/fishcpy/v1/fishcpyblog-rss'

  static async fetchArticles(): Promise<Article[]> {
    try {
      const response = await fetch(`${(this.RSS_URL)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const xmlText = await response.text()
      return this.parseRSSXML(xmlText)
    } catch (error) {
      console.error('获取RSS文章失败:', error)
      return []
    }
  }

  private static parseRSSXML(xmlText: string): Article[] {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
      
      const items = xmlDoc.querySelectorAll('item')
      const articles: Article[] = []

      items.forEach((item, index) => {
        const title = item.querySelector('title')?.textContent || ''
        const description = item.querySelector('description')?.textContent || ''
        const link = item.querySelector('link')?.textContent || ''
        const pubDate = item.querySelector('pubDate')?.textContent || ''
        const author = item.querySelector('author')?.textContent || ''
        
        const categories: string[] = []
        const categoryElements = item.querySelectorAll('category')
        categoryElements.forEach(cat => {
          const categoryText = cat.textContent
          if (categoryText) {
            categories.push(categoryText)
          }
        })

        articles.push({
          id: `article-${index + 1}`,
          title: this.cleanText(title),
          description: this.cleanText(description),
          content: this.cleanText(description),
          link,
          pubDate,
          author,
          categories
        })
      })

      return articles
    } catch (error) {
      console.error('解析RSS XML失败:', error)
      return []
    }
  }

  private static cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim()
  }

  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }
}