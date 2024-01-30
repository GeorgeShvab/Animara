'use client'

import usePage from '@/hooks/usePage'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FC } from 'react'

const Nav: FC = () => {
  const page = usePage()

  return (
    <nav className="flex md:gap-4 lg:gap-5 xl:gap-7">
      <Link
        href="/"
        className={`transition-color duration-300 text-sm ${
          page === '' ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'
        }`}
      >
        Home
      </Link>
      <Link
        href="/movies"
        className={`transition-color duration-300 text-sm ${
          page === 'movies' ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'
        }`}
      >
        Movies
      </Link>
      <Link
        href="/series"
        className={`transition-color duration-300 text-sm ${
          page === 'series' ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'
        }`}
      >
        TV Series
      </Link>
      <Link
        href="/popular"
        className={`transition-color duration-300 text-sm ${
          page === 'popular' ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'
        }`}
      >
        Popular
      </Link>
      <Link
        href="/collections"
        className={`transition-color duration-300 text-sm ${
          page === 'collections' ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'
        }`}
      >
        Collections
      </Link>
      <Link
        href="/search"
        className={`transition-color duration-300 text-sm lg:hidden ${
          page === 'search' ? 'text-white' : 'text-neutral-300 hover:text-neutral-100'
        }`}
      >
        Search
      </Link>
    </nav>
  )
}

export default Nav
