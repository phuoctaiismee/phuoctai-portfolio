import { sanityFetch } from '@/lib/sanity/live'
import { POSTS_QUERY } from '@/lib/sanity/queries'
import { PostData } from '@/core/entities'
import Bounded from '@/components/layout/bounded'
import Heading from '@/components/ui/heading'
import Link from 'next/link'
import Image from 'next/image'
import * as motion from 'framer-motion/client'
import SectionHeader from '@/components/ui/section-header'

export default async function ArticlesScreen() {
  const postsResult = await sanityFetch({ query: POSTS_QUERY })
  const posts = (postsResult.data || []) as PostData[]

  return (
    <div className="bg-white">
      <Bounded paddingY="pt-[120px] pb-[100px]">
        {/* Page Header */}
        <div className="mb-[60px] flex flex-col">
          <Heading tag="h1" animateEntrance={true} className="text-left text-black">
            Read
          </Heading>
          <Heading tag="h1" animateEntrance={true} delay={0.15} className="text-left leading-normal -mt-12 text-black">
            Articles
          </Heading>
        </div>

        <div className="flex flex-col gap-[30px]">
          <SectionHeader title="recent articles." />
          {posts.length === 0 ? (
            <div className="py-[100px] text-center border border-dashed border-[#E5E5E5]">
              <p className="text-lg text-black/50 font-medium">
                No articles found yet. Write some posts in Sanity Studio!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {posts.map((post, idx) => {
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                  : 'Draft'

                const imageUrl = post.mainImage?.asset?.url

                return (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                    className="group flex flex-col gap-4"
                  >
                    <Link
                      href={`/articles/${post.slug.current}`}
                      className="block relative aspect-[16/9] w-full overflow-hidden bg-[#F5F5F5]"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={post.mainImage?.alt || post.title}
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

                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase font-bold tracking-wider text-black/40">
                        {formattedDate}
                      </span>
                      <Link
                        href={`/articles/${post.slug.current}`}
                        className="group-hover:opacity-75 transition-opacity duration-300"
                      >
                        <h2 className="text-xl md:text-2xl font-bold text-black tracking-tighter leading-snug">
                          {post.title}
                        </h2>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </Bounded>
    </div>
  )
}
