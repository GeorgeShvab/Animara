import Section from '@/components/Section'
import { FC } from 'react'
import Collection from '@/components/Collection/Collection'
import GenreService from '@/services/genre'
import { validateFormat, validatePage } from '@/utils/validation'
import Pagination from '@/components/Pagination/Pagination'
import AnimeFormatSelection from '@/components/AnimeFormatSelection'
import { Metadata } from 'next'

interface PageProps {
  searchParams: {
    format: string
    page?: string
  }
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const page = validatePage(searchParams.page)
  const format = validateFormat(searchParams.format)

  const { data, count } = await GenreService.get({ format, page })

  return (
    <main className="pt-header bg-black">
      <Section
        className="!pt-6 md:!pt-8 !pb-0"
        headerProps={{
          className: 'flex-col md:flex-row gap-3 md:gap-4 !px-0 !items-start md:!items-center !mb-6 md:mb-9',
        }}
        title={
          <div className="flex md:block justify-between items-center w-full">
            <h2 className="text-xl md:text-2xl font-bold text-white">Collections</h2>
            <p className="font-bold text-theme text-sm">
              Total Collections: <span className="text-white">{count}</span>
            </p>
          </div>
        }
        button={<AnimeFormatSelection format={format} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {data.map((item) => (
            <Collection key={item.id} {...item} />
          ))}
        </div>
      </Section>
      <Section>
        <Pagination page={page} pages={Math.ceil(count / 20)} />
      </Section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Anime Collections',
  description: 'Welcome on Animara. Explore hundreds of anime collections on a single page.',
  themeColor: '#0c0c0c',
  openGraph: {
    images: ['/og.png'],
    title: 'Anime Collections',
    description: 'Welcome on Animara. Explore hundreds of anime collections on a single page.',
    type: 'website',
    url: '/collections',
  },
  twitter: {
    images: ['/og.png'],
    title: 'Anime Collections',
    description: 'Welcome on Animara. Explore hundreds of anime collections on a single page.',
    card: 'summary_large_image',
    site: '@Zhorrrro',
  },
}

export default Page
