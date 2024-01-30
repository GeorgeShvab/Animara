import { Anime } from '@/types'
import Button from '@/ui/Button'
import IconButton from '@/ui/IconButton'
import blendColors from '@/utils/blendColors'
import removeHtmlTags from '@/utils/removeHtmlTags'
import shortenText from '@/utils/shortenText'
import { FC } from 'react'

type Props = Pick<
  Anime,
  'id' | 'bannerImage' | 'description' | 'totalEpisodes' | 'season' | 'year' | 'color' | 'duration' | 'format'
> & { title: string | Anime['title'] }

const AnimeBanner: FC<Props> = ({
  bannerImage,
  title,
  description,
  id,
  color,
  duration,
  season,
  year,
  totalEpisodes,
  format,
}) => {
  return (
    <div
      className="aspect-[2/1] md:aspect-auto rounded-lg overflow-hidden justify-end relative"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...(color ? { '--anime-theme': color, '--anime-theme-dark': blendColors(color, '#00000026') } : {}),
      }}
    >
      <div className="md:flex justify-end px-6 py-5 md:px-9 md:py-10 aspect-[2/1] md:aspect-auto bg-[linear-gradient(90deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_75%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,0)_25%,rgba(0,0,0,0.4)_100%)]">
        <div className="flex-[0_0_50%] flex flex-col justify-end md:justify-between gap-8 md:gap-0 h-full">
          <div className="mb-0 md:mb-12">
            <h1 className="text-white text-2xl md:text-5xl font-marko mb-3 md:mb-6">
              {typeof title === 'string' ? title : title.english || title.romaji || title.native}
            </h1>

            <div className="flex gap-4 text-neutral-300 mb-0 md:mb-6 text-[11px] md:text-xs items-center">
              <p>
                {season} {year}
              </p>
              <p>{duration} Minutes</p>
              {format !== 'MOVIE' ? <p>{totalEpisodes} Episodes</p> : null}
            </div>
            <p
              className="text-neutral-100 max-w-[600px] text-xs md:text-sm keading-5 md:leading-6 hidden md:block"
              dangerouslySetInnerHTML={{ __html: `${shortenText(removeHtmlTags(description), 30)}...` }}
            ></p>
          </div>
          <Button
            className={`${
              color ? '!bg-[var(--anime-theme)] hover:!bg-[var(--anime-theme-dark)]' : ''
            } w-fit hidden md:flex`}
            href={'/watch/' + id}
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            }
          >
            Watch Now
          </Button>
          <IconButton
            className={`absolute right-6 bottom-6 md:hidden ${color ? '!bg-[var(--anime-theme)]' : ''}`}
            aria-label="Add to List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 translate-x-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default AnimeBanner
