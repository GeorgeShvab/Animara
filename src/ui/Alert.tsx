import { FC } from 'react'

interface Props {
  className?: string
  text: string
}

const Alert: FC<Props> = ({ className, text }) => {
  return (
    <div className={`bg-black/50 px-4 py-2.5 rounded-lg max-w-96 text-center ${className}`}>
      <p className="text-neutral-300 text-sm">{text}</p>
    </div>
  )
}

export default Alert
