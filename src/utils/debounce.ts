function debounce(func: (...args: any[]) => void, ms: number = 250) {
  let timer: NodeJS.Timeout

  function wrapper(this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }

  return wrapper
}

export default debounce
