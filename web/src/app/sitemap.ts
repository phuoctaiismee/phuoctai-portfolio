import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { SITEMAP_QUERY } from '@/lib/sanity/queries'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

// Static routes that are always included in the sitemap
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
  },
  {
    url: `${siteUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/works`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${siteUrl}/articles`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${siteUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all dynamic slugs from Sanity bypassing CDN for freshness
    const dynamicPages = await client
      .withConfig({ useCdn: false, stega: false })
      .fetch<Array<{ _type: string; slug: string; _updatedAt: string }>>(SITEMAP_QUERY)

    const dynamicRoutes: MetadataRoute.Sitemap = (dynamicPages ?? []).map((page) => {
      const basePath = page._type === 'work' ? '/works' : '/articles'
      return {
        url: `${siteUrl}${basePath}/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: page._type === 'work' ? 'monthly' : 'weekly',
        priority: page._type === 'work' ? 0.9 : 0.7,
      }
    })

    return [...staticRoutes, ...dynamicRoutes]
  } catch (error) {
    console.error('[sitemap] Failed to generate dynamic routes:', error)
    // Fall back to static routes only on error
    return staticRoutes
  }
}
