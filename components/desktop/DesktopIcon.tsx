'use client'

import React, { useCallback, useState } from 'react'
import { AppId } from '@/types/window'
import { useWindowStore } from '@/store/windowStore'
import { appRegistry } from '@/lib/apps'

interface DesktopIconProps {
  appId: AppId
  label: string
  icon: string
}

const DesktopIcon = React.memo(function DesktopIcon({ appId, label, icon }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow)
  const [selected, setSelected] = useState(false)
  const [lastClick, setLastClick] = useState(0)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastClick < 400) {
      // Double click
      const app = appRegistry[appId]
      if (app) openWindow(appId, app.title, app.defaultSize)
      setSelected(false)
    } else {
      setSelected(true)
    }
    setLastClick(now)
  }, [appId, lastClick, openWindow])

  return (
    <div
      className={`flex flex-col items-center gap-1 p-1 cursor-default select-none w-20 ${selected ? 'desktop-icon-selected' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={`Open ${label}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const app = appRegistry[appId]
          if (app) openWindow(appId, app.title, app.defaultSize)
        }
      }}
    >
      <div className="text-4xl" style={{ imageRendering: 'pixelated', filter: selected ? 'brightness(0.7) sepia(1) saturate(5) hue-rotate(200deg)' : 'none' }}>
        {icon}
      </div>
      <span
        className="icon-label text-white text-center px-0.5 leading-tight"
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '8px',
          wordBreak: 'break-word',
          maxWidth: '72px',
          textAlign: 'center',
          background: selected ? '#000080' : 'transparent',
          outline: selected ? '1px dotted #ffffff' : 'none',
          padding: '1px 2px',
        }}
      >
        {label}
      </span>
    </div>
  )
})

export default DesktopIcon
