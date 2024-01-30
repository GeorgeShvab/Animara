import Section from '@/components/Section'
import { FC } from 'react'
import AnimeGrid from '@/components/AnimeGrid/AnimeGrid'
import Pagination from '@/components/Pagination/Pagination'
import AnimeService from '@/services/anime'
import { validatePage, validateSort, validateStatus } from '@/utils/validation'
import Collection from '@/components/Collection/Collection'
import CancelFilters from '@/components/Filters/CancelFilters'
import GenreFilter from '@/components/Filters/Genre'
import StatusFilter from '@/components/Filters/Status'
import Sorting from '@/components/Sorting'
import { Metadata } from 'next'
import GenreService from '@/services/genre'

interface PageProps {
  searchParams: {
    page: string
    sort: string
    genre: string
    status: string
  }
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const genre = searchParams.genre
  const status = validateStatus(searchParams.status)
  const sort = validateSort(searchParams.sort)
  const page = validatePage(searchParams.page)

  const dataPromise = AnimeService.get({
    sortOrder: sort === 'alphabet' ? 'asc' : 'desc',
    format: 'series',
    page,
    sort,
    genre,
    status,
  })

  const genresPromise = GenreService.getByIds(['romance', 'action', 'fantasy', 'music'])

  const [data, genres] = await Promise.all([dataPromise, genresPromise])

  return (
    <main className="pt-header bg-black">
      <Section
        className="!pb-0 !pt-6 md:!pt-8"
        header={
          <div className="px-0 mb-8 md:mb-9 !px-0">
            <div className="flex justify-between w-full items-center flex-col md:flex-row gap-3 mb-3">
              <div className="flex md:block justify-between items-center w-full">
                <h2 className="text-xl md:text-2xl font-bold text-white">TV Series</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 !items-start md:!items-center w-full md:w-auto flex-[0_0_auto]">
                <GenreFilter />
                <StatusFilter />
                <CancelFilters />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-theme text-sm">
                Total Anime: <span className="text-white">{data.count}</span>
              </p>
              <div className="flex gap-4 items-center">
                <p className="font-bold text-theme text-sm">Sort By:</p>
                <Sorting />
              </div>
            </div>
          </div>
        }
      >
        <AnimeGrid data={data.data} />
      </Section>
      <Section>
        <div className="container">
          <Pagination page={page} pages={Math.ceil(data.count / 50)} />
        </div>
      </Section>
      <Section className="!pt-0" title="Explore Collections" button="SEE MORE" buttonProps={{ href: '/collections' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {genres.map((item) => (
            <Collection key={item.id} {...item} />
          ))}
        </div>
      </Section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'TV Series',
  description: 'Welcome on Animara. Explore hundreds the most popular anime series on a single page.',
  themeColor: '#0c0c0c',
  openGraph: {
    images: ['/og.png'],
    title: 'TV Series',
    description: 'Welcome on Animara. Explore hundreds the most popular anime series on a single page.',
    type: 'website',
    url: '/series',
  },
  twitter: {
    images: ['/og.png'],
    title: 'TV Series',
    description: 'Welcome on Animara. Explore hundreds the most popular anime series on a single page.',
    card: 'summary_large_image',
    site: '@Zhorrrro',
  },
}

export default Page
