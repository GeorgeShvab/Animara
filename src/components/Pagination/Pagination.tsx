'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import params from '@/utils/searchParams'

interface Props {
  page: number
  pages: number
}

const Pagination: FC<Props> = ({ page, pages }) => {
  const searchParams = useSearchParams()

  const url = searchParams.toString()

  const right = Math.abs(pages - Math.max(pages - 2, page) - 2) // Amount of elements which should be added to the left side to make total of 5 elements, can be 0, 1, 2. If left is not 0, this is always 0
  const left = Math.abs(Math.min(3, page) - 3) // Amount of elements which should be added to the right side to make total of 5 elements, can be 0, 1, 2. If right is not 0, this is always 0

  const elements = Array.from({ length: pages + 1 }, (_, index) => index + 1)
    .slice(Math.max(page - 3 - right, 0), Math.min(page + 2 + left, pages))
    .map((item) => (
      <Link
        key={item}
        href={{ query: params(url).set('page', item).toString() }}
        className={`h-10 w-10 bg-black-light flex justify-center items-center font-bold text-neutral-200 rounded duration-300 ${
          page === item ? 'bg-theme-dark pointer-events-none' : 'hover:bg-theme'
        }`}
      >
        {item}
      </Link>
    ))

  return (
    <div className="flex gap-2 justify-center">
      <Link
        className={`h-10 w-10 bg-black-light flex justify-center items-center font-bold text-white rounded hover:bg-theme duration-300 ${
          page > 1 ? '' : 'opacity-50 pointer-events-none'
        }`}
        href={{
          query: params(url)
            .set('page', page - 1)
            .toString(),
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </Link>
      {elements}
      <Link
        className={`h-10 w-10 bg-black-light flex justify-center items-center font-bold text-neutral-200 rounded hover:bg-theme duration-300 ${
          page < pages ? '' : 'opacity-50 pointer-events-none'
        }`}
        href={{
          query: params(url)
            .set('page', page + 1)
            .toString(),
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </div>
  )
}

export default Pagination
