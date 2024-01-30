import { FC, ReactElement, createContext, useContext, useEffect, useState } from 'react'

export interface SettingsState {
  muted: boolean
  volume: number
  fullscreen: boolean
  quality: string
  isControlsShown: boolean
  isError: boolean
  provider: string
}

export interface SettingsContext extends SettingsState {
  toggleFullscreen: () => void
  enterFullscreen: () => void
  exitFullscreen: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  mute: () => void
  unmute: () => void
  toggleControls: () => void
  showControls: () => void
  hideControls: () => void
  setQuality: (quality: string) => void
  setSettingsState: (params: Partial<SettingsState> | ((prev: SettingsState) => SettingsState)) => void
  setProvider: (provider: string) => void
}

export const intitialSettingsStateValue = {
  muted: false,
  volume: 1,
  fullscreen: false,
  quality: 'default',
  isControlsShown: true,
  isError: false,
  provider: 'gogoanime',
}

export const intitialSettingsContextValue = {
  ...intitialSettingsStateValue,
  toggleFullscreen: () => {},
  enterFullscreen: () => {},
  exitFullscreen: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  mute: () => {},
  unmute: () => {},
  toggleControls: () => {},
  showControls: () => {},
  hideControls: () => {},
  setQuality: () => {},
  setSettingsState: () => {},
  setProvider: () => {},
}

const settingsContext = createContext<SettingsContext>(intitialSettingsContextValue)

interface Props {
  children: ReactElement
}

export const SettingsProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<SettingsState>(intitialSettingsStateValue)

  const setSettingsState = (params: Partial<SettingsState> | ((prev: SettingsState) => SettingsState)) => {
    if (typeof params === 'function') {
      setState(params)
    } else {
      setState((prev) => ({ ...prev, ...params }))
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (state.fullscreen) {
          const container = document.getElementById('player-fullscreen-container')

          await container?.requestFullscreen()
        } else {
          await document.exitFullscreen()
        }
      } catch {}
    })()
  }, [state.fullscreen])

  const toggleFullscreen = () => setState((prev) => ({ ...prev, fullscreen: !prev.fullscreen }))
  const enterFullscreen = () => setState((prev) => ({ ...prev, fullscreen: true }))
  const exitFullscreen = () => setState((prev) => ({ ...prev, fullscreen: false }))
  const setVolume = (volume: number) => setState((prev) => ({ ...prev, volume }))
  const toggleMute = () => setState((prev) => ({ ...prev, muted: !prev.muted }))
  const mute = () => setState((prev) => ({ ...prev, muted: true }))
  const unmute = () => setState((prev) => ({ ...prev, muted: false }))
  const toggleControls = () => setState((prev) => ({ ...prev, isControlsShown: !prev.isControlsShown }))
  const showControls = () => setState((prev) => ({ ...prev, isControlsShown: true }))
  const hideControls = () => setState((prev) => ({ ...prev, isControlsShown: false }))
  const setQuality = (quality: string) => setState((prev) => ({ ...prev, quality }))
  const setProvider = (provider: string) => setState((prev) => ({ ...prev, provider }))

  return (
    <settingsContext.Provider
      value={{
        ...state,
        setSettingsState,
        toggleControls,
        showControls,
        hideControls,
        toggleFullscreen,
        enterFullscreen,
        exitFullscreen,
        setVolume,
        toggleMute,
        mute,
        unmute,
        setQuality,
        setProvider,
      }}
    >
      {children}
    </settingsContext.Provider>
  )
}

export const useSettings = () => {
  const data = useContext(settingsContext)

  return data
}
