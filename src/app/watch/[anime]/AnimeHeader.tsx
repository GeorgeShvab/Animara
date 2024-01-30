import { FC } from 'react'
import AnimePoster from './AnimePoster'
import * as types from '@prisma/client'
import Genre from '@/ui/Genre'
import WatchButton from './WatchButton'
import { Anime } from '@/types'
import blendColors from '@/utils/blendColors'

type Props = Pick<Anime, 'coverImage' | 'totalEpisodes' | 'duration' | 'averageRating' | 'color'> & {
  title: string
  genres: types.Genre[]
}

const AnimeHeader: FC<Props> = ({ title, coverImage, averageRating, totalEpisodes, duration, genres, color }) => {
  const themeColorDarker = color ? blendColors(color, '#191A1CF2') : '#191A1CF2'

  return (
    <div
      className="md:h-[410px] mt-[-410px] w-full relative"
      style={{
        '--anime-theme': color || '#F1F2F3',
        '--anime-theme-darker': themeColorDarker || '#0E0F10',
      }}
    >
      <WatchButton className="absolute right-40 top-1/2 translate-y-[-50%] hidden lg:block" />
      <div className="container flex flex-col justify-end md:h-[410px] md:h-[410px] pt-[100px] md:pt-0">
        <div className="md:flex md:gap-16 lg:gap-24">
          <div className="flex-[0_0_auto] justify-between flex md:block mb-6 md:mb-0">
            <AnimePoster src={coverImage} alt={title} />
            <div className="flex flex-1 flex-col justify-end items-center">
              <div className="flex gap-2 items-center sm:hidden py-2.5">
                <span className="text-[var(--anime-theme)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </span>

                <span className="text-neutral-300">{averageRating}/10</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <h1 className="text-white text-3xl md:text-5xl font-marko mb-1.5 md:mb-3 px-2 md:px-0">{title}</h1>
            <div className="flex gap-6 text-sm items-center px-2 md:px-0">
              <div className="flex gap-2 items-center hidden sm:flex">
                <span className="text-[var(--anime-theme)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </span>
                <span className="text-sm text-neutral-400 md:text-neutral-300">{averageRating}/10</span>
              </div>
              {totalEpisodes ? (
                <span className="text-sm text-neutral-400 md:text-neutral-300">{totalEpisodes} Episodes</span>
              ) : null}
              <span className="text-sm text-neutral-400 md:text-neutral-300">{duration} Minutes</span>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2 md:max-w-[400px] py-6 md:py-8">
              {genres.map((item) => (
                <Genre
                  key={item.id}
                  href={`/collections/${item.id}`}
                  className="!bg-[var(--anime-theme-darker)] md:!bg-black/50 md:hover:!bg-black/60"
                >
                  {item.title}
                </Genre>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeHeader
