'use client'

import useAutocomplete from '@/hooks/useAutocomplete'
import useOutsideClick from '@/hooks/useOutsideClick'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import usePage from '@/hooks/usePage'

const SearchBar: FC = () => {
  const router = useRouter()
  const containerRef = useRef<HTMLFormElement>(null)

  const page = usePage()

  let searchTheme = 'white'

  if (['', 'watch'].includes(page)) {
    searchTheme = 'dark'
  }

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  useOutsideClick(containerRef, () => setIsFocused(false))

  const { data, makeRequest, clearData } = useAutocomplete()

  const throttledRequest = useDebounce(makeRequest, 400)

  const handleSubmit = (e: FormEvent<HTMLFormElement> & { target: { query: HTMLInputElement } }) => {
    e.preventDefault()

    const value = e.target.query.value

    router.push('/search?query=' + value.trim())
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    if (e.target.value.trim()) {
      throttledRequest(e.target.value.trim())
    } else {
      clearData()
    }
  }

  return (
    <form className="w-full relative" onClick={() => setIsFocused(true)} onSubmit={handleSubmit} ref={containerRef}>
      <div
        className={`h-10 w-full flex gap-1 items-center pl-0.5 pr-4 text-white ${
          searchTheme === 'dark' ? 'bg-black/50' : 'bg-white'
        } ${data.length && isFocused ? 'rounded-t-lg' : 'rounded-lg'}`}
      >
        <div
          className={`h-10 w-10 flex-initial flex items-center justify-center duration-300 ${
            isFocused
              ? searchTheme === 'dark'
                ? 'text-white'
                : 'text-neutral-900'
              : searchTheme === 'dark'
              ? 'text-neutral-400'
              : 'text-neutral-400'
          }`}
        >
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
          className={`bg-transparent border-none outline-none flex-1 duration-300 ${
            isFocused
              ? searchTheme === 'dark'
                ? 'text-white'
                : 'text-neutral-900'
              : searchTheme === 'dark'
              ? 'text-neutral-400'
              : 'text-neutral-400'
          }`}
          autoComplete="off"
          onInput={handleInput}
          value={value}
        />
      </div>
      {data.length && isFocused ? (
        <ul
          className={`absolute w-full top-full rounded-b-lg ${
            searchTheme === 'dark' ? '' : 'border-t border-neutral-200'
          }`}
        >
          {data.map((item) => (
            <li
              key={item.id}
              className={`last:rounded-b-lg w-full first:pt-4 last:pb-4 px-4 ${
                searchTheme === 'dark' ? 'bg-black/50 py-2' : 'py-2.5 bg-white first:border-b border-neutral-200'
              }`}
            >
              <Link href={'/watch/' + item.id} className="w-full group flex gap-4 xl:gap-5">
                <div className="flex-[0_0_auto] w-16">
                  <img
                    src={item.coverImage}
                    alt={item.title.english || item.title.romaji || item.title.native}
                    width="100%"
                    className="w-full h-auto rounded"
                  />
                </div>
                <div className="py-2">
                  <p
                    className={`lg:text-sm xl:text-[15px] font-bold mb-2 duration-300 group-hover:text-theme ${
                      searchTheme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.title.english}
                  </p>
                  <div
                    className={`flex gap-1.5 xl:gap-3 lg:text-[10px] xl:text-xs ${
                      searchTheme === 'dark' ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    <p>{item.duration} Minutes</p>
                    {item.format !== 'MOVIE' ? <p>{item.totalEpisodes} Episodes</p> : null}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  )
}

export default SearchBar
