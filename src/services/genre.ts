import { Format, SortOrder } from '@/types'
import prisma from '../../prisma/prisma'
import { Genre, Prisma } from '@prisma/client'

interface GetParams {
  page?: number
  take?: number
  sort?: 'title' | 'count'
  sortOrder?: SortOrder
  format?: Format
}

const GenreService = {
  async getById(id: string) {
    return prisma.genre.findUnique({ where: { id } })
  },

  async get({ sort = 'count', sortOrder = 'desc', format = 'all', page = 1, take = 20 }: GetParams) {
    const sortSqlString = Prisma.sql([(sort === 'title' ? `"title"` : '"count"') + ' ' + sortOrder])
    const formatSqlString = Prisma.sql([
      format === 'movie' ? "format = 'MOVIE'" : format === 'series' ? "format != 'MOVIE'" : 'TRUE',
    ])

    const dataPromise = prisma.$queryRaw`SELECT g.*, (SELECT COUNT(*) FROM "_AnimeToGenre" ag JOIN 
      "Anime" a ON a.id = ag."A" WHERE ag."B" = g.id AND ${formatSqlString})::int as animeCount 
      FROM "Genre" g ORDER BY ${sortSqlString} OFFSET ${take * (page - 1)} LIMIT ${take}` as Promise<
      (Genre & { animeCount: number })[]
    >

    const countPromise = prisma.$queryRaw`SELECT COUNT("id")::int FROM "Genre"` as Promise<[{ count: number }]>

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, count: count[0].count }
  },

  async getByIds(ids: string[]) {
    const data =
      await prisma.$queryRaw`SELECT g.*, (SELECT COUNT(ag.*)::int FROM "_AnimeToGenre" ag WHERE ag."B" = g."id") AS "animeCount" FROM "Genre" g WHERE "id" IN (${Prisma.join(
        ids
      )})`

    return data as (Genre & { animeCount: number })[]
  },
}

export default GenreService
