import { type Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/live'
import { ALL_WORKS_QUERY } from '@/lib/sanity/queries'
import { WorkItem } from '@/core/entities'
import WorksGrid from '@/features/works/components/works_grid'
import Heading from '@/components/ui/heading'
import Bounded from '@/components/layout/bounded'

export const metadata: Metadata = {
  title: 'Works | PhuocTai Portfolio',
  description: "Explore PhuocTai's software engineering projects, from web apps to full-stack solutions.",
}

export default async function WorksPage() {
  const result = await sanityFetch({ query: ALL_WORKS_QUERY })
  const works = (result.data || []) as WorkItem[]

  return (
    <div className="bg-white">
      <Bounded paddingY="pt-[120px] pb-[100px]">
        {/* Works Page Header */}
        <div className="mb-[60px]">
          <Heading tag="h1" animateEntrance={true} className="text-left text-black">
            WORK
          </Heading>
        </div>

        {/* Grid container */}
        <WorksGrid initialWorks={works} />
      </Bounded>
    </div>
  )
}
