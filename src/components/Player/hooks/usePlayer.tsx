import { ForwardRefRenderFunction, ReactElement, RefObject, createContext, forwardRef, useContext } from 'react'
import ReactPlayer from 'react-player'

const playerContext = createContext<{ playerRef: null | RefObject<ReactPlayer> }>({ playerRef: null })

interface Props {
  children: ReactElement
}

const Provider: ForwardRefRenderFunction<ReactPlayer, Props> = ({ children }, ref) => {
  return (
    <playerContext.Provider value={{ playerRef: ref as RefObject<ReactPlayer> }}>{children}</playerContext.Provider>
  )
}

export const PlayerProvider = forwardRef(Provider)

export const usePlayer = () => {
  const data = useContext(playerContext)

  return data
}
