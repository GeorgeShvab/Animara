import { Day, ScheduleItem, ScheduleResponse } from '@/types'
import axios from 'axios'

async function getSchedule() {
  const { data } = await axios.get<ScheduleResponse>('https://api.anify.tv/schedule?type=anime&fields=[id,title]')

  const schedule: ScheduleItem[] = []

  for (let day in data) {
    schedule.push({
      data: data[day as Day]
        .map((item) => ({
          title: item.title.english || item.title.romaji || item.title.native,
          time: item.airingAt,
          episode: 'Episode ' + item.airingEpisode,
        }))
        .sort((a, b) => a.time - b.time),
      day,
      date: new Date(data[day as Day][data[day as Day].length - 1].airingAt).getUTCDate(),
    })
  }

  schedule.sort((a, b) => a.date - b.date)

  return schedule
}

export default getSchedule
