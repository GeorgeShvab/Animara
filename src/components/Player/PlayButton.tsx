import { FC } from 'react'
import { usePlaying } from './hooks/PlayingContext'
import { useSettings } from './hooks/SettingsContext'

const PlayButton: FC = () => {
  const { playing, togglePlaying, isStalling } = usePlaying()
  const { isControlsShown } = useSettings()

  return (
    <>
      <div
        className={`w-full h-full absolute left-0 top-0 z-10 ${isControlsShown ? '' : 'hidden lg:block'}`}
        onClick={togglePlaying}
      ></div>
      {(!isStalling || !playing) && (
        <button
          className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 rounded-full bg-white/20 text-white/90 h-16 lg:w-20 w-16 lg:h-20 flex justify-center items-center ${
            isControlsShown ? 'cursor-pointer' : 'cursor-none'
          }`}
          onClick={togglePlaying}
        >
          {playing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 lg:w-10 lg:h-10 translate-y-[2px]"
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
              className="w-7 h-7 lg:w-9 lg:h-9 translate-x-[2px] translate-y-[2px]"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}
    </>
  )
}

export default PlayButton
