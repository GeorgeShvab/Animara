'use client'

import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
import queryParams from '@/utils/searchParams'

const StatusFilter: FC = () => {
  const searchParams = useSearchParams()

  const status = searchParams.get('status') || 'all'

  const query = queryParams(searchParams.toString()).remove('page')

  return (
    <Dropdown
      className="text-[13px] !h-9 md:w-fit !pl-4 md:!pl-6 !pr-3.5 md:!pr-5 !gap-2.5 md:!gap-4 justify-between md:justify-center"
      containerProps={{ className: 'flex-[3_0_auto] md:flex-initial' }}
      buttonText="Status"
    >
      <DropdownItem
        className={`!px-6 !h-9 text-[13px] !px-[14px] md:!px-6 capitalize ${status === 'all' ? '!bg-theme-dark' : ''}`}
        href={{ query: query.set('status', 'all').toString() }}
      >
        All
      </DropdownItem>
      <DropdownItem
        className={`!px-6 !h-9 text-[13px] !px-[14px] md:!px-6 capitalize ${
          status === 'finished' ? '!bg-theme-dark' : ''
        }`}
        href={{ query: query.remove('page').set('status', 'finished').toString() }}
      >
        Finished
      </DropdownItem>
      <DropdownItem
        className={`!px-6 !h-9 text-[13px] !px-[14px] md:!px-6 capitalize ${
          status === 'releasing' ? '!bg-theme-dark' : ''
        }`}
        href={{ query: query.remove('page').set('status', 'releasing').toString() }}
      >
        Releasing
      </DropdownItem>
    </Dropdown>
  )
}

export default StatusFilter
