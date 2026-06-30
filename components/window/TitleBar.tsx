'use client'

import React, { useCallback, useState } from 'react'
import { WindowInstance } from '@/types/window'

interface TitleBarProps {
  instance: WindowInstance
  onPointerDown: (e: React.PointerEvent) => void
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

function TitleBarButton({
  onClick,
  children,
  ariaLabel,
}: {
  onClick: () => void
  children: React.ReactNode
  ariaLabel: string
}) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      aria-label={ariaLabel}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`
        flex items-center justify-center
        bg-win95-bg text-win95-black
        font-pixel text-[8px]
        cursor-default select-none
        ${pressed ? 'win95-sunken' : 'win95-raised'}
      `}
      style={{ width: '16px', height: '14px', padding: 0, fontSize: '10px', lineHeight: 1 }}
    >
      {children}
    </button>
  )
}

const TitleBar = React.memo(function TitleBar({
  instance,
  onPointerDown,
  onClose,
  onMinimize,
  onMaximize,
}: TitleBarProps) {
  const isActive = instance.isActive

  return (
    <div
      id={`window-title-${instance.id}`}
      className="flex items-center justify-between px-2 select-none"
      style={{
        height: '20px',
        background: isActive
          ? 'linear-gradient(90deg, #000080 0%, #1084d0 100%)'
          : '#808080',
        cursor: 'move',
        userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
    >
      {/* Title + icon */}
      <div className="flex items-center gap-1 overflow-hidden">
        <span style={{ fontSize: '12px', lineHeight: 1 }}>
          {instance.appId === 'birthday-card' ? '🎂'
            : instance.appId === 'file-explorer' ? '📁'
            : instance.appId === 'dad-tales' ? '📝'
            : instance.appId === 'media-player' ? '🎵'
            : instance.appId === 'terminal' ? '💻'
            : instance.appId === 'minesweeper' ? '💣'
            : 'ℹ️'}
        </span>
        <span
          className="font-pixel text-white truncate"
          style={{ fontSize: '8px', lineHeight: 1 }}
        >
          {instance.title}
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-0.5" onPointerDown={(e) => e.stopPropagation()}>
        <TitleBarButton onClick={onMinimize} ariaLabel="Minimize">_</TitleBarButton>
        <TitleBarButton onClick={onMaximize} ariaLabel="Maximize">□</TitleBarButton>
        <TitleBarButton onClick={onClose} ariaLabel="Close">✕</TitleBarButton>
      </div>
    </div>
  )
})

export default TitleBar
