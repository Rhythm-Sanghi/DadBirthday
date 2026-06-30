'use client'

import React, { useCallback } from 'react'
import { WindowInstance } from '@/types/window'
import { useWindowStore } from '@/store/windowStore'

interface TaskbarItemProps {
  instance: WindowInstance
}

const TaskbarItem = React.memo(function TaskbarItem({ instance }: TaskbarItemProps) {
  const { focusWindow, minimizeWindow } = useWindowStore()

  const handleClick = useCallback(() => {
    if (instance.isActive && instance.state !== 'minimized') {
      minimizeWindow(instance.id)
    } else {
      focusWindow(instance.id)
    }
  }, [instance, focusWindow, minimizeWindow])

  const isPressed = instance.isActive && instance.state !== 'minimized'
  const label = instance.title.length > 15 ? instance.title.slice(0, 15) + '…' : instance.title

  return (
    <button
      onClick={handleClick}
      aria-label={`Window: ${instance.title}`}
      aria-pressed={isPressed}
      className={`
        flex items-center gap-1
        px-2 py-0.5
        bg-win95-bg
        text-win95-black
        cursor-default select-none
        ${isPressed ? 'win95-sunken' : 'win95-raised'}
      `}
      style={{ minWidth: '120px', maxWidth: '160px', height: '28px' }}
    >
      <span style={{ fontSize: '12px' }}>
        {instance.appId === 'birthday-card' ? '🎂'
          : instance.appId === 'file-explorer' ? '📁'
          : instance.appId === 'dad-tales' ? '📝'
          : instance.appId === 'media-player' ? '🎵'
          : instance.appId === 'terminal' ? '💻'
          : instance.appId === 'minesweeper' ? '💣'
          : 'ℹ️'}
      </span>
      <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </button>
  )
})

export default TaskbarItem
