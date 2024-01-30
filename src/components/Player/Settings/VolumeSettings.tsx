import { FC } from 'react'
import { useSettings } from '../hooks/SettingsContext'
import useDrag from '@/hooks/useDrag'

interface Props {
  onClose: () => void
}

const VolumeSettings: FC<Props> = ({ onClose }) => {
  const { volume, setVolume } = useSettings()
  const drag = useDrag((x) => setVolume(x))

  return (
    <>
      <div className="flex items-center gap-5 bg-black/75 px-5 pt-4 pb-3 items-center group">
        <button className="text-white" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <p className="text-white text-sm tracking-wider">Volume</p>
      </div>
      <div className={`bg-black/75 px-5 pb-5 pt-3 text-sm flex gap-5 items-center group`}>
        <div className="h-1 w-full rounded-full relative" {...drag}>
          <div className="bg-white/20 w-full h-full rounded-full overflow-hidden">
            <div className="relative w-full h-full">
              <span
                className="absolute bottom-0 left-0 block h-full bg-theme"
                style={{ width: volume * 100 + '%' }}
              ></span>
            </div>
          </div>
          <span
            className="absolute block h-3 w-3 border-[3px] border-white rounded-full bg-theme top-1/2 translate-x-[-50%] translate-y-[-50%] z-30"
            style={{ left: volume * 100 + '%' }}
          ></span>
        </div>
      </div>
    </>
  )
}

export default VolumeSettings
