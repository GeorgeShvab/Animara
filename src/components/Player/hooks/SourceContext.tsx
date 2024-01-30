import { Subtitle, Audio, Source } from '@/types'
import { FC, ReactElement, createContext, useContext, useState } from 'react'
import { useEpisode } from './EpisodeContext'
import useGetSources from './useGetSources'
import { useSettings } from './SettingsContext'
import { usePlaying } from './PlayingContext'
import { findBestQuality, findQuality } from '../utils'

export interface SourceState {
  isInitiallyLoaded: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data?: {
    sources: Source[]
    subtitles: Subtitle[]
    audio: Audio[]
    intro?: {
      start: number
      end: number
    }
    outro?: {
      start: number
      end: number
    }
  }
}

interface SourceContext extends SourceState {}

const intitialSourceContextValue = { setSourceState: () => {} }

const sourceContext = createContext<SourceContext>(intitialSourceContextValue as any)

interface Props {
  children: ReactElement
}

const intitialSourceStateValue: SourceState = {
  isInitiallyLoaded: false,
  isError: false,
  isSuccess: false,
  isLoading: true,
}

export const SourceProvider: FC<Props> = ({ children }) => {
  const episode = useEpisode()
  const { provider, quality, setSettingsState } = useSettings()

  const [sourceState, setSourceState] = useState<SourceState>(intitialSourceStateValue)

  const state = useGetSources({
    animeId: episode.animeId,
    number: episode.number,
    provider: provider,
    watchId: (episode.providers as any)[provider],
    onSuccess: (data) => {
      setSourceState({ isInitiallyLoaded: true, isError: false, isLoading: false, isSuccess: true, data })
      if (!findQuality(data.sources, quality)) {
        setSettingsState({
          quality: findBestQuality(data.sources, quality),
        })
      }
    },
    onError: () => setSourceState({ isError: true, isSuccess: false, isLoading: false, isInitiallyLoaded: true }),
  })

  return <sourceContext.Provider value={sourceState}>{children}</sourceContext.Provider>
}

export const useSource = () => {
  const data = useContext(sourceContext)

  return data
}
