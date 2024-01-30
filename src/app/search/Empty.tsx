import { FC } from 'react'

const Empty: FC = () => {
  return (
    <div className="">
      <div className="flex justify-center h-64 md:h-80 mb-10">
        <img src="/enter-input.png" height="100%" width="auto" alt="Not Found" />
      </div>
      <p className="text-white text-center text-lg font-bold">Enter a keyword or phrase...</p>
    </div>
  )
}

export default Empty
