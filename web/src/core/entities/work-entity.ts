export interface WorkItem {
  _id: string
  title: string
  slug: string
  coverImage?: any
  industry?: string
  year: number
}

export interface CaseStudyDetail {
  _id: string
  title: string
  slug: string
  coverImage?: any
  industry: string
  client?: string
  year: number
  experience?: string
  liveLink?: string
  githubLink?: string
  skills?: string[]
  aboutRichText: any[] // PortableText
  aboutGallery?: any[] // Images
  challengeRichText?: any[] // PortableText
  challengeGallery?: any[]
  resultRichText?: any[] // PortableText
  resultGallery?: any[]
  testimonialQuote?: string
  testimonialAuthorName?: string
  testimonialAuthorRole?: string
  testimonialAuthorAvatar?: any
}

// Alias for compatibility if needed elsewhere
export type WorkData = WorkItem
