import { Episode } from '@/types'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  episodes: Episode[]
  episode: number
}

const EpisodesList: FC<Props> = ({ episode, episodes }) => {
  return (
    <ul className="h-full">
      {episodes.map((item) => (
        <li
          key={item.id}
          className={`relative ${
            item.number === episode ? 'bg-[#202020]' : 'odd:bg-black-lighter even:bg-black-light'
          }`}
        >
          <Link
            key={item.id}
            className={`px-2 h-10 flex items-center flex gap-3 group`}
            href={{ query: { ep: item.number } }}
            scroll={false}
          >
            <span
              className={`absolute w-1 h-full bg-theme left-0 top-0 ${item.number === episode ? '' : 'hidden'}`}
            ></span>
            <span
              className={`text-sm duration-200 md:text-[15px] font-bold h-10 w-10 flex justify-center items-center ${
                item.number === episode ? 'text-theme' : 'text-neutral-500 group-hover:text-neutral-200'
              }`}
            >
              {item.number}
            </span>
            <span
              className={`text-xs duration-200 ${
                episode === item.number ? 'text-neutral-100' : 'text-neutral-500 group-hover:text-neutral-200'
              }`}
            >
              {/^ep\s\d+/i.test(item.title) ? 'Episode ' + item.number : item.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default EpisodesList
