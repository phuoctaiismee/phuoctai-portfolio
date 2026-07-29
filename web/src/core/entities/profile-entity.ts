export interface ServiceItem {
  _key?: string
  name: string
  image: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ProfileData {
  _id: string
  firstName: string
  lastName: string
  displayName: string
  headline: string
  email: string
  avatarUrl?: string
  cvUrl?: string
  shortBio: string
  longBio?: any[] // PortableText blocks
  aboutStatement?: string
  aboutImageUrl?: string
  aboutDescription?: string
  skillsGroups?: Array<{
    _key?: string
    category: string
    skills: string[]
  }>
  services?: ServiceItem[]
  faqs?: FaqItem[]
}


