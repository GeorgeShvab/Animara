import { Anime } from '@/types'
import { FC } from 'react'

type Props = Pick<Anime, 'country' | 'format' | 'year' | 'status' | 'season'> & { nativeTitle: string }

const AnimeDetails: FC<Props> = ({ nativeTitle, status, season, year, country, format }) => {
  return (
    <div className="flex-[0_0_245px] md:pt-[92px]">
      <div className="flex flex-col">
        <div className="flex gap-2 leading-6">
          <p className="text-[15px] md:text-base text-neutral-400">Original name:</p>
          <p className="text-[15px] md:text-base text-neutral-100">{nativeTitle}</p>
        </div>
        <div className="flex gap-2 leading-6">
          <p className="text-[15px] md:text-base text-neutral-400">Status:</p>
          <p className="text-[15px] md:text-base text-neutral-100 lowercase first-letter:capitalize">{status}</p>
        </div>
        <div className="flex gap-2 leading-6">
          <p className="text-[15px] md:text-base text-neutral-400">Season:</p>
          <p className="text-[15px] md:text-base text-neutral-100 lowercase first-letter:capitalize">
            {season} {year}
          </p>
        </div>
        <div className="flex gap-2 leading-6">
          <p className="text-[15px] md:text-base text-neutral-400">Country:</p>
          <p className="text-[15px] md:text-base text-neutral-100 lowercase first-letter:capitalize">{country}</p>
        </div>
        <div className="flex gap-2 leading-6">
          <p className="text-[15px] md:text-base text-neutral-400">Format:</p>
          <p className="text-[15px] md:text-base text-neutral-100">{format}</p>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetails
