import { Source, Subtitle } from '@/types'
import React, { FC, useEffect, useRef } from 'react'
import PlayerClass from 'react-player'
import { useEpisode } from './hooks/EpisodeContext'
import { useSource } from './hooks/SourceContext'
import { useSettings } from './hooks/SettingsContext'
import { usePlaying } from './hooks/PlayingContext'
import { OnProgressProps } from 'react-player/base'
import Overlay from './Overlay'
import { PlayerProvider } from './hooks/usePlayer'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/navigation'
import PlayerHooks from './PlayerHooks'
import { useAnime } from './hooks/AnimeContext'
import DelayWrapper from '../DelayWrapper'
import Alert from '@/ui/Alert'
import Animation from '../Animation'
import { findQuality, generateConfig } from './utils'

const InnerPlayer: FC = () => {
  const playerRef = useRef<PlayerClass>(null)

  const { setPlayingState, pause, play, playing, duration, playedSeconds } = usePlaying()
  const { volume, muted, quality } = useSettings()
  const { data, isInitiallyLoaded, isError } = useSource()
  const { id, number } = useEpisode()
  const anime = useAnime()

  const prevEp = useRef<number>(id)

  const router = useRouter()

  const handleProgress = (data: OnProgressProps) => {
    setPlayingState({
      playedSeconds: data.playedSeconds,
      playedPercentages: data.played,
      loadedSeconds: data.loadedSeconds,
      loadedPercentages: data.loaded,
      isStalling: false,
    })
  }

  const handleDuration = (duration: number) => setPlayingState({ duration })

  const handleReady = (el: ReactPlayer) => {
    if (!playedSeconds) {
      playerRef.current?.seekTo(0.05, 'seconds')
    } else if (prevEp.current === id) {
      playerRef.current?.seekTo(playedSeconds, 'seconds')
    } else if (prevEp.current !== id) {
      prevEp.current = id
    }
  }

  const handleSeek = () => {
    const fullDuration = playerRef.current?.getDuration()
    if (!duration && fullDuration) {
      setPlayingState({ duration: fullDuration })
    }
  }

  const handleEnd = () => router.push(`/watch/${anime.id}?ep=${number + 1}`, { scroll: false })

  return (
    <PlayerProvider ref={playerRef}>
      <div className="w-full aspect-video relative " id="player-fullscreen-container">
        <DelayWrapper ms={300} show={isError}>
          <Animation
            animation={false}
            className="absolute left-1/2 translate-x-[-50%] top-[-100px] transition-opacity duration-300 opacity-0 z-50"
            animationClassName="opacity-100 !top-16"
          >
            <Alert text="An error has occured. Try to check your connection or choose another provider" />
          </Animation>
        </DelayWrapper>
        <Overlay />
        {isInitiallyLoaded && data ? (
          <ReactPlayer
            controls={false}
            autoPlay={false}
            ref={playerRef}
            onProgress={handleProgress}
            playing={playing}
            onPause={pause}
            onPlay={play}
            onDuration={handleDuration}
            progressInterval={250}
            volume={volume}
            muted={muted}
            url={findQuality(data.sources, quality)}
            config={generateConfig(data.subtitles)}
            height="100%"
            width="100%"
            onReady={handleReady}
            onSeek={handleSeek}
            style={{ background: 'black' }}
            onEnded={handleEnd}
          />
        ) : null}

        <PlayerHooks />
      </div>
    </PlayerProvider>
  )
}

export default InnerPlayer
