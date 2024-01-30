import Link from 'next/link'
import { FC } from 'react'
import { useEpisode } from './hooks/EpisodeContext'
import { usePlaying } from './hooks/PlayingContext'
import { useAnime } from './hooks/AnimeContext'

interface Props {
  className?: string
}

const FooterLeftButtons: FC<Props> = ({ className }) => {
  const { playing, togglePlaying } = usePlaying()
  const { number } = useEpisode()
  const { totalEpisodes, format } = useAnime()

  return (
    <div className={`flex items-center ${className}`}>
      {format !== 'MOVIE' && (
        <Link
          className={`h-8 w-8 md:h-10 md:w-10 flex justify-center items-center ${
            number === 1 ? 'pointer-events-none text-white/40' : 'text-white'
          } hidden md:flex`}
          href={{ query: { ep: number - 1 } }}
          scroll={false}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 md:h-7 md:w-7">
            <path d="M6 18V6h2v12H6m3.5-6L18 6v12l-8.5-6z" />
          </svg>
        </Link>
      )}
      <button className="text-white h-8 w-8 md:h-10 md:w-10 flex justify-center items-center" onClick={togglePlaying}>
        {playing ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 md:w-6 md:h-6"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 md:w-6 md:h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {format !== 'MOVIE' && (
        <Link
          className={`h-8 w-8 md:h-10 md:w-10 flex justify-center items-center ${
            number === totalEpisodes ? 'pointer-events-none text-white/40' : 'text-white'
          } hidden md:flex`}
          href={{ query: { ep: number + 1 } }}
          scroll={false}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 md:h-7 md:w-7">
            <path d="M16 18h2V6h-2M6 18l8.5-6L6 6v12z" />
          </svg>
        </Link>
      )}
    </div>
  )
}

export default FooterLeftButtons
