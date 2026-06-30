'use client'

import { useState, useCallback } from 'react'
import TaskbarClock from './TaskbarClock'
import TaskbarItem from './TaskbarItem'
import StartMenu from './StartMenu'
import { useWindowStore } from '@/store/windowStore'

interface TaskbarProps {
  onShutDown: () => void
}

export default function Taskbar({ onShutDown }: TaskbarProps) {
  const windows = useWindowStore((s) => s.getTaskbarWindows())
  const [startOpen, setStartOpen] = useState(false)
  const [startPressed, setStartPressed] = useState(false)

  const toggleStart = useCallback(() => {
    setStartOpen((v) => !v)
  }, [])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 win95-raised flex items-center px-1 gap-1 z-[9999]"
      style={{ height: '40px', background: '#c0c0c0', borderBottom: 'none' }}
      role="toolbar"
      aria-label="Taskbar"
    >
      {/* Start Button */}
      <div className="relative">
        {startOpen && (
          <StartMenu onClose={() => setStartOpen(false)} onShutDown={onShutDown} />
        )}
        <button
          id="start-button"
          aria-label="Start menu"
          aria-expanded={startOpen}
          onClick={toggleStart}
          onMouseDown={() => setStartPressed(true)}
          onMouseUp={() => setStartPressed(false)}
          onMouseLeave={() => setStartPressed(false)}
          className={`flex items-center gap-1.5 px-2 bg-win95-bg text-win95-black cursor-default select-none ${startPressed || startOpen ? 'win95-sunken' : 'win95-raised'}`}
          style={{ height: '30px', minWidth: '70px' }}
        >
          <span style={{ fontSize: '16px' }}>🪟</span>
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', fontWeight: 'bold' }}>
            Start
          </span>
        </button>
      </div>

      {/* Separator */}
      <div style={{ width: '2px', height: '28px', borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff', margin: '0 4px' }} />

      {/* Window buttons */}
      <div className="flex-1 flex items-center gap-1 overflow-hidden">
        {windows.map((w) => (
          <TaskbarItem key={w.id} instance={w} />
        ))}
      </div>

      {/* Clock area */}
      <div className="flex items-center gap-1 ml-auto">
        <TaskbarClock />
      </div>
    </div>
  )
}
