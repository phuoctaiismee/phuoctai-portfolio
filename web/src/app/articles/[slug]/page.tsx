import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/live'
import { POST_QUERY, RELATED_POSTS_QUERY } from '@/lib/sanity/queries'
import { PostData } from '@/core/entities'
import ArticleDetailScreen from '@/features/articles/detail'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = (await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })) as { data: PostData | null }

  if (!post) return {}

  return {
    title: `${post.title} | PhuocTai Articles`,
    description: post.title,
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const [postResult, relatedResult] = await Promise.all([
    sanityFetch({ query: POST_QUERY, params: { slug } }),
    sanityFetch({ query: RELATED_POSTS_QUERY, params: { slug, limit: 2 } }),
  ])

  const post = postResult.data as PostData | null
  const relatedPosts = (relatedResult.data || []) as PostData[]

  if (!post) {
    notFound()
  }

  return <ArticleDetailScreen post={post} relatedPosts={relatedPosts} />
}
