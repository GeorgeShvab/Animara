import { Prisma } from '@prisma/client'
import prisma from '../../prisma/prisma'
import { Format, Sort, SortOrder, Anime } from '@/types'

interface SearchParams {
  format?: Format
  page?: number
  take?: number
  sort?: Sort
  sortOrder?: SortOrder
  query: string
  genre?: string
  status?: 'finished' | 'releasing' | 'all'
}

interface GetParams {
  format?: Format
  page?: number
  take?: number
  sort?: Sort
  sortOrder?: SortOrder
  genre?: string
  status?: string
}

interface GetPopularParams {
  format?: Format
  page?: number
  take?: number
  genre?: string
  status?: string
  sort?: string
  sortOrder?: SortOrder
}

interface GetRelatedParams {
  id: number | string
  page?: number
  take?: number
}

interface GetSimilarParams {
  id: number | string
  format?: Format
  page?: number
  take?: number
  genre?: string
  status?: string
  sort?: string
  sortOrder?: SortOrder
}

const AnimeService = {
  getById(id: number | string) {
    return prisma.anime.findUnique({ where: { id: Number(id) } }) as any as Promise<Anime>
  },

  async getByIds(ids: (number | string)[]) {
    return prisma.anime.findMany({ where: { id: { in: ids.map((item) => Number(item)) } } }) as Promise<Anime[]>
  },

  async getSimilar({
    id,
    sortOrder = 'desc',
    genre = 'all',
    format = 'all',
    take = 50,
    status = 'all',
    sort = 'popularity',
    page = 1,
  }: GetSimilarParams) {
    id = Number(id)
    const formatSqlString = Prisma.sql([
      format === 'movie' ? "format = 'MOVIE'" : format === 'series' ? "format != 'MOVIE'" : 'TRUE',
    ])
    const genreSqlString = Prisma.sql([genre === 'all' ? 'TRUE' : `'${genre}' = ag."B"`])
    const distinctSqlString = Prisma.sql([genre === 'all' ? 'DISTINCT' : ''])
    const sortSqlString = Prisma.sql([
      (sort === 'alphabet' ? `(title->>'english')` : sort === 'rating' ? '"averageRating"' : '"averagePopularity"') +
        ' ' +
        sortOrder,
    ])
    const statusSqlString = Prisma.sql([
      status === 'finished' ? "status = 'FINISHED'" : status === 'releasing' ? "status = 'RELEASING'" : 'TRUE',
    ])

    const dataPromise = prisma.$queryRaw`SELECT ${distinctSqlString}${Prisma.sql([
      sort === 'alphabet' ? " (title->>'english')," : '',
    ])} a.* FROM "Anime" a WHERE ARRAY_LENGTH(ARRAY
        (
          SELECT UNNEST(ARRAY(SELECT ag."B" FROM "_AnimeToGenre" ag WHERE ag."A" = ${id}))
          INTERSECT
          SELECT UNNEST(ARRAY(SELECT ag."B" FROM "_AnimeToGenre" ag WHERE a."id" = ag."A"))
        ), 1) > 4 AND a."id" != ${id} AND ${formatSqlString} AND ${genreSqlString} AND ${statusSqlString} ORDER BY ${sortSqlString}
          OFFSET ${(page - 1) * take} LIMIT ${take}` as Promise<Anime[]>

    const countPromise =
      prisma.$queryRaw`SELECT (COUNT(${distinctSqlString} a."id"))::int FROM "Anime" a WHERE ARRAY_LENGTH(ARRAY
  (
    SELECT UNNEST(ARRAY(SELECT ag."B" FROM "_AnimeToGenre" ag WHERE ag."A" = ${id}))
    INTERSECT
    SELECT UNNEST(ARRAY(SELECT ag."B" FROM "_AnimeToGenre" ag WHERE a."id" = ag."A"))
  ), 1) > 4 AND a."id" != ${id} AND ${formatSqlString} AND ${genreSqlString} AND ${statusSqlString}` as Promise<
        [{ count: number }]
      >

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, count: count[0].count }
  },

  async getRelated({
    id,
    sortOrder = 'desc',
    genre = 'all',
    format = 'all',
    take = 50,
    status = 'all',
    sort = 'popularity',
    page = 1,
  }: GetSimilarParams) {
    id = Number(id)
    const formatSqlString = Prisma.sql([
      format === 'movie' ? "format = 'MOVIE'" : format === 'series' ? "format != 'MOVIE'" : 'TRUE',
    ])
    const genreSqlString = Prisma.sql([genre === 'all' ? 'TRUE' : `'${genre}' = ag."B"`])
    const distinctSqlString = Prisma.sql([genre === 'all' ? 'DISTINCT' : ''])
    const sortSqlString = Prisma.sql([
      (sort === 'alphabet' ? `(title->>'english')` : sort === 'rating' ? '"averageRating"' : '"averagePopularity"') +
        ' ' +
        sortOrder,
    ])
    const statusSqlString = Prisma.sql([
      status === 'finished' ? "status = 'FINISHED'" : status === 'releasing' ? "status = 'RELEASING'" : 'TRUE',
    ])

    const dataPromise = prisma.$queryRaw`SELECT ${distinctSqlString}${Prisma.sql([
      sort === 'alphabet' ? " (title->>'english')," : '',
    ])} ra.* FROM "AnimeRelation" ar JOIN "Anime" ra ON ar."anime2Id" = ra."id" WHERE ar."anime1Id" = ${id} AND ${formatSqlString} AND ${genreSqlString} AND ${statusSqlString} ORDER BY ${sortSqlString}
          OFFSET ${(page - 1) * take} LIMIT ${take}` as Promise<Anime[]>

    const countPromise =
      prisma.$queryRaw`SELECT (COUNT(${distinctSqlString} ra."id"))::int FROM "AnimeRelation" ar JOIN "Anime" ra ON ar."anime2Id" = ra."id" WHERE ar."anime1Id" = ${id} AND ${formatSqlString} AND ${genreSqlString} AND ${statusSqlString}` as Promise<
        [{ count: number }]
      >

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, count: count[0].count }
  },

  async getPopular({
    sortOrder = 'desc',
    genre = 'all',
    format = 'all',
    take = 50,
    status = 'all',
    sort = 'popularity',
    page = 1,
  }: GetPopularParams) {
    const formatSqlString = Prisma.sql([
      format === 'movie' ? "format = 'MOVIE'" : format === 'series' ? "format != 'MOVIE'" : 'TRUE',
    ])
    const genreSqlString = Prisma.sql([genre === 'all' ? 'TRUE' : `'${genre}' = ag."B"`])
    const distinctSqlString = Prisma.sql([genre === 'all' ? 'DISTINCT' : ''])
    const sortSqlString = Prisma.sql([
      (sort === 'alphabet' ? `(title->>'english')` : sort === 'rating' ? '"averageRating"' : '"averagePopularity"') +
        ' ' +
        sortOrder,
    ])
    const statusSqlString = Prisma.sql([
      status === 'finished' ? "status = 'FINISHED'" : status === 'releasing' ? "status = 'RELEASING'" : 'TRUE',
    ])

    const dataPromise = prisma.$queryRaw`SELECT ${distinctSqlString}${Prisma.sql([
      sort === 'alphabet' ? " (title->>'english')," : '',
    ])} a.* FROM "Anime" a JOIN "_AnimeToGenre" ag ON a.id = ag."A" WHERE
      "averagePopularity" > 50000 AND ${formatSqlString} AND ${genreSqlString} AND ${statusSqlString} ORDER BY ${sortSqlString} OFFSET ${
      take * (page - 1)
    } LIMIT ${take}` as Promise<Anime[]>

    const countPromise =
      prisma.$queryRaw`SELECT (COUNT(${distinctSqlString} "id"))::int FROM "Anime" a JOIN "_AnimeToGenre" ag ON a.id = ag."A" WHERE
    "averagePopularity" > 50000 AND ${formatSqlString} AND ${genreSqlString} AND ${statusSqlString}` as Promise<
        [{ count: number }]
      >

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, count: count[0].count }
  },

  async get({
    genre = 'all',
    format = 'all',
    sort = 'popularity',
    sortOrder = 'desc',
    status = 'all',
    take = 50,
    page = 1,
  }: GetParams) {
    const formatSqlString = Prisma.sql([
      format === 'movie' ? "format = 'MOVIE'" : format === 'series' ? "format != 'MOVIE'" : 'TRUE',
    ])
    const genreSqlString = Prisma.sql([genre === 'all' ? 'TRUE' : `'${genre}' = ag."B"`])
    const sortSqlString = Prisma.sql([
      (sort === 'alphabet' ? `(title->>'english')` : sort === 'rating' ? '"averageRating"' : '"averagePopularity"') +
        ' ' +
        sortOrder,
    ])
    const distinctSqlString = Prisma.sql([genre === 'all' ? 'DISTINCT' : ''])
    const statusSqlString = Prisma.sql([
      status === 'finished' ? "status = 'FINISHED'" : status === 'releasing' ? "status = 'RELEASING'" : 'TRUE',
    ])

    const dataPromise = prisma.$queryRaw`SELECT ${distinctSqlString}${Prisma.sql([
      sort === 'alphabet' ? " (title->>'english')," : '',
    ])} a.* FROM "Anime" a JOIN "_AnimeToGenre" ag ON a.id = ag."A" WHERE 
      ${statusSqlString} AND ${formatSqlString} AND ${genreSqlString} ORDER BY ${sortSqlString} OFFSET ${
      take * (page - 1)
    } LIMIT ${take}` as Promise<Anime[]>

    const countPromise =
      prisma.$queryRaw`SELECT (COUNT(${distinctSqlString} "id"))::int FROM "Anime" a JOIN "_AnimeToGenre" ag ON a.id = ag."A" WHERE 
      ${statusSqlString} AND ${formatSqlString} AND ${genreSqlString}` as Promise<[{ count: number }]>

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, count: count[0].count }
  },

  async search({
    query,
    format = 'all',
    sort = 'popularity',
    sortOrder = 'desc',
    status = 'all',
    genre = 'all',
    page = 1,
    take = 50,
  }: SearchParams) {
    if (!query) return { data: [], count: 0 }
    query = `%${query}%`
    const formatSqlString = Prisma.sql([
      format === 'movie' ? "format = 'MOVIE'" : format === 'series' ? "format != 'MOVIE'" : 'TRUE',
    ])
    const genreSqlString = Prisma.sql([genre === 'all' ? 'TRUE' : `'${genre}' = ag."B"`])
    const sortSqlString = Prisma.sql([
      (sort === 'alphabet' ? `(title->>'english')` : sort === 'rating' ? '"averageRating"' : '"averagePopularity"') +
        ' ' +
        sortOrder,
    ])
    const statusSqlString = Prisma.sql([
      status === 'finished' ? "status = 'FINISHED'" : status === 'releasing' ? "status = 'RELEASING'" : 'TRUE',
    ])
    const distinctSqlString = Prisma.sql([genre === 'all' ? 'DISTINCT' : ''])

    const dataPromise = prisma.$queryRaw`SELECT ${distinctSqlString}${Prisma.sql([
      sort === 'alphabet' ? " (title->>'english')," : '',
    ])} a.* FROM "Anime" a JOIN "_AnimeToGenre" ag ON a.id = ag."A" WHERE 
    (LOWER("title"->>'english') LIKE LOWER(${query}) OR 
    LOWER("title"->>'romaji') LIKE LOWER(${query}) OR 
    LOWER("title"->>'native') LIKE LOWER(${query})) AND 
    ${statusSqlString} AND ${formatSqlString} AND ${genreSqlString} ORDER BY ${sortSqlString} OFFSET ${
      take * (page - 1)
    } LIMIT ${take}` as Promise<Anime[]>

    const countPromise =
      prisma.$queryRaw`SELECT (COUNT(${distinctSqlString} "id"))::int FROM "Anime" a JOIN "_AnimeToGenre" ag ON a.id = ag."A" WHERE 
    (LOWER("title"->>'english') LIKE LOWER(${query}) OR 
    LOWER("title"->>'romaji') LIKE LOWER(${query}) OR 
    LOWER("title"->>'native') LIKE LOWER(${query})) AND 
    ${statusSqlString} AND ${formatSqlString} AND ${genreSqlString}` as Promise<[{ count: number }]>

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, count: count[0].count }
  },
}

export default AnimeService
