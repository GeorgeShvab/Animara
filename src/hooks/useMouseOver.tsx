import { useEffect, useRef, useState } from 'react'

interface Params {
  onLeave?: () => void
  onEnter?: () => void
  timeout?: number
}

const useMouseOver = ({ timeout, onEnter, onLeave }: Params) => {
  const timer = useRef<NodeJS.Timeout>()

  const onMouseEnter = () => {
    clearTimeout(timer.current)
    onEnter && onEnter()
  }

  const onMouseLeave = () => {
    clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      onLeave && onLeave()
    }, timeout)
  }

  return { handlers: { onMouseLeave, onMouseEnter } }
}

export default useMouseOver
