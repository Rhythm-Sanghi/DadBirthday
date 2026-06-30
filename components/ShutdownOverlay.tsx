'use client'

import { useState, useEffect, useCallback } from 'react'
import { config } from '@/config'

interface ShutdownOverlayProps {
  onClose: () => void
}

const CONFETTI_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff', '#ff9f43', '#00d2d3']

function Confetti() {
  return (
    <>
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}vw`,
            top: '-20px',
            background: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </>
  )
}

export default function ShutdownOverlay({ onClose }: ShutdownOverlayProps) {
  const [phase, setPhase] = useState<'dialog' | 'celebrate'>('dialog')

  const handleShutDown = useCallback(() => {
    setPhase('celebrate')
  }, [])

  if (phase === 'celebrate') {
    return (
      <div
        className="fixed inset-0 z-[99998] flex flex-col items-center justify-center shutdown-overlay"
        style={{ background: '#000080' }}
      >
        <Confetti />
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            color: '#ffffff',
            fontSize: '20px',
            textAlign: 'center',
            lineHeight: '2',
            zIndex: 1,
            textShadow: '2px 2px 0 #000000',
          }}
        >
          🎂 HAPPY BIRTHDAY! 🎂
        </div>
        <div
          style={{
            fontFamily: 'VT323, monospace',
            color: '#ffff88',
            fontSize: '28px',
            textAlign: 'center',
            marginTop: '16px',
            zIndex: 1,
          }}
        >
          {config.birthday.recipientName}
        </div>
        <div
          style={{
            fontFamily: 'VT323, monospace',
            color: '#c0ffee',
            fontSize: '22px',
            textAlign: 'center',
            marginTop: '12px',
            maxWidth: '500px',
            zIndex: 1,
          }}
        >
          {config.birthday.personalMessage}
        </div>
        <div style={{ fontFamily: 'VT323, monospace', color: '#ffaacc', fontSize: '22px', marginTop: '16px', zIndex: 1 }}>
          — With love, {config.birthday.gifterName} 💙
        </div>
        <button
          onClick={onClose}
          className="win95-raised mt-8"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '9px',
            padding: '8px 24px',
            background: '#c0c0c0',
            color: '#000',
            cursor: 'default',
            zIndex: 1,
          }}
          aria-label="Return to desktop"
        >
          Return to Desktop
        </button>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[99997] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      {/* Dialog */}
      <div className="win95-window" style={{ background: '#c0c0c0', minWidth: '320px' }}>
        {/* Title bar */}
        <div
          className="flex items-center px-2"
          style={{ height: '20px', background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#ffffff' }}>
            Shut Down Windows
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <span style={{ fontSize: '32px' }}>🪟</span>
            <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px' }}>
              <p>Are you sure you want to shut down?</p>
              <br />
              <p style={{ fontStyle: 'italic', color: '#444' }}>
                (Warning: doing so will reveal something wonderful.)
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleShutDown}
              aria-label="Yes, shut down"
              id="shutdown-yes"
              className="win95-raised px-4 py-1"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', background: '#c0c0c0', cursor: 'default', minWidth: '75px' }}
            >
              Yes
            </button>
            <button
              onClick={onClose}
              aria-label="No, cancel shutdown"
              id="shutdown-no"
              className="win95-raised px-4 py-1"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px', background: '#c0c0c0', cursor: 'default', minWidth: '75px' }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
