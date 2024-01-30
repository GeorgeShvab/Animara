import { Format, Sort, SortOrder, Status } from '@/types'

export function validateSort(sort: string | undefined | null): Sort {
  if (sort && ['popularity', 'rating', 'alphabet'].includes(sort)) {
    return sort as Sort
  }
  return 'popularity'
}

export function validateFormat(format: string | null): Format {
  if (format && ['movie', 'series'].includes(format)) {
    return format as Format
  }
  return 'all'
}

export function validateSortOrder(format: string | null): SortOrder {
  if (format && ['asc', 'desc'].includes(format)) {
    return format as SortOrder
  }
  return 'desc'
}

export function validateStatus(status: string | null): Status {
  if (status && ['finished', 'releasing'].includes(status)) {
    return status as Status
  }
  return 'all'
}

export function validatePage(page?: string | number) {
  return Number.isNaN(Number(page)) || !page || page === '0' ? 1 : Number(page)
}

export function validateEpisode(episode?: string | number) {
  return Number.isNaN(Number(episode)) || !episode || episode === '0' ? 1 : Number(episode)
}
