import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type SanityDocument, type PortableTextComponents } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity/live'
import { POST_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

// Custom Portable Text components for rich text styling
const pteComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-extrabold mt-8 mb-4 text-zinc-900 dark:text-zinc-50">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-50">{children}</h2>,
    normal: ({ children }) => <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 text-lg">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-6 bg-zinc-100 dark:bg-zinc-900 py-2 rounded-r-lg">{children}</blockquote>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset ? urlFor(value).width(800).url() : null
      if (!imageUrl) return null
      return (
        <figure className="my-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <img src={imageUrl} alt={value.alt || ''} className="w-full h-auto object-cover" />
          {value.caption && (
            <figcaption className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200/50 dark:border-zinc-800/50">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a href={value.href} target={target} rel={rel} className="underline text-indigo-500 hover:text-indigo-600 transition-colors">
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">{children}</ol>,
  },
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = (await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })) as { data: SanityDocument | null }

  if (!post) {
    notFound()
  }

  const imageUrl = post.mainImage?.asset?.url
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'Draft'

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-24">
      {/* Navigation */}
      <nav className="max-w-4xl mx-auto px-6 py-6 flex items-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 transition-colors gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to list
        </Link>
      </nav>

      {/* Main post container */}
      <article className="max-w-4xl mx-auto px-6">
        <header className="mb-10 text-center sm:text-left">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-500 block mb-3">
            {formattedDate}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-tight text-zinc-900 dark:text-white">
            {post.title}
          </h1>

          {/* Author Details */}
          <div className="flex items-center justify-center sm:justify-start gap-4 py-4 border-y border-zinc-200/60 dark:border-zinc-800/60">
            {post.author?.image?.asset?.url && (
              <img
                src={urlFor(post.author.image).width(100).height(100).url()}
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
              />
            )}
            <div>
              <span className="text-sm font-bold block text-zinc-950 dark:text-white">
                {post.author?.name || 'Anonymous'}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Author
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-2xl mb-12 shadow-md border border-zinc-200/50 dark:border-zinc-800/50">
            <img src={imageUrl} alt={post.mainImage?.alt || post.title} className="object-cover w-full h-full" />
          </div>
        )}

        {/* Content body */}
        <div className="max-w-3xl mx-auto">
          {Array.isArray(post.body) ? (
            <PortableText value={post.body} components={pteComponents} />
          ) : (
            <p className="text-zinc-500 italic text-center">No content in this post yet.</p>
          )}
        </div>
      </article>
    </div>
  )
}
