import { FC } from 'react'
import * as types from '@prisma/client'

interface Props extends types.Character {
  className?: string
}

const Character: FC<Props> = ({ name, voiceActorName, image, className = '' }) => {
  if (!image) image = '/character-placeholder.jpg'
  return (
    <div className={className}>
      <div className="p-1 rounded-full overflow-hidden aspect-square mb-2">
        <img src={image} alt={name || undefined} className="w-full h-full object-cover object-top rounded-full" />
      </div>
      <div className="relative h-4 md:h-5">
        <p className="text-xs md:text-sm text-neutral-300 text-center whitespace-nowrap absolute left-1/2 translate-x-[-50%]">
          {name}
        </p>
      </div>
      {voiceActorName && (
        <div className="relative h-3 md:h-[13.5px]">
          <p className="text-center text-[8px] md:text-[9px] text-neutral-400 whitespace-nowrap absolute left-1/2 translate-x-[-50%]">
            Voice: {voiceActorName}
          </p>
        </div>
      )}
    </div>
  )
}

export default Character
