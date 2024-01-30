'use client'

import { FC, useState } from 'react'
import ScheduleDay from './ScheduleDay'
import ScheduleItem from './ScheduleItem'
import getShortenedMonth from '@/utils/getShortenedMonth'
import * as types from '@/types'

interface Props {
  data: types.ScheduleItem[]
  shortening?: boolean
}

const Schedule: FC<Props> = ({ data, shortening = true }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [isAllRowsShown, setIsAllRowsShown] = useState<boolean>(false)

  const rows = isAllRowsShown || !shortening ? data[selectedDay].data : data[selectedDay].data.slice(0, 5)

  return (
    <div className="bg-black-light p-2 md:p-4 rounded-lg">
      <div className="pb-1 md:pb-0 flex overflow-auto md:grid grid-cols-7 gap-2 mb-3 md:mb-4">
        {data.map((item, index) => (
          <ScheduleDay
            key={index}
            isSelected={index === selectedDay}
            onClick={() => setSelectedDay(index)}
            date={getShortenedMonth(new Date(item.data[0].time).getUTCMonth()) + ' ' + item.date}
            day={item.day}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((item, index) => (
          <ScheduleItem key={index} title={item.title} time={item.time} episode={item.episode} />
        ))}
        {shortening && data[selectedDay].data.length > 5 ? (
          <button
            className="bg-black flex justify-center items-center h-11 md:h-12 rounded-lg group"
            onClick={() => setIsAllRowsShown((prev) => !prev)}
          >
            <span className="text-theme font-bold tracking-wide text-sm group-hover:text-theme-dark duration-300">
              {isAllRowsShown ? 'SHOW LESS' : 'SHOW MORE'}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Schedule
