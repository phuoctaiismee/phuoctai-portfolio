import Link from 'next/link'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/lib/sanity/image'
import Bounded from '@/components/layout/bounded'
import Heading from '@/components/ui/heading'
import Image from 'next/image'
import * as motion from 'framer-motion/client'
import { PostData } from '@/core/entities'
import Button from '@/components/ui/button'

const pteComponents: PortableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg lg:text-xl font-medium text-black leading-relaxed tracking-tighter mb-6 text-justify">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-3xl lg:text-4xl font-bold text-black mt-8 mb-4 tracking-tighter">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl lg:text-3xl font-bold text-black mt-6 mb-3 tracking-tighter">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl lg:text-2xl font-semibold text-black mt-4 mb-2 tracking-tighter">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg lg:text-xl font-semibold text-black mt-3 mb-2 tracking-tighter">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-black pl-4 italic my-6 text-gray-700 bg-[#F5F5F5] py-4 pr-4">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset ? urlFor(value).width(800).url() : null
      if (!imageUrl) return null
      return (
        <figure className="my-8 overflow-hidden bg-[#F5F5F5]">
          <div className="relative aspect-[16/9] w-full">
            <Image src={imageUrl} alt={value.alt || ''} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-xs uppercase font-semibold text-black/50 text-center py-2 bg-[#F5F5F5]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-black">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-[#F5F5F5] text-black px-1.5 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-black underline underline-offset-4 hover:opacity-75 transition-opacity font-semibold"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg lg:text-xl font-medium text-black leading-relaxed tracking-tighter text-justify">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg lg:text-xl font-medium text-black leading-relaxed tracking-tighter text-justify">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-lg lg:text-xl font-medium text-black leading-relaxed tracking-tighter">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-lg lg:text-xl font-medium text-black leading-relaxed tracking-tighter">
        {children}
      </li>
    ),
  },
}

export default function ArticleDetailScreen({
  post,
  relatedPosts = [],
}: {
  post: PostData
  relatedPosts?: PostData[]
}) {
  const imageUrl = post.mainImage?.asset?.url
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft'

  return (
    <div className="min-h-screen bg-white pb-24">
      <Bounded paddingY="pt-[120px] pb-[40px]">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-black/50 hover:text-black transition-colors gap-2 animate-none"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </Link>
        </div>

        {/* Article details wrapper */}
        <article className="w-full">
          <header className="mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40 block mb-3 animate-none">
              {formattedDate}
            </span>
            <Heading tag="h2" animateEntrance={true} className="text-black tracking-tighter leading-snug">
              {post.title}
            </Heading>

            {/* Author details */}
            <div className="flex items-center gap-4 py-4 border-y border-[#EAEAEA] mt-8">
              {post.author?.image?.asset?.url && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#EAEAEA]">
                  <Image
                    src={post.author.image.asset.url}
                    alt={post.author.name || 'Author'}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <span className="text-sm font-bold block text-black">
                  {post.author?.name || 'Phuoc Tai'}
                </span>
                <span className="text-xs font-medium text-black/40 uppercase tracking-wider">
                  Author
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[2/1] w-full overflow-hidden mb-12 shadow-sm bg-[#F5F5F5]"
            >
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Body content */}
          <div className="max-w-[800px] mx-auto">
            {Array.isArray(post.body) ? (
              <PortableText value={post.body} components={pteComponents} />
            ) : (
              <p className="text-black/50 italic text-center">No content in this post yet.</p>
            )}
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="flex flex-col w-full gap-[30px] py-16 border-t border-[#EAEAEA] mt-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '100px 0px' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-end justify-between pb-2 border-b border-[#F5F5F5]"
            >
              <h2 className="text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] text-black">
                more to explore.
              </h2>
              <Button href="/articles">Show More</Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {relatedPosts.map((rp, idx) => {
                const rpDate = rp.publishedAt
                  ? new Date(rp.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Draft'
                const rpImageUrl = rp.mainImage?.asset?.url

                return (
                  <motion.div
                    key={rp._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                    className="group flex flex-col gap-4"
                  >
                    <Link
                      href={`/articles/${rp.slug.current}`}
                      className="block relative aspect-[16/9] w-full overflow-hidden bg-[#F5F5F5]"
                    >
                      {rpImageUrl ? (
                        <Image
                          src={rpImageUrl}
                          alt={rp.mainImage?.alt || rp.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black/20 text-sm font-semibold">
                          NO IMAGE
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col gap-2 text-left">
                      <span className="text-xs uppercase font-bold tracking-wider text-black/40">
                        {rpDate}
                      </span>
                      <Link
                        href={`/articles/${rp.slug.current}`}
                        className="group-hover:opacity-75 transition-opacity duration-300"
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-black tracking-tighter leading-snug">
                          {rp.title}
                        </h2>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}
      </Bounded>
    </div>
  )
}
