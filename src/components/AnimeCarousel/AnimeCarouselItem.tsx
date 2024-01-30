import { Anime } from '@/types'
import Button from '@/ui/Button'
import IconButton from '@/ui/IconButton'
import blendColors from '@/utils/blendColors'
import removeHtmlTags from '@/utils/removeHtmlTags'
import shortenText from '@/utils/shortenText'
import Link from 'next/link'
import { FC } from 'react'

export type CarouselItemProps = Pick<
  Anime,
  'id' | 'description' | 'bannerImage' | 'season' | 'totalEpisodes' | 'year' | 'color' | 'duration' | 'format'
> & { title: string | Anime['title'] }

const AnimeCarouselItem: FC<CarouselItemProps> = ({
  id,
  bannerImage,
  title,
  description,
  season,
  duration,
  totalEpisodes,
  year,
  color,
  format,
}) => {
  return (
    <div
      className="min-h-[450px] md:min-h-fit md:h-[600px] w-full relative anime-carousel-item"
      style={{
        '--bg-img': `url(${bannerImage})`,
        ...(color ? { '--anime-theme': color, '--anime-theme-dark': blendColors(color, '#00000026') } : {}),
      }}
    >
      <div className="min-h-[450px] md:min-h-fit md:h-[600px] w-full bg-black/50">
        <Link
          className="absolute right-64 top-1/2 translate-y-[-50%] text-white/20 hover:text-white transition-color duration-200 rounded-full hidden md:block"
          href={'/watch/' + id}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.8}
            stroke="currentColor"
            className="h-28 w-28"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
        </Link>
        <div className="min-h-[450px] md:min-h-fit md:h-[600px] w-full pt-[100px] md:pt-0 container">
          <div className="px-2 flex flex-col justify-end min-h-[450px] md:min-h-fit md:h-[600px] py-10 md:py-20 gap-10 md:gap-20">
            <div>
              <h1 className="text-white text-3xl md:text-5xl font-marko mb-1 md:mb-2 !leading-snug">
                {typeof title === 'string' ? title : title.english || title.romaji || title.native}
              </h1>
              <div className="flex gap-5 text-neutral-400 mb-5 md:mb-6 text-xs md:text-sm items-center">
                <p>
                  {season} &nbsp; {year}
                </p>
                <p>{duration} minutes</p>
                {format !== 'MOVIE' ? <p>{totalEpisodes} episodes</p> : null}
              </div>
              <p
                className="text-neutral-200 max-w-[600px] text-xs md:text-sm leading-5 md:leading-6"
                dangerouslySetInnerHTML={{ __html: `${shortenText(removeHtmlTags(description), 50)}...` }}
              ></p>
            </div>
            <div className="flex gap-4">
              <Button
                className={color ? '!bg-[var(--anime-theme)] hover:!bg-[var(--anime-theme-dark)]' : ''}
                href={'/watch/' + id}
                endIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeCarouselItem
