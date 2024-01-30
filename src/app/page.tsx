import Collection from '@/components/Collection/Collection'
import AnimeCard from '@/components/AnimeCard/AnimeCard'
import AnimeCarousel from '@/components/AnimeCarousel/AnimeCarousel'
import AnimeGrid from '@/components/AnimeGrid/AnimeGrid'
import Schedule from '@/components/Schedule/Schedule'
import Section from '@/components/Section'
import CollectionCard from '@/components/Collection/CollectionCard'
import getSchedule from '@/api/getSchedule'
import AnimeService from '@/services/anime'
import { Metadata } from 'next'
import GenreService from '@/services/genre'
import { Genre } from '@prisma/client'

async function Home() {
  const carouselItemsPromise = AnimeService.getByIds([21, 20, 16498])

  const popularPromise = AnimeService.getPopular({ take: 10 })

  const genresPromise = GenreService.getByIds(['friendship', 'romance', 'action', 'fantasy'])

  const genrePromise = GenreService.getById('romance') as Promise<Genre>

  const schedulePromise = getSchedule()

  const [carouselItems, popular, genres, genre, schedule] = await Promise.all([
    carouselItemsPromise,
    popularPromise,
    genresPromise,
    genrePromise,
    schedulePromise,
  ])

  const genreAnime = await AnimeService.get({ genre: genre.id, take: 3 })

  return (
    <main>
      <AnimeCarousel data={carouselItems} />
      <Section title="Popular Anime" button="SEE MORE" buttonProps={{ href: '/popular' }}>
        <AnimeGrid data={popular.data} />
      </Section>
      <Section title="Collections" className="bg-black-light" button="SEE MORE" buttonProps={{ href: '/collections' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {genres.map((item) => (
            <Collection key={item.id} {...item} />
          ))}
        </div>
      </Section>
      <Section className="bg-black-light">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5 md:gap-x-5 md:gap-y-7 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block`}
        >
          {genreAnime.data.map((item) => (
            <AnimeCard {...item} key={item.id} />
          ))}
          <div className="row-start-1 row-end-2 col-start-1 col-end-3 pb-10">
            <CollectionCard
              className="px-4 md:px-8 py-0 md:py-10 rounded-lg bg-black-light h-full"
              title={genre?.title}
              description={genre.description}
              href={`/collection/${genre.id}`}
            />
          </div>
        </div>
      </Section>
      <Section
        title="Schedule"
        className="bg-black"
        button="TO SCHEDULE"
        buttonProps={{
          href: '/schedule',
          endIcon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          ),
        }}
      >
        <Schedule data={schedule} />
      </Section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Animara',
  description:
    'Welcome on Animara. Stream, discover, and enjoy a vast collection of anime series and movies. Explore our database with thousand of anime in a good quality.',
  themeColor: '#0c0c0c',
  openGraph: {
    images: ['/og.png'],
    title: 'Animara',
    description: 'Welcome on Animara. Stream, discover, and enjoy a vast collection of anime series and movies.',
    type: 'website',
    url: '/',
  },
  twitter: {
    images: ['/og.png'],
    title: 'Animara',
    description: 'Welcome on Animara. Stream, discover, and enjoy a vast collection of anime series and movies.',
    card: 'summary_large_image',
    site: '@Zhorrrro',
  },
}

export default Home
