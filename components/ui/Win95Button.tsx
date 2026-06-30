'use client'

import React, { useCallback } from 'react'

interface Win95ButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  onMouseDown?: (e: React.MouseEvent) => void
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  'aria-label'?: string
  id?: string
  active?: boolean
}

const Win95Button = React.memo(function Win95Button({
  children,
  onClick,
  onMouseDown,
  className = '',
  style,
  disabled,
  'aria-label': ariaLabel,
  id,
  active = false,
}: Win95ButtonProps) {
  const [pressed, setPressed] = React.useState(false)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setPressed(true)
    onMouseDown?.(e)
  }, [onMouseDown])

  const handleMouseUp = useCallback(() => {
    setPressed(false)
  }, [])

  const isPressed = pressed || active

  return (
    <button
      id={id}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`
        inline-flex items-center justify-center
        bg-win95-bg
        px-3 py-1
        font-pixel text-[8px]
        text-win95-black
        cursor-default
        select-none
        disabled:opacity-60
        ${isPressed ? 'win95-sunken' : 'win95-raised'}
        ${className}
      `}
      style={{ minWidth: '75px', minHeight: '23px', ...style }}
    >
      {children}
    </button>
  )
})

export default Win95Button
