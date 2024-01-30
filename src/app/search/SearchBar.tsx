'use client'

import useOutsideClick from '@/hooks/useOutsideClick'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react'

interface Props {
  defaultValue: string
}

const SearchBar: FC<Props> = ({ defaultValue = '' }) => {
  const router = useRouter()
  const containerRef = useRef<HTMLFormElement>(null)

  const [value, setValue] = useState<string>(defaultValue)

  const handleSubmit = (e: FormEvent<HTMLFormElement> & { target: { query: HTMLInputElement } }) => {
    e.preventDefault()

    const value = e.target.query.value

    router.push('/search?query=' + value.trim())
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} ref={containerRef}>
      <div className={`h-11 w-full flex gap-1 items-center pl-0.5 pr-5 text-white rounded bg-white`}>
        <div className={`h-10 w-10 flex-initial flex items-center justify-center duration-300 text-neutral-900`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <input
          name="query"
          className={`bg-transparent border-none outline-none flex-1 duration-300 text-neutral-900`}
          onInput={handleInput}
          value={value}
        />
      </div>
    </form>
  )
}

export default SearchBar
