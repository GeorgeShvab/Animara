'use client'

import IconButton from '@/ui/IconButton'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

const CancelFilters: FC = () => {
  const searchParams = useSearchParams()

  const query = searchParams.get('query') || ''

  return (
    <IconButton
      className="bg-white !text-theme whitespace-nowrap hover:!text-white !rounded text-sm !h-9 !w-9 flex-[0_0_auto]"
      href={'/search?query=' + query}
      aria-label="Cancel all filters"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M2.39 1.73L1.11 3 9 10.89v4.98c-.04.29.06.6.29.83l4.01 4.01c.39.39 1.02.39 1.41 0 .23-.21.33-.53.29-.83v-2.99l5.84 5.84 1.27-1.27L15 14.35v-.01l-2-1.99-2-2.01L4.15 3.5 2.39 1.73M6.21 3L8.2 5h8.76l-3.85 4.91L15 11.8v-1.05l4.79-6.13a1 1 0 00-.17-1.4c-.19-.14-.4-.22-.62-.22H6.21M11 12.89l2 2v2.69l-2-2v-2.69z" />
      </svg>
    </IconButton>
  )
}

export default CancelFilters
