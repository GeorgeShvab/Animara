import Section from '@/components/Section'
import Schedule from '@/components/Schedule/Schedule'
import { FC } from 'react'
import getSchedule from '@/api/getSchedule'
import { Metadata } from 'next'

const Page: FC = async () => {
  const data = await getSchedule()

  return (
    <>
      <main className="pt-header bg-black">
        <Section title="Schedule" className="bg-black">
          <Schedule data={data} shortening={false} />
        </Section>
      </main>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Schedule',
  description: 'Welcome on Animara. Explore schedule of currently ongoing anime.',
  themeColor: '#0c0c0c',
  openGraph: {
    images: ['/og.png'],
    title: 'Schedule',
    description: 'Welcome on Animara. Explore schedule of currently ongoing anime.',
    type: 'website',
    url: '/schedule',
  },
  twitter: {
    images: ['/og.png'],
    title: 'Schedule',
    description: 'Welcome on Animara. Explore schedule of currently ongoing anime.',
    card: 'summary_large_image',
    site: '@Zhorrrro',
  },
}

export default Page
