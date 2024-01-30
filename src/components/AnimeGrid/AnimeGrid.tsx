import { FC } from 'react'
import AnimeCard, { AnimeCardProps } from '../AnimeCard/AnimeCard'

interface Props {
  className?: string
  data: AnimeCardProps[]
}

const AnimeGrid: FC<Props> = ({ data, className = '' }) => {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5 md:gap-x-5 md:gap-y-6 ${className}`}
    >
      {data.map((item) => (
        <AnimeCard key={item.id} {...item} />
      ))}
    </div>
  )
}

export default AnimeGrid
