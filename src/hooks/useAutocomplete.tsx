import { Anime } from '@/types'
import axios from 'axios'
import { useState } from 'react'

const useAutocomplete = () => {
  const [data, setData] = useState<Anime[]>([])

  const makeRequest = async (query: string) => {
    if (!query.trim()) return

    const { data } = await axios.get<Anime[]>('/api/search/autocomplete', { params: { query, amount: 3 } })

    setData(data)
  }

  const clearData = () => setData([])

  return { data, makeRequest, clearData }
}

export default useAutocomplete
