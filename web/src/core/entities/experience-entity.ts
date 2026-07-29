export interface ExperienceData {
  _id: string
  companyName: string
  role: string
  location?: string
  startDate: string
  currentJob: boolean
  endDate?: string
  description: any[] // PortableText blocks
  techStack?: string[]
}
