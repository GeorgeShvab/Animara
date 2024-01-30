import Characters from './Characters'
import AnimeGrid from '@/components/AnimeGrid/AnimeGrid'
import Section from '@/components/Section'
import Collection from '@/components/Collection/Collection'
import AnimeHeader from './AnimeHeader'
import AnimeService from '@/services/anime'
import EpisodeService from '@/services/episode'
import { notFound } from 'next/navigation'
import CharacterService from '@/services/character'
import { validateEpisode } from '@/utils/validation'
import Player from '@/components/Player/Index'
import AnimeData from './AnimeData'
import EpisodesList from './EpisodesList'
import { Metadata } from 'next'
import GenreService from '@/services/genre'

interface PageProps {
  params: {
    anime: string
  }
  searchParams: {
    ep: string
  }
}

const WatchPage = async ({ params, searchParams }: PageProps) => {
  const animeId = Number(params.anime)
  const episode = validateEpisode(searchParams.ep)

  const dataPromise = AnimeService.getById(animeId)

  const genresPromise = GenreService.getByIds(['romance', 'action', 'fantasy', 'music'])

  const similarPromise = AnimeService.getSimilar({ id: animeId, take: 10 })

  const episodesPromise = EpisodeService.getByAnimeId(animeId)

  const relatedPromise = AnimeService.getRelated({ id: animeId, take: 10 })

  const charactersPromise = CharacterService.getByAnimeId(animeId)

  const [data, genres, similar, episodes, related, characters] = await Promise.all([
    dataPromise,
    genresPromise,
    similarPromise,
    episodesPromise,
    relatedPromise,
    charactersPromise,
  ])

  if (!data) {
    notFound()
  }

  const currentEpisode = episodes[episode - 1]

  return (
    <main className="bg-black-light [&>.section:nth-child(odd)]:!bg-black-light [&>.section:nth-child(even)]:!bg-black">
      <div className="h-[410px] anime-banner relative" style={{ '--bg-img': `url(${data?.bannerImage})` }}></div>
      <AnimeHeader {...data} title={data.title.english || data.title.romaji || data.title.native} genres={genres} />
      <AnimeData {...data} nativeTitle={data.title.native} />
      <Section>
        <div className="bg-black flex flex-col-reverse md:flex-row gap-4 md:gap-0">
          {data.format !== 'MOVIE' ? (
            <div className="pretty-scrollbar md:flex-[0_0_20%] h-80 md:h-auto md:aspect-[4/9] flex flex-col overflow-auto bg-black-light">
              <EpisodesList episode={episode} episodes={episodes} />
            </div>
          ) : null}
          <div
            className={`aspect-video bg-[#000000] ${data.format === 'MOVIE' ? 'flex-1' : 'flex-[1_3_80%]'}`}
            id="player-container"
          >
            <Player
              episode={currentEpisode}
              anime={{ ...data, title: data.title.english || data.title.romaji || data.title.native }}
            />
          </div>
        </div>
      </Section>
      <Characters data={characters} />
      {related.data.length ? (
        <Section title="Related Anime" button={related.data.length === 10 ? 'SEE MORE' : undefined}>
          <AnimeGrid data={related.data} />
        </Section>
      ) : null}
      <Section title="Collections" className="bg-black-light" button="SEE MORE" buttonProps={{ href: '/collections' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {genres.map((item) => (
            <Collection key={item.id} {...item} />
          ))}
        </div>
      </Section>
      {similar.data.length ? (
        <Section
          title="You may also like"
          className="bg-black"
          button={similar.data.length === 10 ? 'SEE MORE' : undefined}
          buttonProps={{ href: '/similar/' + data.id }}
        >
          <AnimeGrid data={similar.data} />
        </Section>
      ) : null}
    </main>
  )
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const data = await AnimeService.getById(params.anime)
  let ogImage = data?.bannerImage || '/og.png'

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
        url: `/watch/${params.anime}`,
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

  const title = data.title.english || data.title.romaji || data.title.native

  return {
    title: `${title} - Watch on Animara`,
    description: `Watch ${title} in a good quality. ${data.description}`,
    themeColor: '#0c0c0c',
    openGraph: {
      images: [ogImage],
      title: title,
      description: `Watch ${title} in a good quality. ${data.description}`,
      type: 'website',
      url: `/watch/${data.id}`,
    },
    twitter: {
      images: [ogImage],
      title: title,
      description: `Watch ${title} in a good quality. ${data.description}`,
      card: 'summary_large_image',
      site: '@Zhorrrro',
    },
  }
}

export default WatchPage
