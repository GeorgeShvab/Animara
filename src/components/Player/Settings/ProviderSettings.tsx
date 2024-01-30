import { FC } from 'react'
import SettingsItem from './SettingsItem'
import { useSettings } from '../hooks/SettingsContext'
import { useEpisode } from '../hooks/EpisodeContext'

interface Props {
  onClose: () => void
}

const ProviderSettings: FC<Props> = ({ onClose }) => {
  const { setProvider, provider } = useSettings()
  const { providers } = useEpisode()

  return (
    <>
      <div className="flex items-center gap-5 bg-black/75 px-5 pt-4 py-2.5 items-center group">
        <button className="text-white" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <p className="text-white text-sm tracking-wider">Provider</p>
      </div>
      <ul>
        {Object.keys(providers).map((item) => (
          <SettingsItem
            key={item}
            onClick={() => setProvider(item)}
            className={item === provider ? '!text-neutral-100' : ''}
          >
            <span
              className={`group-hover:text-neutral-100 text-xs duration-200 tracking-wider ${
                item === provider ? '!text-neutral-100' : 'text-neutral-400'
              }`}
            >
              {item}{' '}
            </span>
          </SettingsItem>
        ))}
      </ul>
    </>
  )
}

export default ProviderSettings
