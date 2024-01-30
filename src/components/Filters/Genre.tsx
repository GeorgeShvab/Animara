'use client'

import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
import queryParams from '@/utils/searchParams'

const GenreFilter: FC = () => {
  const searchParams = useSearchParams()

  const genre = searchParams.get('genre') || 'all'

  const genres = [
    'all',
    'action',
    'comedy',
    'sci-fi',
    'drama',
    'romance',
    'friendship',
    'school',
    'mystery',
    'adventure',
  ]

  const query = queryParams(searchParams.toString()).remove('page')

  return (
    <Dropdown
      className="text-[13px] !h-9 md:w-fit !pl-4 md:!pl-6 !pr-3.5 md:!pr-5 !gap-2.5 md:!gap-4 justify-between md:justify-center"
      containerProps={{ className: 'flex-[3_0_auto] md:flex-initial' }}
      buttonText="Genre"
    >
      {genres.map((item) => (
        <DropdownItem
          key={item}
          className={`!px-6 !h-9 text-[13px] !px-[14px] md:!px-6 capitalize ${genre === item ? '!bg-theme-dark' : ''}`}
          href={{ query: query.set('genre', item).toString() }}
        >
          {item}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}

export default GenreFilter
