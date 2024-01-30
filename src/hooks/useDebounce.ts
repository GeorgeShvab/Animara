import debounce from '@/utils/debounce'
import { useCallback } from 'react'

const useDebounce = (func: (...args: any[]) => void, ms: number = 250, deps: any[] = []) => {
  const memoizedFunc = useCallback(debounce(func, ms), deps)

  return memoizedFunc
}

export default useDebounce
