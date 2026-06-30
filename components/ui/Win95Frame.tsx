'use client'

import React from 'react'

interface Win95FrameProps {
  children: React.ReactNode
  variant?: 'raised' | 'sunken' | 'inset' | 'window'
  className?: string
  style?: React.CSSProperties
}

const Win95Frame = React.memo(function Win95Frame({
  children,
  variant = 'raised',
  className = '',
  style,
}: Win95FrameProps) {
  return (
    <div
      className={`bg-win95-bg win95-${variant} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
})

export default Win95Frame
