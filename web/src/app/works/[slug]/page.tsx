import WorkDetailPage from '@/features/work-detail'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { stegaClean } from 'next-sanity'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Disable stega and fetch only published content for static parameter generation
  const works = await client
    .withConfig({ stega: false, perspective: 'published' })
    .fetch<Array<{ slug: string }>>(`*[_type == "work" && defined(slug.current)] { "slug": slug.current }`)

  return works.map((work) => ({
    slug: work.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cleanSlug = stegaClean(slug)

  // Disable stega for SEO metadata fetches to avoid injection characters leaking into page source
  const work = await client
    .withConfig({ stega: false })
    .fetch<any>(
      `*[_type == "work" && slug.current == $slug][0] {
        title,
        industry,
        client,
        year,
        "coverImageUrl": coverImage.asset->url
      }`,
      { slug: cleanSlug }
    )

  if (!work) {
    return {
      title: "Work Not Found",
    }
  }

  const title = `${work.title} | Case Study`
  const description = `Read the case study for ${work.client || work.title} in the ${work.industry || 'engineering'} industry. Executed by Phuoc Tai, Software Engineer.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Phuoc Tai Portfolio`,
      description,
      type: 'article',
      images: work.coverImageUrl ? [{ url: work.coverImageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Phuoc Tai Portfolio`,
      description,
      images: work.coverImageUrl ? [work.coverImageUrl] : [],
    },
  }
}

export default WorkDetailPage
