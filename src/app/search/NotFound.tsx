import { FC } from 'react'

interface Props {
  query: string
}

const NotFound: FC<Props> = ({ query }) => {
  return (
    <div className="">
      <div className="flex justify-center h-64 md:h-80 mb-10">
        <img src="/not-found.png" height="100%" width="auto" alt="Not Found" />
      </div>
      <p className="text-white text-center text-lg font-bold">
        Nothing was found for <span className="text-theme">{query}</span>
      </p>
    </div>
  )
}

export default NotFound
