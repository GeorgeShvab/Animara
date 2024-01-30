import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  iconClassName?: string
}

const WatchButton: FC<Props> = ({ className = '', iconClassName = '' }) => {
  return (
    <Link
      className={`text-white/20 hover:text-white transition-color duration-200 rounded-full ${className}`}
      href="#player-container"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={0.8}
        stroke="currentColor"
        className={`h-24 w-24 ${iconClassName}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
        />
      </svg>
    </Link>
  )
}

export default WatchButton
