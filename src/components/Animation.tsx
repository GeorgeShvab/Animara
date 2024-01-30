import { FC, ReactElement, cloneElement } from 'react'

interface Props {
  children: ReactElement
  animation: boolean
  className?: string
  animationClassName?: string
}

const Animation: FC<Props> = ({ children, animation, className = '', animationClassName = '' }) => {
  return cloneElement(
    children,
    {
      ...children.props,
      className: `${children.props.className} ${className} ${animation ? animationClassName : ''}`,
    },
    children.props.children
  )
}

export default Animation
