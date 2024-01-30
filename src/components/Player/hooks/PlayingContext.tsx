import { FC, ReactElement, createContext, useContext, useState } from 'react'

export interface PlayingState {
  playedSeconds: number
  playedPercentages: number
  loadedSeconds: number
  loadedPercentages: number
  duration: number
  playing: boolean
  isLoading: boolean
  isError: boolean
  isStalling: boolean
}

export interface PlayingContext extends PlayingState {
  pause: () => void
  play: () => void
  togglePlaying: () => void
  setPlayingState: (params: Partial<PlayingState> | ((prev: PlayingState) => PlayingState)) => void
}

export const intitialPlayingStateValue = {
  playedPercentages: 0,
  playedSeconds: 0,
  loadedPercentages: 0,
  loadedSeconds: 0,
  isLoading: false,
  playing: false,
  duration: 0,
  isError: false,
  isStalling: false,
}

export const intitialPlayingContextValue = {
  ...intitialPlayingStateValue,
  pause: () => {},
  play: () => {},
  togglePlaying: () => {},
  setPlayingState: () => {},
}

const playingContext = createContext<PlayingContext>(intitialPlayingContextValue)

interface Props {
  children: ReactElement
}

export const PlayingProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<PlayingState>(intitialPlayingStateValue)

  const setPlayingState = (params: Partial<PlayingState> | ((prev: PlayingState) => PlayingState)) => {
    if (typeof params === 'function') {
      setState(params)
    } else {
      setState((prev) => ({ ...prev, ...params }))
    }
  }

  const togglePlaying = () => setState((prev) => ({ ...prev, playing: !prev.playing }))
  const pause = () => setState((prev) => ({ ...prev, playing: false }))
  const play = () => setState((prev) => ({ ...prev, playing: true }))

  return (
    <playingContext.Provider value={{ ...state, setPlayingState, pause, play, togglePlaying }}>
      {children}
    </playingContext.Provider>
  )
}

export const usePlaying = () => {
  const data = useContext(playingContext)

  return data
}
