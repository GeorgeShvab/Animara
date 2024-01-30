import TextAccordion from '@/ui/TextAccordion'
import { FC } from 'react'
import AnimeDetails from './AnimeDetails'
import { Anime } from '@/types'
import blendColors from '@/utils/blendColors'

type Props = Pick<Anime, 'status' | 'season' | 'year' | 'country' | 'format' | 'description' | 'color'> & {
  nativeTitle: string
}

const AnimeData: FC<Props> = ({ season, status, nativeTitle, year, country, format, description, color }) => {
  const themeColorDarker = color ? blendColors(color, '#191A1CF2') : '#191A1CF2'

  return (
    <div
      className="pb-10 md:pb-14"
      style={{
        '--anime-theme': color || '#F1F2F3',
        '--anime-theme-darker': themeColorDarker || '#0E0F10',
      }}
    >
      <div className="md:flex md:gap-16 lg:gap-24 container">
        <AnimeDetails
          nativeTitle={nativeTitle}
          status={status}
          season={season}
          year={year}
          country={country}
          format={format}
        />
        <div className="pt-6 md:pt-8 flex flex-col justify-between gap-8">
          <TextAccordion
            buttonProps={{ className: 'text-white mt-2' }}
            className="text-[15px] md:text-base text-neutral-300 overflow-hidden"
            wordsLimit={59}
            text={description}
          ></TextAccordion>
          <div className="flex gap-4">
            <button className="flex-1 md:flex-initial h-12 md:h-10 rounded-full bg-[var(--anime-theme)] text-white font-bold px-6">
              Add To List
            </button>
            <button className="flex-1 md:flex-initial h-12 md:h-10 rounded-full bg-[var(--anime-theme-darker)] text-white font-bold px-6">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeData
