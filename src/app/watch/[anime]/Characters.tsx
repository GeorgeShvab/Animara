'use client'

import Character from '@/components/Character'
import * as types from '@prisma/client'
import { FC, useState } from 'react'
import Section from '@/components/Section'
import Button from '@/ui/Button'

interface Props {
  data: types.Character[]
}

const Characters: FC<Props> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <Section
      title="Characters"
      className="bg-black-light"
      button={
        data.length > 18 ? (
          <Button
            className={`font-bold !text-theme !bg-transparent py-0 !px-0 text-sm md:text-base !h-10 hover:!text-theme-dark`}
            onClick={() => setIsExpanded((prev) => !prev)}
            endIcon={
              isExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3.5}
                  stroke="currentColor"
                  className="h-5 w-5 md:w-6 md:h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3.5}
                  stroke="currentColor"
                  className="h-5 w-5 md:w-6 md:h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )
            }
          >
            {isExpanded ? 'SHOW LESS' : 'SHOW MORE'}
          </Button>
        ) : undefined
      }
    >
      <div className={`grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-x-3 gap-y-5`}>
        {data.slice(0, isExpanded ? data.length : 18).map((item) => (
          <Character key={item.id} {...item} className="[&>div:first-child]:bg-[var(--anime-theme-darker)]" />
        ))}
      </div>
    </Section>
  )
}

export default Characters
