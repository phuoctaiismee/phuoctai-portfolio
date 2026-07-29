import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity/live'
import { POST_QUERY, RELATED_POSTS_QUERY } from '@/lib/sanity/queries'
import { PostData } from '@/core/entities'
import ArticleDetailScreen from '@/features/articles/detail'
import { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { stegaClean } from 'next-sanity'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await client
    .withConfig({ stega: false, perspective: 'published' })
    .fetch<Array<{ slug: string }>>(
      `*[_type == "post" && defined(slug.current)] { "slug": slug.current }`
    )
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cleanSlug = stegaClean(slug)

  // Disable stega for SEO metadata to avoid invisible characters leaking into <head>
  const post = await client
    .withConfig({ stega: false })
    .fetch<any>(
      `*[_type == "post" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        publishedAt,
        mainImage {
          asset->{ url }
        },
        author->{ name }
      }`,
      { slug: cleanSlug }
    )

  if (!post) return {}

  const title = `${post.title} | Article`
  const description = `Read "${post.title}"${post.author?.name ? ` by ${post.author.name}` : ''} — insights on software engineering and web development.`
  const imageUrl = post.mainImage?.asset?.url

  return {
    title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
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
