import { useEffect } from 'react'
import { usePlayer } from './usePlayer'
import { usePlaying } from './PlayingContext'
import { useSettings } from './SettingsContext'

const SEEKING = 5

const useKeys = () => {
  const { playerRef } = usePlayer()
  const { togglePlaying } = usePlaying()
  const { toggleMute, fullscreen, exitFullscreen, toggleFullscreen } = useSettings()

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

  const handleKeyPress = (e: KeyboardEvent) => {
    const videoPosition = (playerRef?.current?.getInternalPlayer() as HTMLVideoElement).getBoundingClientRect()

    if (videoPosition.top - window.innerHeight * 0.75 > 0 || window.innerHeight * 0.25 - videoPosition.bottom > 0) {
      return
    }

    switch (e.code) {
      case 'ArrowRight':
        seekForward()
        break
      case 'ArrowLeft':
        seekBackward()
        break
      case 'KeyM':
        e.preventDefault()
        toggleMute()
        break
      case 'Space':
        e.preventDefault()
        togglePlaying()
        break
    }
  }

  const handleFullscreen = (e: Event) => {
    if (!document.fullscreenElement) {
      exitFullscreen()
    }
  }

  useEffect(() => {
    const videoContainer = document.getElementById('player-fullscreen-container')

    document.addEventListener('keydown', handleKeyPress)
    document.addEventListener('fullscreenchange', handleFullscreen)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('fullscreenchange', handleFullscreen)
    }
  }, [])
}

export default useKeys
