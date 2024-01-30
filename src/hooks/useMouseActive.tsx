import { useRef } from 'react'

interface Params {
  onActive?: () => void
  onInactive?: () => void
  timeout?: number
}

const useMouseActive = ({ timeout, onActive, onInactive }: Params) => {
  const timer = useRef<NodeJS.Timeout>()

  const handleInactive = () => {
    onInactive && onInactive()
  }

  const onMouseMove = () => {
    onActive && onActive()
    clearTimeout(timer.current)

    timer.current = setTimeout(handleInactive, timeout)
  }

  return { handlers: { onMouseMove, onClick: onMouseMove } }
}

export default useMouseActive
