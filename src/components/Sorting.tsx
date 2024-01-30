'use client'

import { FC } from 'react'
import Dropdown from './Dropdown/Dropdown'
import DropdownItem from './Dropdown/DropdownItem'
import { useSearchParams } from 'next/navigation'
import params from '@/utils/searchParams'
import { validateSort } from '@/utils/validation'

const Sorting: FC = () => {
  const searchParams = useSearchParams()

  const query = params(searchParams.toString()).remove('page')

  const sort = validateSort(searchParams.get('sort'))

  const items = ['rating', 'alphabet', 'popularity']
    .filter((item) => item !== sort)
    .map((item) => (
      <DropdownItem
        key={item}
        className={`!h-7 !rounded text-xs !px-3 capitalize duration-200 !bg-black-lighter hover:!bg-black-light hover:text-theme`}
        href={{ query: query.set('sort', item).toString() }}
      >
        {item}
      </DropdownItem>
    ))

  return (
    <Dropdown buttonText={sort} className="!h-7 !rounded text-xs !px-3 !bg-black-lighter capitalize">
      {items}
    </Dropdown>
  )
}

export default Sorting
