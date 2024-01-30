import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma'

export const GET = async (req: NextRequest) => {
  let query = req.nextUrl.searchParams.get('query')
  const amount =
    Number.isNaN(Number(req.nextUrl.searchParams.get('amount'))) || !req.nextUrl.searchParams.get('amount')
      ? 5
      : Number(req.nextUrl.searchParams.get('amount'))

  if (!query) {
    return new NextResponse(null, { status: 400 })
  }

  query = `%${query}%`

  const data =
    await prisma.$queryRaw`SELECT * FROM "Anime" WHERE LOWER("title"->>'english') LIKE LOWER(${query}) ORDER BY "averagePopularity" DESC LIMIT ${amount}`

  return NextResponse.json(data)
}
