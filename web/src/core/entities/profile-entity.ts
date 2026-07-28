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
    category: string
    skills: string[]
  }>
}


