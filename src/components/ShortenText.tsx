'use client'

import { FC, HTMLAttributes, ReactElement, cloneElement, createElement, useRef, useState } from 'react'

interface Props {
  children: ReactElement
  className?: string
  containerEl?: keyof JSX.IntrinsicElements
  buttonProps?: HTMLAttributes<HTMLButtonElement>
}

interface State {
  isCollapsed: boolean
  shouldShowButton: boolean
}

const TextAccordion: FC<Props> = ({ children, buttonProps, containerEl = 'div', className = '', ...rest }) => {
  const ref = useRef<HTMLElement>(null)

  const [state, setIsState] = useState<State>({ isCollapsed: true, shouldShowButton: true })

  return createElement(
    containerEl,
    rest,
    <>
      {cloneElement(children, { ...children.props, ref }, children.props.children)}
      {state.shouldShowButton ? (
        <button {...buttonProps} onClick={() => setIsState((prev) => ({ ...prev, isCollapsed: !prev.isCollapsed }))}>
          Show {state.isCollapsed ? 'More' : 'Less'}
        </button>
      ) : null}
    </>
  )
}

export default TextAccordion
