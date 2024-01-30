import { useEffect, useRef } from 'react'
import { usePlaying } from './PlayingContext'

const useStalling = () => {
  const { setPlayingState, playing, playedSeconds, isStalling } = usePlaying()

  const interval = useRef<NodeJS.Timeout>()

  const played = useRef<number>()

  useEffect(() => {
    clearInterval(interval.current)

    interval.current = setInterval(() => {
      if (playedSeconds === played.current && playing && !isStalling) {
        setPlayingState({ isStalling: true })
      }

      played.current = playedSeconds
    }, 750)
  }, [playedSeconds, playing, isStalling])
}

export default useStalling
