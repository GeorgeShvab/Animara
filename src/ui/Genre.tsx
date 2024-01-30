import Link from 'next/link'
import { FC, HTMLAttributes, ReactElement } from 'react'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: ReactElement | string
  href: string
}

const Genre: FC<Props> = ({ children, href, className = '', ...rest }) => {
  return (
    <Link
      className={`px-3 py-1.5 rounded-lg text-neutral-100 block text-xs bg-black/50 transition-colors duration-300 ${className}`}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default Genre
