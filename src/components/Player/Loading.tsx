import { FC } from 'react'

const Loading: FC = () => {
  return (
    <div
      className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 h-16 lg:w-20 w-16 lg:h-20 flex justify-center items-center`}
    >
      <div className="loader" aria-hidden="true">
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="player-path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    </div>
  )
}

export default Loading
