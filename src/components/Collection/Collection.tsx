import { Genre } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'

interface Props extends Genre {
  animeCount: number
}

const Collection: FC<Props> = ({ animeCount, title, image, id }) => {
  return (
    <Link href={'/collections/' + id}>
      <div
        className="rounded-lg overflow-hidden aspect-[2/1] w-full"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
      >
        <div
          className="px-6 pr-4 py-4 md:px-8 md:py-6 md:pr-6 flex flex-col justify-end h-full"
          style={{ background: 'linear-gradient(rgba(0,0,0,0) 25%, rgba(0,0,0,0.4) 100%)' }}
        >
          <div className="flex justify-between items-end">
            <h2 className="text-white font-bold text-lg">{title}</h2>
            <div className="rounded-lg px-4 py-1.5 bg-theme text-white font-medium text-sm">
              {animeCount} &nbsp; Anime
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Collection
