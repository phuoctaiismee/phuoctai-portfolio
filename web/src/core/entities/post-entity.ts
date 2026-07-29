export interface PostData {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  mainImage?: {
    asset?: {
      _id: string
      url: string
      metadata?: {
        lqip?: string
        dimensions?: { width: number; height: number }
      }
    }
    alt?: string
  }
  author?: {
    name: string
    image?: {
      asset?: {
        _id: string
        url: string
      }
    }
  }
  body?: any[]
}
