import { FC, useEffect, useRef } from 'react'
import Header from './Header'
import PlayButton from './PlayButton'
import Footer from './Footer'
import { useSettings } from './hooks/SettingsContext'
import useMouseMove from '@/hooks/useMouseActive'
import { usePlaying } from './hooks/PlayingContext'
import Loading from './Loading'

const Overlay: FC = () => {
  const { isControlsShown, hideControls, showControls } = useSettings()
  const { playing, isStalling } = usePlaying()

  const timer = useRef<NodeJS.Timeout>()

  const { handlers } = useMouseMove({
    timeout: 3000,
    onActive: isControlsShown ? () => clearTimeout(timer.current) : showControls,
    onInactive: hideControls,
  })

  useEffect(() => {
    clearTimeout(timer.current)

    if (!playing) {
      showControls()
    } else {
      timer.current = setTimeout(hideControls, 3000)
    }
  }, [playing, isControlsShown])

  return (
    <div className={`absolute w-full h-full`} {...handlers}>
      {isStalling && playing ? <Loading /> : null}
      <div className={`relative z-50 w-full h-full duration-200 ${isControlsShown ? '' : 'opacity-0 cursor-none'}`}>
        <Header />
        <PlayButton />
        <Footer />
      </div>
    </div>
  )
}

export default Overlay
