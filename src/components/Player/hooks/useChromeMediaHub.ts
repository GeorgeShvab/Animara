import { useEffect } from 'react'
import { useEpisode } from './EpisodeContext'
import { usePlaying } from './PlayingContext'
import { usePlayer } from './usePlayer'
import { useRouter } from 'next/navigation'
import { useAnime } from './AnimeContext'

const SEEKING = 5

const useChromeMediaHub = () => {
  const { number, img } = useEpisode()
  const { format, totalEpisodes, id, title, bannerImage } = useAnime()
  const { play, pause } = usePlaying()
  const { playerRef } = usePlayer()

  const router = useRouter()

  const seekForward = () => {
    if (playerRef?.current) {
      const currentTime = playerRef.current.getCurrentTime()
      const duration = playerRef.current.getDuration()

      const seekTo = currentTime + SEEKING < duration ? currentTime + SEEKING : duration

      playerRef?.current?.seekTo(seekTo)
    }
  }

  const seekBackward = () => {
    if (playerRef?.current) {
      const currentTime = playerRef.current.getCurrentTime()

      const seekTo = currentTime - SEEKING > 0 ? currentTime - SEEKING : 0

      playerRef?.current?.seekTo(seekTo)
    }
  }

  const handleNextEp = () => {
    if (number < totalEpisodes) {
      router.push(`/watch/${id}?ep=${number + 1}`, { scroll: false })
    }
  }

  const handlePrevEp = () => {
    if (number > 1) {
      router.push(`/watch/${id}?ep=${number - 1}`, { scroll: false })
    }
  }

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title + (format !== 'MOVIE' ? ` - Episode ${number}` : ''),
        artwork: [{ src: bannerImage }],
      })

      navigator.mediaSession.setActionHandler('play', play)
      navigator.mediaSession.setActionHandler('pause', pause)
      navigator.mediaSession.setActionHandler('seekbackward', seekBackward)
      navigator.mediaSession.setActionHandler('seekforward', seekForward)
      navigator.mediaSession.setActionHandler('previoustrack', handlePrevEp)
      navigator.mediaSession.setActionHandler('nexttrack', handleNextEp)
    }
  }, [number, id])
}

export default useChromeMediaHub
