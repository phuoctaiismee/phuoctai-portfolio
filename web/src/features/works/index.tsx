import { sanityFetch } from '@/lib/sanity/live'
import { ALL_WORKS_QUERY } from '@/lib/sanity/queries'
import { WorkItem } from '@/core/entities'
import WorksGrid from './components/works_grid'
import Heading from '@/components/ui/heading'
import Bounded from '@/components/layout/bounded'

export default async function WorksScreen() {
  const result = await sanityFetch({ query: ALL_WORKS_QUERY })
  const works = (result.data || []) as WorkItem[]

  return (
    <div className="bg-white">
      <Bounded paddingY="pt-[120px] pb-[100px]">
        {/* Works Page Header */}
        <div className="mb-[60px]">
          <Heading tag="h1" animateEntrance={true} className="text-left text-black">
            Work
          </Heading>
        </div>

        {/* Grid container */}
        <WorksGrid initialWorks={works} />
      </Bounded>
    </div>
  )
}
