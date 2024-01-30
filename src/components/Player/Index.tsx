'use client'

import { Episode } from '@/types'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { EpisodeProvider } from './hooks/EpisodeContext'
import { SourceProvider } from './hooks/SourceContext'
import { SettingsProvider } from './hooks/SettingsContext'
import { PlayingProvider } from './hooks/PlayingContext'
import { AnimeContext, AnimeProvider } from './hooks/AnimeContext'

interface Props {
  episode: Episode
  anime: AnimeContext
}

const InnerPlayer = dynamic(() => import('./InnerPlayer'), { ssr: false })

const Player: FC<Props> = ({ anime, episode }) => {
  return (
    <AnimeProvider value={anime}>
      <EpisodeProvider value={episode}>
        <SettingsProvider>
          <SourceProvider>
            <PlayingProvider>
              <InnerPlayer />
            </PlayingProvider>
          </SourceProvider>
        </SettingsProvider>
      </EpisodeProvider>
    </AnimeProvider>
  )
}

export default Player
