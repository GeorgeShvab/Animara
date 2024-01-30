'use client'

import Button from '@/ui/Button'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import params from '@/utils/searchParams'

interface Props {
  format: string
}

const AnimeFormatSelection: FC<Props> = ({ format }) => {
  const searchParams = useSearchParams()

  const url = new URLSearchParams(searchParams.toString())

  url.delete('format')

  const query = params(url.toString()).remove('page')

  return (
    <div className="flex gap-2 md:gap-3 w-full md:w-fit">
      <Button
        className={`!rounded flex-1 md:flex-initial text-sm !h-9 ${
          format === 'all' ? '' : '!bg-white !text-theme hover:!bg-neutral-100'
        }`}
        href={{ query: query.set('format', 'all').toString() }}
      >
        All
      </Button>
      <Button
        className={`!rounded flex-1 md:flex-initial text-sm !h-9 ${
          format === 'series' ? '' : '!bg-white !text-theme hover:!bg-neutral-100'
        }`}
        href={{ query: query.set('format', 'series').toString() }}
      >
        Series
      </Button>
      <Button
        className={`!rounded flex-1 md:flex-initial text-sm !h-9 ${
          format === 'movie' ? '' : '!bg-white !text-theme hover:!bg-neutral-100'
        }`}
        href={{ query: query.set('format', 'movie').toString() }}
      >
        Movies
      </Button>
    </div>
  )
}

export default AnimeFormatSelection
