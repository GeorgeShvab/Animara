import { Audio, Source, Subtitle } from '@/types'
import axios from 'axios'
import { useEffect } from 'react'

interface Response {
  sources: Source[]
  subtitles: Subtitle[]
  audio: Audio[]
  intro: {
    start: number
    end: number
  }
  outro: {
    start: number
    end: number
  }
  headers: {
    [key: string]: string[]
  }
}

interface Data {
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

interface Params {
  provider: string
  number: number
  watchId: string
  animeId: number
  onError: (e: unknown) => void
  onSuccess: (data: Data) => void
}

const useGetSources = ({ provider, number, watchId, animeId, onSuccess, onError }: Params) => {
  useEffect(() => {
    ;(async () => {
      try {
        const link = `https://api.anify.tv/sources?providerId=${provider}&watchId=${watchId}&episodeNumber=${number}&id=${animeId}&subType=sub`

        const { data } = await axios.get<Response>(link)

        const preparedData = {
          sources: data.sources.filter(
            (item, index) => data.sources.findIndex((i) => i.quality === item.quality) === index
          ),
          subtitles: data.subtitles,
          audio: data.audio,
          intro: data.intro.end && data.intro.start ? data.intro : undefined,
          outro: data.outro.end && data.outro.start ? data.outro : undefined,
        }

        onSuccess(preparedData)
      } catch (e) {
        onError(e)
      }
    })()
  }, [provider, number, watchId, animeId])
}

export default useGetSources
