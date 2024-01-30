function throttle(func: (...args: any[]) => void, ms: number = 250) {
  let isThrottled = false
  let savedThis: any
  let savedArgs: any

  function wrapper(this: any, ...args: any[]) {
    if (isThrottled) {
      savedArgs = args
      savedThis = this
      return
    }

    func.apply(this, args)
    isThrottled = true

    setTimeout(() => {
      isThrottled = false

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)

        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}

export default throttle
