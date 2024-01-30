import { FC } from 'react'
import SearchBar from './SearchBar'
import Nav from './Nav'

const Header: FC = () => {
  return (
    <header className="w-full top-0 left-0 py-5 absolute z-30">
      <div className="px-5 md:px-10 xl:px-16 flex justify-center md:justify-between gap-20 items-center relative">
        <div className="flex gap-20">
          <span className=" font-marko text-2xl md:text-3xl rounded-lg text-white">
            An<span className="text-theme">i</span>mara
          </span>
        </div>
        <div className="lg:absolute left-1/2 lg:translate-x-[-50%] hidden md:block">
          <Nav />
        </div>
        <div className="lg:flex-[0_0_25%] xl:flex-[0_0_30%] xl:max-w-[400px] hidden lg:block">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default Header
