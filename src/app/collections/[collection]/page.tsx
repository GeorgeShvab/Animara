import Section from '@/components/Section'
import { FC } from 'react'
import AnimeGrid from '@/components/AnimeGrid/AnimeGrid'
import Pagination from '@/components/Pagination/Pagination'
import Collection from '@/components/Collection/Collection'
import GenreService from '@/services/genre'
import { validateFormat, validatePage, validateSort, validateStatus } from '@/utils/validation'
import AnimeService from '@/services/anime'
import CancelFilters from '@/components/Filters/CancelFilters'
import FormatFilter from '@/components/Filters/Format'
import StatusFilter from '@/components/Filters/Status'
import Sorting from '@/components/Sorting'
import { Metadata } from 'next'

interface PageProps {
  searchParams: {
    format: string
    page: string
    sort: string
    status: string
  }
  params: { collection: string }
}

const Page: FC<PageProps> = async ({ searchParams, params }) => {
  const collectionId = decodeURIComponent(params.collection)

  const sort = validateSort(searchParams.sort)
  const format = validateFormat(searchParams.format)
  const page = validatePage(searchParams.page)
  const status = validateStatus(searchParams.status)

  const genrePromise = GenreService.getById(collectionId)

  const dataPromise = AnimeService.get({
    sortOrder: sort === 'alphabet' ? 'asc' : 'desc',
    genre: collectionId,
    status,
    format,
    sort,
  })

  const genresPromise = GenreService.getByIds(['romance', 'action', 'fantasy', 'music'])

  const [genre, data, genres] = await Promise.all([genrePromise, dataPromise, genresPromise])

  return (
    <main className="pt-header bg-black">
      <Section
        className="!pb-0 !pt-6 md:!pt-8"
        header={
          <div className="mb-6 md:mb-9">
            <div className="flex justify-between w-full items-center flex-col md:flex-row gap-3 md:gap-3 mb-3">
              <div className="flex md:block justify-between items-center w-full">
                <h2 className="text-xl md:text-2xl font-bold text-white">{genre?.title}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 !items-start md:!items-center w-full md:w-auto flex-[0_0_auto]">
                <FormatFilter />
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

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const data = await GenreService.getById(params.collection)
  let ogImage = data?.image || '/og.png'

  if (!data) {
    return {
      title: 'Not Found',
      description: 'This page does not exist.',
      themeColor: '#0c0c0c',
      openGraph: {
        images: [ogImage],
        title: 'Not Found',
        description: 'This page does not exist.',
        type: 'website',
        url: `/collections/${params.collection}`,
      },
      twitter: {
        images: [ogImage],
        title: 'Not Found',
        description: 'This page does not exist.',
        card: 'summary_large_image',
        site: '@Zhorrrro',
      },
    }
  }

  return {
    title: data.title,
    description: `Explore hundres of anime of ${data.title} genre.`,
    themeColor: '#0c0c0c',
    openGraph: {
      images: [ogImage],
      title: data.title,
      description: `Explore hundres of anime of ${data.title} genre.`,
      type: 'website',
      url: `/collections/${data.id}`,
    },
    twitter: {
      images: [ogImage],
      title: data.title,
      description: `Explore hundres of anime of ${data.title} genre.`,
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export default Page
