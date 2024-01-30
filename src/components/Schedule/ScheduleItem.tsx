import prettifyTime from '@/utils/prettifyTime'
import { FC } from 'react'

interface Props {
  time: number
  title: string
  episode: string
}

const ScheduleItem: FC<Props> = ({ time, title, episode }) => {
  return (
    <div className="bg-black flex justify-between items-center px-4 md:px-6 rounded-lg h-11 md:h-12 gap-2">
      <div className="flex items-center gap-4">
        <span className="text-xs md:text-sm text-neutral-400 md:text-neutral-300 font-bold">{prettifyTime(time)}</span>
        <p className="text-neutral-50 font-bold tracking-wide text-[11px] md:text-sm">{title}</p>
      </div>
      <p className="text-neutral-400 md:text-neutral-300 text-[10px] md:text-[13px] whitespace-nowrap">{episode}</p>
    </div>
  )
}

export default ScheduleItem
