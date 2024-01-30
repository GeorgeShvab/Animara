import Button from '@/ui/Button'
import { Genre } from '@prisma/client'
import { FC } from 'react'

type Props = Pick<Genre, 'description'> & { title: string; href: string; className?: string }

const CollectionCard: FC<Props> = ({ title, description, href, className = '' }) => {
  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <h1 className="font-marko font-bold text-3xl text-white mb-6">{title}</h1>
      <div>
        <p className="text-neutral-300 text-sm leading-6 mb-8">{description}</p>
        <Button
          endIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          }
          className="w-fit"
          href={href}
        >
          To Collection
        </Button>
      </div>
    </div>
  )
}

export default CollectionCard
