'use client'

import { useEffect, useRef, useState } from 'react'
import { useWindowStore } from '@/store/windowStore'
import { appRegistry } from '@/lib/apps'
import { AppId } from '@/types/window'

interface StartMenuProps {
  onClose: () => void
  onShutDown: () => void
}

// Win95-accurate pixel icon blocks (no modern emoji)
const WIN95_ICONS: Record<string, React.ReactNode> = {
  Programs: (
    <span style={{ display: 'inline-block', width: 16, height: 16, position: 'relative', flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
        {/* Folder icon */}
        <rect x="0" y="4" width="15" height="11" fill="#c8a000" />
        <rect x="0" y="4" width="15" height="11" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="0" y="6" width="15" height="9" fill="#ffcc00" />
        <rect x="0" y="6" width="15" height="9" fill="none" stroke="#000" strokeWidth="1" />
        <rect x="1" y="4" width="6" height="2" fill="#ffcc00" />
      </svg>
    </span>
  ),
  Documents: (
    <span style={{ display: 'inline-block', width: 16, height: 16, flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
        {/* Document icon */}
        <rect x="2" y="1" width="10" height="13" fill="#ffffff" stroke="#000" strokeWidth="1" />
        <polygon points="8,1 12,5 12,1" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
        <line x1="4" y1="7" x2="10" y2="7" stroke="#000" strokeWidth="1" />
        <line x1="4" y1="9" x2="10" y2="9" stroke="#000" strokeWidth="1" />
        <line x1="4" y1="11" x2="8"  y2="11" stroke="#000" strokeWidth="1" />
      </svg>
    </span>
  ),
  Settings: (
    <span style={{ display: 'inline-block', width: 16, height: 16, flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
        {/* Control panel / gear icon */}
        <rect x="1" y="1" width="6" height="6" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
        <rect x="9" y="1" width="6" height="6" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
        <rect x="1" y="9" width="6" height="6" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
        <rect x="9" y="9" width="6" height="6" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
      </svg>
    </span>
  ),
  Help: (
    <span style={{ display: 'inline-block', width: 16, height: 16, flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
        {/* Question mark book */}
        <rect x="2" y="1" width="11" height="14" fill="#ffff88" stroke="#000" strokeWidth="1" />
        <rect x="2" y="1" width="2" height="14" fill="#c0a000" />
        <text x="8" y="11" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Arial" fill="#000">?</text>
      </svg>
    </span>
  ),
  'Shut Down...': (
    <span style={{ display: 'inline-block', width: 16, height: 16, flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
        {/* Power button / monitor off */}
        <rect x="1" y="3" width="14" height="10" fill="#000080" stroke="#000" strokeWidth="1" />
        <rect x="3" y="5" width="10" height="6" fill="#000040" />
        <rect x="5" y="13" width="6" height="2" fill="#808080" />
        <rect x="3" y="15" width="10" height="1" fill="#808080" />
      </svg>
    </span>
  ),
}

type MenuAction = 'programs' | 'documents' | 'settings' | 'help' | 'shutdown'

interface MenuItem {
  icon: React.ReactNode
  label: string
  action: MenuAction
  sub?: boolean
  divider?: never
}

interface DividerItem {
  divider: true
  icon?: never
  label?: never
  action?: never
}

type MenuItemDef = MenuItem | DividerItem

const menuItems: MenuItemDef[] = [
  { icon: WIN95_ICONS['Programs'],  label: 'Programs',     action: 'programs',  sub: true },
  { icon: WIN95_ICONS['Documents'], label: 'Documents',    action: 'documents', sub: false },
  { icon: WIN95_ICONS['Settings'],  label: 'Settings',     action: 'settings',  sub: false },
  { icon: WIN95_ICONS['Help'],      label: 'Help',         action: 'help',      sub: false },
  { divider: true },
  { icon: WIN95_ICONS['Shut Down...'], label: 'Shut Down...', action: 'shutdown', sub: false },
]

export default function StartMenu({ onClose, onShutDown }: StartMenuProps) {
  const openWindow = useWindowStore((s) => s.openWindow)
  const menuRef = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const launch = (appId: AppId) => {
    const app = appRegistry[appId]
    if (app) openWindow(appId, app.title, app.defaultSize)
    onClose()
  }

  const handleItem = (action: MenuAction) => {
    switch (action) {
      case 'programs':
        launch('file-explorer')
        break
      case 'documents':
        launch('dad-tales')
        break
      case 'settings':
        launch('about')
        break
      case 'help':
        launch('about')
        break
      case 'shutdown':
        onClose()
        onShutDown()
        break
    }
  }

  return (
    <div
      ref={menuRef}
      className="absolute bottom-full left-0 mb-1 win95-raised z-50"
      style={{ minWidth: '210px', background: '#c0c0c0' }}
      role="menu"
    >
      <div className="flex">
        {/* Sidebar strip */}
        <div
          className="flex items-end justify-center pb-4"
          style={{
            width: '30px',
            background: 'linear-gradient(180deg, #808080 0%, #000080 100%)',
            minHeight: '230px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '10px',
              color: '#c0c0c0',
              letterSpacing: '2px',
              textShadow: '1px 1px 0 #000000',
              whiteSpace: 'nowrap',
            }}
          >
            Windows{' '}
            <span style={{ color: '#ffffff', fontWeight: 'bold' }}>&apos;95</span>
          </span>
        </div>

        {/* Menu items */}
        <div className="flex-1 py-1">
          {menuItems.map((item, i) =>
            item.divider ? (
              <div
                key={i}
                style={{
                  height: '1px',
                  background: '#808080',
                  margin: '3px 4px 2px',
                  borderBottom: '1px solid #ffffff',
                }}
              />
            ) : (
              <button
                key={i}
                role="menuitem"
                onClick={() => handleItem(item.action!)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-left cursor-default select-none"
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '12px',
                  background: hoveredIdx === i ? '#000080' : 'transparent',
                  color: hoveredIdx === i ? '#ffffff' : '#000000',
                  outline: 'none',
                  border: 'none',
                }}
                aria-label={item.label}
              >
                <span className="flex items-center justify-center" style={{ width: 20, height: 20, flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span className="flex-1" style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                {item.sub && (
                  <span style={{ fontSize: '8px', marginLeft: '4px' }}>&#9658;</span>
                )}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
