import Link from 'next/link'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactElement } from 'react'
import type { UrlObject } from 'url'

interface BaseProps {
  children: ReactElement | string
  startIcon?: ReactElement
  endIcon?: ReactElement
  href?: string | UrlObject
}

export type ButtonProps = (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>) &
  BaseProps

const Button: FC<ButtonProps> = ({ children, startIcon, endIcon, className, href, ...rest }) => {
  if (href) {
    return (
      <Link
        className={`h-12 md:h-10 rounded-full text-white font-bold flex items-center justify-center gap-4 bg-theme hover:bg-theme-dark duration-300 ${className} ${
          endIcon ? 'pr-[26px] md:pr-5' : 'pr-8 md:pr-6'
        } ${startIcon ? 'pl-[26px] md:pl-5' : 'pl-8 md:pl-6'}`}
        href={href}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {startIcon && <span className="">{startIcon}</span>}
        <span>{children}</span>
        {endIcon && <span className="">{endIcon}</span>}
      </Link>
    )
  } else {
    return (
      <button
        className={`h-12 md:h-10 rounded-full text-white font-bold flex items-center justify-center gap-4 bg-theme hover:bg-theme-dark duration-300 ${className} ${
          endIcon ? 'pr-[26px] md:pr-5' : 'pr-8 md:pr-6'
        } ${startIcon ? 'pl-[26px] md:pl-5' : 'pl-8 md:pl-6'}`}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {startIcon && <span className="">{startIcon}</span>}
        <span>{children}</span>
        {endIcon && <span className="">{endIcon}</span>}
      </button>
    )
  }
}

export default Button
