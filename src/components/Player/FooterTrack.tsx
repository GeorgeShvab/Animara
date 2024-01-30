import { FC } from 'react'
import { usePlaying } from './hooks/PlayingContext'
import { usePlayer } from './hooks/usePlayer'
import useDrag from '@/hooks/useDrag'

const FooterTrack: FC = () => {
  const { loadedPercentages, playedPercentages, duration, playedSeconds } = usePlaying()
  const { playerRef } = usePlayer()

  const drag = useDrag((x, y) => {
    if (playerRef?.current) {
      playerRef?.current.seekTo(x >= 1 ? 0.9999 : x)
    }
  })

  const played = prettifyTime(playedSeconds)
  const fullDuration = prettifyTime(duration)

  return (
    <div className="relative h-1 w-full cursor-pointer" {...drag}>
      <span className="absolute left-0 top-2 md:top-[8px] text-white text-[8px] md:text-[9px]">
        {played.hours ? played.hours + ' : ' : null}
        {played.minutes} : {played.seconds}
      </span>
      <span className="absolute right-0 top-2 md:top-[8px] text-white text-[8px] md:text-[9px]">
        {fullDuration.hours ? fullDuration.hours + ' : ' : null}
        {fullDuration.minutes} : {fullDuration.seconds}
      </span>
      <div className="bg-white/20 h-full w-full rounded-full overflow-hidden">
        <div className="relative w-full h-full">
          <span className="absolute block h-full bg-white/40" style={{ width: loadedPercentages * 100 + '%' }}></span>
          <span className="absolute block h-full bg-theme" style={{ width: playedPercentages * 100 + '%' }}></span>
        </div>
      </div>
      <span
        className="absolute block h-2.5 w-2.5 lg:h-3 lg:w-3 border-2 lg:border-[3px] border-white rounded-full bg-theme top-1/2 translate-y-[-50%] translate-x-[-50%] z-30"
        style={{ left: playedPercentages * 100 + '%' }}
      ></span>
    </div>
  )
}

function prettifyTime(s: number) {
  const hours = Math.floor(s / 3600)

  const minutes = Math.floor((s - hours * 3600) / 60)

  const seconds = Math.floor(s - (hours * 3600 + minutes * 60))

  return {
    minutes: hours && minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds,
    hours: hours,
  }
}

export default FooterTrack
