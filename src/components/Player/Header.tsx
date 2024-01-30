import { FC } from 'react'
import { useEpisode } from './hooks/EpisodeContext'
import { useSettings } from './hooks/SettingsContext'
import { useAnime } from './hooks/AnimeContext'

const Header: FC = () => {
  const { title, number } = useEpisode()
  const { format } = useAnime()
  const { fullscreen, exitFullscreen } = useSettings()

  if (format === 'MOVIE') return

  return (
    <div
      className={`z-20 absolute top-0 left-0 py-1.5 px-[18px] md:py-3 md:px-3 ${fullscreen ? 'lg:px-4' : 'md:pl-7'}`}
    >
      <div className="h-10 flex items-center gap-3 lg:gap-5">
        {fullscreen && (
          <button className="text-white h-10 w-10 flex items-center justify-center" onClick={exitFullscreen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        <p className="text-white">
          Episode {number} &nbsp; {/^ep\s\d+/i.test(title) ? null : <>&bull; &nbsp; {title}</>}
        </p>
      </div>
    </div>
  )
}

export default Header
