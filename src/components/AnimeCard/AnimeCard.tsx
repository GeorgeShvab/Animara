import { Anime } from '@/types'
import Link from 'next/link'
import { FC } from 'react'

export type AnimeCardProps = Pick<
  Anime,
  'id' | 'coverImage' | 'averageRating' | 'totalEpisodes' | 'duration' | 'format'
> & {
  title: string | Anime['title']
  className?: string
}

const AnimeCard: FC<AnimeCardProps> = ({
  coverImage,
  title,
  averageRating,
  totalEpisodes,
  duration,
  id,
  format,
  className = '',
}) => {
  return (
    <Link href={`/watch/${id}`}>
      <div className={`w-full ${className}`}>
        <div className="overflow-hidden relative mb-3 md:mb-4 rounded-lg overflow-hidden w-full">
          <img
            src={coverImage}
            alt={typeof title === 'string' ? title : title.english || title.romaji || title.native}
            className="w-full h-full object-cover rounded-lg aspect-[180/255]"
          />
          <div className="flex items-center gap-2 absolute rounded-l !bg-theme px-2.5 py-1.5 z-10 text-white font-bold right-0 bottom-6 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={'currentColor'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={'currentColor'}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span>{averageRating}</span>
          </div>
        </div>
        <p className="text-sm text-neutral-300 mb-1 md:mb-2 text-[11px] md:text-xs lg:text-[15px] px-2 md:px-3 !leading-tight">
          {typeof title === 'string' ? title : title.english || title.romaji || title.native}
        </p>
        <div className="flex gap-4 items-center px-2 md:px-3">
          {format !== 'MOVIE' ? (
            <p className="text-neutral-500 text-[9px] md:text-[11px]">{totalEpisodes} Episodes</p>
          ) : null}
          <p className="text-neutral-500 text-[9px] md:text-[11px]">{duration} minutes</p>
        </div>
      </div>
    </Link>
  )
}

export default AnimeCard
