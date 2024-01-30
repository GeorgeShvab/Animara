import * as types from '@prisma/client'
import 'react'

type CustomProp = { [key in `--${string}`]: string }

declare module 'react' {
  export interface CSSProperties extends CustomProp {}
}

export interface Anime extends types.Anime {
  title: {
    english?: string
    romaji?: string
    native: string
  }
  rating: {
    mal?: number
    tmdb?: number
    anidb?: number
    kitsu?: number
    anilist: number
  }
  popularity: {
    mal?: number
    tmdb?: number
    anidb?: number
    kitsu?: number
    anilist: number
  }
  status: string
  totalEpisodes: number
}

//@ts-ignore
export interface Episode extends types.Episode {
  providers: {
    zoro: string
    animepahe: string
    gogoanime: string
  }
}

export type Format = 'movie' | 'series' | 'all'
export type SortOrder = 'asc' | 'desc'
export type Sort = 'popularity' | 'rating' | 'alphabet'
export type Status = 'finished' | 'releasing' | 'all'

export interface Subtitle {
  url: string
  lang: string
}

export interface Source {
  url: string
  quality: '360p' | '480p' | '720p' | '1080p' | 'default' | 'auto'
}

export interface Audio {
  url: string
  name: string
  language: string
}

export interface ScheduleItem {
  data: { title: string; time: number; episode: string }[]
  day: string
  date: number
}

interface ScheduleResponseItem {
  id: string
  title: {
    native: string
    romaji?: string
    english?: string
  }
  airingAt: number
  airingEpisode: number
}

export type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export interface ScheduleResponse {
  sunday: ScheduleResponseItem[]
  monday: ScheduleResponseItem[]
  tuesday: ScheduleResponseItem[]
  wednesday: ScheduleResponseItem[]
  thursday: ScheduleResponseItem[]
  friday: ScheduleResponseItem[]
  saturday: ScheduleResponseItem[]
}
