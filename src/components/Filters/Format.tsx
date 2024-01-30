'use client'

import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
import queryParams from '@/utils/searchParams'

const FormatFilter: FC = () => {
  const searchParams = useSearchParams()

  const format = searchParams.get('format') || 'all'

  const query = queryParams(searchParams.toString()).remove('page')

  return (
    <Dropdown
      className="text-[13px] !h-9 md:w-fit !pl-4 md:!pl-6 !pr-3.5 md:!pr-5 !gap-2.5 md:!gap-4 justify-between md:justify-center"
      containerProps={{ className: 'flex-[3_0_auto] md:flex-initial' }}
      buttonText="Format"
    >
      <DropdownItem
        className={`!px-6 !h-9 text-[13px] !px-[14px] md:!px-6 capitalize ${format === 'all' ? '!bg-theme-dark' : ''}`}
        href={{ query: query.set('format', 'all').toString() }}
      >
        All
      </DropdownItem>
      <DropdownItem
        className={`!px-6 !h-9 text-[13px] !px-[14px] md:!px-6 capitalize ${
          format === 'series' ? '!bg-theme-dark' : ''
        }`}
        href={{ query: query.remove('page').set('format', 'series').toString() }}
      >
        Series
      </DropdownItem>
      <DropdownItem
        className={`!px-6 !h-9 text-[13px] !px-[14px] md:!px-6 capitalize ${
          format === 'movie' ? '!bg-theme-dark' : ''
        }`}
        href={{ query: query.set('format', 'movie').toString() }}
      >
        Movie
      </DropdownItem>
    </Dropdown>
  )
}

export default FormatFilter
