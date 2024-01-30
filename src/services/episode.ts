import { Episode } from '@/types'
import prisma from '../../prisma/prisma'

const EpisodeService = {
  async getByAnimeId(id: number | string) {
    return prisma.episode.findMany({ where: { animeId: Number(id) }, orderBy: { number: 'asc' } }) as Promise<Episode[]>
  },
}

export default EpisodeService
