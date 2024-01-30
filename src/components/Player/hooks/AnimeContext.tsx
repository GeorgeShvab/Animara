import { Anime } from '@/types'
import { FC, ReactElement, createContext, useContext } from 'react'

export type AnimeContext = Pick<Anime, 'bannerImage' | 'id' | 'format'> & { totalEpisodes: number; title: string }

const animeContex = createContext<AnimeContext>({} as AnimeContext)

interface Props {
  children: ReactElement
  value: AnimeContext
}

export const AnimeProvider: FC<Props> = ({ children, value }) => {
  return <animeContex.Provider value={value}>{children}</animeContex.Provider>
}

export const useAnime = () => {
  const data = useContext(animeContex)

  return data
}
