import { FC } from 'react'
import FooterTrack from './FooterTrack'
import FooterLeftButtons from './FooterLeftButtons'
import FooterRightButtons from './FooterRightButtons'

const Footer: FC = () => {
  return (
    <div className="absolute flex items-center left-0 bottom-0 px-1.5 py-2 md:p-2 lg:p-3 z-20 w-full gap-2 md:gap-3 lg:gap-4">
      <FooterLeftButtons className="px-1 lg:px-2" />
      <div className="flex items-center flex-1">
        <FooterTrack />
      </div>
      <FooterRightButtons className="px-1 lg:px-2" />
    </div>
  )
}

export default Footer
