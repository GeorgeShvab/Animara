import { useRef, useState } from 'react'

interface Params {
  time?: number
}

const useHover = (data?: Params) => {
  const time = useRef<NodeJS.Timeout>()

  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleHover = () => {
    clearTimeout(time.current)

    setIsHovered(true)
  }

  const handleBlur = () => {
    if (data?.time) {
      time.current = setTimeout(() => {
        setIsHovered(false)
      }, data?.time)
    } else {
      setIsHovered(false)
    }
  }

  return { isHovered, handleBlur, handleHover }
}

export default useHover
