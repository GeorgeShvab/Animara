import { FC } from 'react'
import Section from '@/components/Section'
import AnimeGrid from '@/components/AnimeGrid/AnimeGrid'
import Collection from '@/components/Collection/Collection'
import Pagination from '@/components/Pagination/Pagination'
import SearchBar from './SearchBar'
import AnimeService from '@/services/anime'
import { validateFormat, validatePage, validateSort, validateSortOrder, validateStatus } from '@/utils/validation'
import CancelFilters from '@/components/Filters/CancelFilters'
import FormatFilter from '@/components/Filters/Format'
import GenreFilter from '@/components/Filters/Genre'
import StatusFilter from '@/components/Filters/Status'
import Sorting from '@/components/Sorting'
import { Metadata } from 'next'
import NotFound from './NotFound'
import Empty from './Empty'
import GenreService from '@/services/genre'

interface PageProps {
  searchParams: {
    query: string
    page: string
    format: string
    sort: string
    genre: string
    sortOrder: string
    status: string
  }
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const query = searchParams.query
  const genre = searchParams.genre
  const status = validateStatus(searchParams.status)
  const sortOrder = validateSortOrder(searchParams.sort)
  const sort = validateSort(searchParams.sort)
  const format = validateFormat(searchParams.format)
  const page = validatePage(searchParams.page)

  const { data, count } = await AnimeService.search({
    sortOrder: sort === 'alphabet' ? 'asc' : 'desc',
    query: query,
    genre: genre,
    sort: sort,
    status,
    format,
    page,
  })

  const genres = await GenreService.getByIds(['romance', 'action', 'fantasy', 'music'])

  return (
    <main className="pt-header bg-black">
      <Section
        className={`!pt-6 md:!pt-8`}
        header={
          <div className={`px-0 mb-6 md:mb-9 !px-0`}>
            <div className="flex justify-between items-center flex-col md:flex-row gap-2 md:gap-3 !items-start md:!items-center mb-3">
              <div className="flex md:block justify-between items-center w-full">
                <h2 className="text-xl md:text-2xl font-bold text-white">Search</h2>
              </div>
              <div className="block md:hidden w-full">
                <SearchBar defaultValue={query} />
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 !items-start md:!items-center w-full md:w-auto flex-[0_0_auto]">
                <FormatFilter />
                <GenreFilter />
                <StatusFilter />
                <CancelFilters />
              </div>
            </div>
            <div className="hidden md:block mb-3">
              <SearchBar defaultValue={query} />
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-theme text-sm">
                Total Anime: <span className="text-white">{count}</span>
              </p>
              <div className="flex gap-4 items-center">
                <p className="font-bold text-theme text-sm">Sort By:</p>
                <Sorting />
              </div>
            </div>
          </div>
        }
      >
        {data.length ? (
          <AnimeGrid data={data} />
        ) : query ? (
          <div className="py-10">
            <NotFound query={query} />
          </div>
        ) : (
          <div className="py-10">
            <Empty />
          </div>
        )}
      </Section>
      {query && data.length ? (
        <Section className="!pt-0">
          <div className="container">
            <Pagination page={page} pages={Math.ceil(count / 50)} />
          </div>
        </Section>
      ) : null}
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

export const generateMetadata = async ({ searchParams }: PageProps): Promise<Metadata> => {
  let ogImage = '/og.png'

  return {
    title: `Results for ${searchParams.query}`,
    description: `Find anime among thousands of available anime through a powerful search.`,
    themeColor: '#0c0c0c',
    openGraph: {
      images: [ogImage],
      title: `Results for ${searchParams.query}`,
      description: `Find anime among thousands of available anime through a powerful search.`,
      type: 'website',
      url: `/search?query=${searchParams.query}`,
    },
    twitter: {
      images: [ogImage],
      title: `Results for ${searchParams.query}`,
      description: `Find anime among thousands of available anime through a powerful search.`,
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export default Page
