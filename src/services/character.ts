import prisma from '../../prisma/prisma'

const CharacterService = {
  async getByAnimeId(id: string | number) {
    return prisma.character.findMany({ where: { animeId: Number(id) }, orderBy: { name: 'asc' } })
  },
}

export default CharacterService
