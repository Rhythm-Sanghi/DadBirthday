'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import { appRegistry, desktopIcons } from '@/lib/apps'
import { AppId } from '@/types/window'
import DesktopIcon from './DesktopIcon'
import Window from '@/components/window/Window'
import Taskbar from '@/components/taskbar/Taskbar'
import BirthdayCard from '@/components/apps/BirthdayCard'
import FileExplorer from '@/components/apps/FileExplorer'
import DadTales from '@/components/apps/DadTales'
import MediaPlayer from '@/components/apps/MediaPlayer'
import Terminal from '@/components/apps/Terminal'
import Minesweeper from '@/components/apps/Minesweeper'
import AboutOS from '@/components/apps/AboutOS'
import Messages from '@/components/apps/Messages'
import ControlPanel from '@/components/apps/ControlPanel'
import ShutdownOverlay from '@/components/ShutdownOverlay'

function AppContent({ appId, windowId }: { appId: AppId; windowId: string }) {
  switch (appId) {
    case 'birthday-card':  return <BirthdayCard />
    case 'file-explorer':  return <FileExplorer />
    case 'dad-tales':      return <DadTales />
    case 'media-player':   return <MediaPlayer />
    case 'terminal':       return <Terminal windowId={windowId} />
    case 'minesweeper':    return <Minesweeper />
    case 'about':          return <AboutOS />
    case 'messages':       return <Messages />
    case 'control-panel':  return <ControlPanel />
    default:               return null
  }
}

export default function Desktop() {
  const { windows, openWindow, focusWindow } = useWindowStore()
  const [shutdownActive, setShutdownActive] = useState(false)

  // Auto-open birthday card after desktop appears
  useEffect(() => {
    const timer = setTimeout(() => {
      const app = appRegistry['birthday-card']
      openWindow('birthday-card', app.title, app.defaultSize)
    }, 1500)
    return () => clearTimeout(timer)
  }, [openWindow])

  const handleDesktopClick = useCallback(() => {
    // Deselect active window visually — nothing special needed
  }, [])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    // Could add a context menu here
  }, [])

  return (
    <div
      className="relative w-screen overflow-hidden"
      style={{ height: 'calc(100vh - 40px)', background: '#008080' }}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className="absolute left-2 top-2 flex flex-col gap-2">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.appId}
            appId={icon.appId}
            label={icon.label}
            icon={icon.icon}
          />
        ))}
      </div>

      {/* Windows layer */}
      <AnimatePresence>
        {windows.map((instance) =>
          instance.state !== 'minimized' ? (
            <Window
              key={instance.id}
              instance={instance}
              noResize={instance.appId === 'media-player' || instance.appId === 'about'}
            >
              <AppContent appId={instance.appId} windowId={instance.id} />
            </Window>
          ) : null
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar onShutDown={() => setShutdownActive(true)} />

      {/* Shutdown overlay */}
      {shutdownActive && (
        <ShutdownOverlay onClose={() => setShutdownActive(false)} />
      )}
    </div>
  )
}
