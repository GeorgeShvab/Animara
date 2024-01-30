import React, { useEffect, useRef } from 'react'
import useThrottle from './useThrottle'

const useDrag = <T extends HTMLElement = HTMLDivElement>(onDrag: (x: number, y: number) => void) => {
  const ref = useRef<T>(null)
  const isDown = useRef<boolean>(false)

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
  }

  const onTouchStart = () => {
    isDown.current = true
  }

  let handleTouchMove = (e: TouchEvent) => {
    const el = ref.current

    if (isDown.current && el) {
      const elementPosition = el.getBoundingClientRect()

      const screenX = document.fullscreenElement ? 0 : window.screenX // Because for some reason in fullscreen screenX is not 0 despite the window is not scrolled
      const screenY = document.fullscreenElement ? 0 : window.screenY // Because for some reason in fullscreen screenY is not 0 despite the window is not scrolled

      let x = (e.changedTouches[0].clientX - (elementPosition.x + screenX)) / elementPosition.width
      let y = (e.changedTouches[0].clientY - (elementPosition.y + screenY)) / elementPosition.height

      x = x < 0 ? 0 : x > 1 ? 1 : x
      y = y < 0 ? 0 : y > 1 ? 1 : y

      onDrag(x, y)
    }
  }

  handleTouchMove = useThrottle(handleTouchMove, 10)

  let handleMouseMove = (e: MouseEvent) => {
    const el = ref.current

    if (isDown.current && el) {
      const elementPosition = el.getBoundingClientRect()

      const screenX = document.fullscreenElement ? 0 : window.screenX // Because for some reason in fullscreen screenX is not 0 despite the window is not scrolled
      const screenY = document.fullscreenElement ? 0 : window.screenY // Because for some reason in fullscreen screenY is not 0 despite the window is not scrolled

      let x = (e.clientX - (elementPosition.x + screenX)) / elementPosition.width
      let y = (e.clientY - (elementPosition.y + screenY)) / elementPosition.height

      x = x < 0 ? 0 : x > 1 ? 1 : x
      y = y < 0 ? 0 : y > 1 ? 1 : y

      onDrag(x, y)
    }
  }

  handleMouseMove = useThrottle(handleMouseMove, 10)

  const onClick = (e: React.MouseEvent) => {
    const el = ref.current

    if (el) {
      const elementPosition = el.getBoundingClientRect()

      const screenX = document.fullscreenElement ? 0 : window.screenX // Because for some reason in fullscreen screenX is not 0 despite the window is not scrolled
      const screenY = document.fullscreenElement ? 0 : window.screenY // Because for some reason in fullscreen screenY is not 0 despite the window is not scrolled

      let x = (e.clientX - (elementPosition.x + screenX)) / elementPosition.width
      let y = (e.clientY - (elementPosition.y + screenY)) / elementPosition.height

      x = x < 0 ? 0 : x > 1 ? 1 : x
      y = y < 0 ? 0 : y > 1 ? 1 : y

      onDrag(x, y)
    }
  }

  const handleMouseUp = () => {
    isDown.current = false
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [])

  return {
    onMouseDown,
    onClick,
    onTouchStart,
    ref,
  }
}

export default useDrag
