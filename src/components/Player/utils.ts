import { Source, Subtitle } from '@/types'

export function findQuality(data: Source[], quality: string) {
  return data.find(
    (item) =>
      item.quality === quality ||
      (item.quality === 'auto' && quality === 'default') ||
      (item.quality === 'default' && quality === 'auto')
  )?.url
}

export function generateConfig(subs: Subtitle[]) {
  if (subs.length) {
    return {
      file: {
        attributes: {
          crossOrigin: 'true',
        },
        tracks: subs
          .filter((item) => item.lang === 'English')
          .map((item) => ({ src: item.url, kind: 'subtitles', srcLang: 'en', label: 'English' })),
      },
    }
  }
}

export function findBestQuality(data: Source[], initial = 'default') {
  return data.reduce((prev, curr) => {
    if (Number(prev.replace(/[a-z]/i, '')) < Number(curr.quality.replace(/[a-z]/i, ''))) {
      return curr.quality
    }
    return prev
  }, initial)
}
