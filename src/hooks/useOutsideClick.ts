import { RefObject, useEffect } from 'react'

const useOutsideClick = (
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  func: () => void,
  selectorToIgnore?: string
) => {
  const handleClick = (e: MouseEvent) => {
    if (selectorToIgnore && (e.target as HTMLElement).closest(selectorToIgnore)) return

    if (Array.isArray(ref)) {
      for (let item of ref) {
        if (item.current?.contains(e.target as HTMLElement)) {
          return
        }
      }
    } else {
      if (ref.current?.contains(e.target as HTMLElement)) {
        return
      }
    }

    func()
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
  }, [])
}

export default useOutsideClick
