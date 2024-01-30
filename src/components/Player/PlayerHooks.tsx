import { FC } from 'react'
import useChromeMediaHub from './hooks/useChromeMediaHub'
import useKeys from './hooks/useKeys'
import useStalling from './hooks/useStalling'

const PlayerHooks: FC = () => {
  useKeys()
  useChromeMediaHub()
  useStalling()

  return null
}

export default PlayerHooks
