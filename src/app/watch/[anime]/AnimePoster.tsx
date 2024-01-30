import { FC } from 'react'

interface Props {
  src: string
  alt?: string
}

const AnimePoster: FC<Props> = ({ src, alt }) => {
  return (
    <div className="w-[255px] md:w-[245px]">
      <div className="aspect-[180/255] w-full md:translate-y-[68px] bg-black-light rounded-lg p-2 md:p-2.5 shadow-lg">
        <img src={src} alt={alt} width="100%" height="100%" className="object-cover w-full h-full" />
      </div>
    </div>
  )
}

export default AnimePoster
