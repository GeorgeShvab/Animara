'use client'

import countWords from '@/utils/countWords'
import shortenText from '@/utils/shortenText'
import { FC, HTMLAttributes, createElement, useMemo, useState } from 'react'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  containerEl?: keyof JSX.IntrinsicElements
  buttonProps?: HTMLAttributes<HTMLButtonElement>
  text: string
  wordsLimit?: number
  containerProps?: HTMLAttributes<HTMLElement>
}

const TextAccordion: FC<Props> = ({
  buttonProps,
  text,
  containerProps,
  wordsLimit = 80,
  containerEl = 'div',
  ...rest
}) => {
  const [isShortened, setIsShortened] = useState<boolean>(true)

  const shouldShorten = useMemo(() => {
    const words = countWords(text)
    if (words > wordsLimit) return true
    return false
  }, [])

  return createElement(
    containerEl,
    containerProps,
    <>
      <p
        {...rest}
        dangerouslySetInnerHTML={{
          __html: isShortened && shouldShorten ? shortenText(text, wordsLimit) + '...' : text,
        }}
      ></p>
      {shouldShorten ? (
        <button {...buttonProps} onClick={() => setIsShortened((prev) => !prev)}>
          Show {isShortened ? 'More' : 'Less'}
        </button>
      ) : null}
    </>
  )
}

export default TextAccordion
