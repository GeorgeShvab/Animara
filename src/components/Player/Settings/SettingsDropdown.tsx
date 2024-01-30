import { FC, useState } from 'react'
import SettingsItem from './SettingsItem'
import ProviderSettings from './ProviderSettings'
import QualitySettings from './QualitySettings'
import VolumeSettings from './VolumeSettings'
import { useSettings } from '../hooks/SettingsContext'

const SettingsDropdown: FC = () => {
  const [settingsSection, setSettingsSection] = useState<string | undefined>()
  const { provider, volume, quality } = useSettings()

  let section = null

  if (settingsSection === 'quality') {
    section = <QualitySettings onClose={() => setSettingsSection(undefined)} />
  } else if (settingsSection === 'providers') {
    section = <ProviderSettings onClose={() => setSettingsSection(undefined)} />
  } else if (settingsSection === 'volume') {
    section = <VolumeSettings onClose={() => setSettingsSection(undefined)} />
  }

  return (
    <div className="rounded-lg overflow-hidden w-56">
      {settingsSection ? (
        <div className="outside-click-ignore">{section}</div>
      ) : (
        <ul>
          <SettingsItem onClick={() => setSettingsSection('quality')} className="outside-click-ignore">
            <>
              <span className="text-white group-hover:text-neutral-200 duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                </svg>
              </span>
              <span className="text-white group-hover:text-neutral-200 duration-200 text-xs tracking-wider">
                Quality
              </span>
              <span className="text-neutral-300 group-hover:text-neutral-200 duration-200 text-xs ml-auto text-right capitalize">
                {quality === 'default' ? 'auto' : quality}
              </span>
            </>
          </SettingsItem>
          <SettingsItem onClick={() => setSettingsSection('providers')} className="outside-click-ignore">
            <>
              <span className="text-white group-hover:text-neutral-200 duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.5 10.5a3 3 0 0 1 3-3h15a3 3 0 1 1 0 6h-15a3 3 0 0 1-3-3Zm15 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.5 15a3 3 0 1 0 0 6h15a3 3 0 1 0 0-6h-15Zm11.25 3.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM19.5 18a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-white group-hover:text-neutral-200 duration-200 text-xs tracking-wider">
                Provider
              </span>
              <span className="text-neutral-300 group-hover:text-neutral-200 duration-200 text-xs ml-auto text-right">
                {provider}
              </span>
            </>
          </SettingsItem>
          <SettingsItem onClick={() => setSettingsSection('volume')} className="outside-click-ignore">
            <>
              <span className="text-white group-hover:text-neutral-200 duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                  <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                </svg>
              </span>
              <span className="text-white group-hover:text-neutral-200 duration-200 text-xs tracking-wider">
                Volume
              </span>
              <span className="text-neutral-300 group-hover:text-neutral-200 duration-200 text-xs ml-auto text-right">
                {Math.ceil(volume * 100)}%
              </span>
            </>
          </SettingsItem>
        </ul>
      )}
    </div>
  )
}

export default SettingsDropdown
