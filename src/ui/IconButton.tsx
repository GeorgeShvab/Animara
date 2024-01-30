import Link from 'next/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactElement } from 'react'
import type { UrlObject } from 'url'

interface BaseProps {
  children: ReactElement | string
  href?: string | UrlObject
}

type Props = (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>) & BaseProps

const IconButton: FC<Props> = ({ children, className, href, ...rest }) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`h-12 w-12 md:w-10 md:h-10 rounded-full text-white font-bold flex items-center justify-center bg-theme hover:bg-theme-dark duration-300 ${className}`}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    )
  } else {
    return (
      <button
        className={`h-12 w-12 md:w-10 md:h-10 rounded-full text-white font-bold flex items-center justify-center bg-theme hover:bg-theme-dark duration-300 ${className}`}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }
}

export default IconButton
