'use client'

import usePage from '@/hooks/usePage'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'

const MobileNavigation: FC = () => {
  const page = usePage()

  const timer = useRef<NodeJS.Timeout>()

  const [isShown, setIsShown] = useState<boolean>(true)

  const prevScrollPosition = useRef<number>()

  const handleScroll = (e: Event) => {
    clearTimeout(timer.current)

    if (prevScrollPosition.current && prevScrollPosition.current > window.scrollY) {
      setIsShown(true)
    } else {
      setIsShown(false)
      timer.current = setTimeout(() => setIsShown(true), 5000)
    }

    prevScrollPosition.current = window.scrollY
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed bottom-0 w-full md:hidden z-50 transition-transform ${isShown ? '' : 'translate-y-full'}`}>
      <nav className="px-8 py-4 bg-black shadow-[0_0_5px_0_rgba(0,0,0,0.75)]">
        <ul className="flex gap-4 justify-between items-center">
          <li>
            <Link href="/" className={page === '' ? 'text-theme' : 'text-neutral-500'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/popular" className={page === 'popular' ? 'text-theme' : 'text-neutral-500'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/search" className={page === 'search' ? 'text-theme' : 'text-neutral-500'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link href="/collections" className={page === 'collections' ? 'text-theme' : 'text-neutral-500'}>
              <svg fill="currentColor" viewBox="0 0 16 16" className="h-5 w-5">
                <path d="M2.5 3.5a.5.5 0 010-1h11a.5.5 0 010 1h-11zm2-2a.5.5 0 010-1h7a.5.5 0 010 1h-7zM0 13a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0016 13V6a1.5 1.5 0 00-1.5-1.5h-13A1.5 1.5 0 000 6v7zm1.5.5A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-13z" />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MobileNavigation
