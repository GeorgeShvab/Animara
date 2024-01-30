import { Episode } from '@/types'
import { FC, ReactElement, createContext, useContext } from 'react'

export interface EpisodeState extends Episode {}

export interface EpisodeContext extends EpisodeState {
  setEpisodeState: (params: Partial<EpisodeState> | ((prev: EpisodeState) => EpisodeState)) => void
}

export const intitialEpisodeContextValue = { setEpisodeState: () => {} }

export const episodeContext = createContext<EpisodeState>(intitialEpisodeContextValue as any)

interface Props {
  children: ReactElement
  value: EpisodeState
}

export const EpisodeProvider: FC<Props> = ({ value, children }) => {
  return <episodeContext.Provider value={value}>{children}</episodeContext.Provider>
}

export const useEpisode = () => {
  const data = useContext(episodeContext)

  return data
}
