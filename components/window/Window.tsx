'use client'

import React, { useRef, useCallback, useState } from 'react'
import { motion, useDragControls, AnimatePresence } from 'framer-motion'
import { WindowInstance } from '@/types/window'
import { useWindowStore } from '@/store/windowStore'
import TitleBar from './TitleBar'

interface WindowProps {
  instance: WindowInstance
  children: React.ReactNode
  menuBar?: React.ReactNode
  statusBar?: React.ReactNode
  noResize?: boolean
}

const Window = React.memo(function Window({
  instance,
  children,
  menuBar,
  statusBar,
  noResize = false,
}: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } = useWindowStore()
  const dragControls = useDragControls()
  const windowRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })

  const isMaximized = instance.state === 'maximized'

  const handleFocus = useCallback(() => {
    focusWindow(instance.id)
  }, [focusWindow, instance.id])

  const handleClose = useCallback(() => {
    closeWindow(instance.id)
  }, [closeWindow, instance.id])

  const handleMinimize = useCallback(() => {
    minimizeWindow(instance.id)
  }, [minimizeWindow, instance.id])

  const handleMaximize = useCallback(() => {
    maximizeWindow(instance.id)
  }, [maximizeWindow, instance.id])

  const startResize = useCallback((e: React.MouseEvent) => {
    if (noResize || isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: instance.size.width,
      h: instance.size.height,
    }

    const onMove = (me: MouseEvent) => {
      const dx = me.clientX - resizeStart.current.x
      const dy = me.clientY - resizeStart.current.y
      updateSize(instance.id, {
        width: Math.max(300, resizeStart.current.w + dx),
        height: Math.max(200, resizeStart.current.h + dy),
      })
    }

    const onUp = () => {
      setIsResizing(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [noResize, isMaximized, instance.size, instance.id, updateSize])

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)',
        zIndex: instance.zIndex,
      }
    : {
        position: 'absolute',
        width: instance.size.width,
        height: instance.size.height,
        zIndex: instance.zIndex,
      }

  if (instance.state === 'minimized') return null

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: 0,
        left: -instance.position.x + 0,
        right: 9999,
        bottom: 9999,
      }}
      onDragEnd={(_, info) => {
        updatePosition(instance.id, {
          x: instance.position.x + info.offset.x,
          y: instance.position.y + info.offset.y,
        })
      }}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.12 }}
      style={
        isMaximized
          ? windowStyle
          : {
              ...windowStyle,
              x: instance.position.x,
              y: instance.position.y,
            }
      }
      onPointerDown={handleFocus}
      className="win95-window flex flex-col"
      role="dialog"
      aria-labelledby={`window-title-${instance.id}`}
    >
      {/* Title Bar */}
      <TitleBar
        instance={instance}
        onPointerDown={(e) => {
          if (isMaximized) return
          handleFocus()
          dragControls.start(e)
        }}
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
      />

      {/* Menu Bar */}
      {menuBar && (
        <div className="bg-win95-bg px-1 py-0.5 flex gap-1 border-b border-win95-dark select-none">
          {menuBar}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-win95-bg">
        {children}
      </div>

      {/* Status Bar */}
      {statusBar && (
        <div
          className="win95-sunken px-2 py-0.5 text-[11px] font-retro text-win95-black flex items-center"
          style={{ height: '22px' }}
        >
          {statusBar}
        </div>
      )}

      {/* Resize handle */}
      {!noResize && !isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10"
          style={{ background: '#c0c0c0' }}
          onMouseDown={startResize}
          aria-label="Resize window"
        />
      )}
    </motion.div>
  )
})

export default Window
