'use client'

import useOutsideClick from '@/hooks/useOutsideClick'
import Button from '@/ui/Button'
import { FC, HTMLAttributes, ReactElement, useRef, useState } from 'react'

interface Props {
  buttonText: string
  children: ReactElement[]
  className?: string
  icon?: boolean
  containerProps?: HTMLAttributes<HTMLDivElement>
}

const Dropdown: FC<Props> = ({ children, buttonText, containerProps, icon = true, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [isOpened, setIsOpened] = useState<boolean>(false)

  const handleClick = () => setIsOpened((prev) => !prev)

  useOutsideClick(containerRef, () => setIsOpened(false))

  return (
    <div
      {...containerProps}
      className={`relative z-10 ${isOpened ? 'z-30' : 'z-10'} ${containerProps?.className || ''}`}
      ref={containerRef}
    >
      <Button
        className={`transition-none w-full !px-0 ${className} ${
          isOpened ? '!rounded-none !rounded-t open' : '!rounded close'
        }`}
        onClick={handleClick}
        endIcon={
          icon ? (
            isOpened ? (
              <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-3 w-3 md:h-3.5 md:w-3.5">
                <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
              </svg>
            ) : (
              <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-3 w-3 md:h-3.5 md:w-3.5">
                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
              </svg>
            )
          ) : undefined
        }
      >
        {buttonText}
      </Button>
      {isOpened && <ul className="absolute top-full left-0 w-full">{children}</ul>}
    </div>
  )
}

export default Dropdown
