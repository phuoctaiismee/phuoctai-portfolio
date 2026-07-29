import ArticlesScreen from '@/features/articles'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles, insights, and thoughts on software engineering, cloud systems, and web development.',
  openGraph: {
    title: 'Articles',
    description: 'Articles, insights, and thoughts on software engineering, cloud systems, and web development.',
  },
}

export default function ArticlesPage() {
  return <ArticlesScreen />
}
