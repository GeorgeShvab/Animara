import throttle from '@/utils/throttle'
import { useCallback } from 'react'

const useThrottle = (func: (...args: any[]) => void, ms: number = 250, deps: any[] = []) => {
  const memoizedFunc = useCallback(throttle(func, ms), deps)

  return memoizedFunc
}

export default useThrottle
