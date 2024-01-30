import { ButtonHTMLAttributes, FC } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  day: string
  date: string
  isSelected?: boolean
}

const ScheduleDay: FC<Props> = ({ day, date, isSelected = false, ...rest }) => {
  return (
    <button
      className={`rounded-lg flex flex-col justify-center items-center gap-0.5 px-10 md:px-4 py-1.5 ${
        isSelected ? 'bg-theme' : 'bg-black hover:bg-theme duration-300'
      }`}
      {...rest}
    >
      <span className="text-white font-bold text-center text-xs md:text-sm capitalize">{day}</span>
      <span className="text-neutral-300 text-[11px] md:text-xs whitespace-nowrap">{date}</span>
    </button>
  )
}

export default ScheduleDay
