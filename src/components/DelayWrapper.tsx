import { FC, ReactElement, cloneElement, useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
  children: ReactElement<{ animation: boolean; [key: string]: any }>
  show: boolean
  ms?: number
}

interface State {
  isMounted: boolean
  isAnimation: boolean
}

const DelayWrapper: FC<Props> = ({ children, show, ms = 250 }) => {
  const timer = useRef<NodeJS.Timeout>()
  const [state, setState] = useState<State>({ isMounted: false, isAnimation: false })

  useLayoutEffect(() => {
    if (show) {
      clearTimeout(timer.current)
      if (state.isMounted) {
        setState({ isAnimation: true, isMounted: true })
      } else {
        setState({ isAnimation: false, isMounted: true })
      }
    } else {
      setState((prev) => ({ ...prev, isAnimation: false }))
      timer.current = setTimeout(() => {
        setState({ isAnimation: false, isMounted: false })
      }, ms)
    }
  }, [show])

  useEffect(() => {
    if (state.isMounted) {
      setState({ isAnimation: true, isMounted: true })
    }
  }, [state.isMounted])

  if (!state.isMounted) return null

  return cloneElement(children, { ...children.props, animation: state.isAnimation }, children.props.children)
}

export default DelayWrapper
