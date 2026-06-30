'use client'

import { useState, useEffect } from 'react'
import { config } from '@/config'

interface BootScreenProps {
  onComplete: () => void
}

const biosMessages = [
  'RETRO NOSTALGIA OS v1.0 BIOS',
  'Copyright (C) 2025 Sanghi Systems Inc.',
  '',
  'CPU: Love @ 9999MHz ... OK',
  'Memory Test: 640KB ... Extended: ∞KB ... OK',
  'Hard Disk: C:\\ ... MEMORIES DETECTED ... OK',
  'CD-ROM: BIRTHDAY_EDITION ... LOADED ... OK',
  'Initializing Nostalgia Engine ... OK',
  'Loading inside jokes ... 7 loaded ... OK',
  'Checking warmth levels ... OVERFLOWING ... OK',
  '',
  `Booting for: ${config.birthday.recipientName}`,
  `With love from: ${config.birthday.gifterName}`,
  '',
  'Starting Retro Nostalgia OS...',
]

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [lines, setLines] = useState<string[]>([])
  const [showProgress, setShowProgress] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let lineIdx = 0
    let cancelled = false
    const interval = setInterval(() => {
      if (cancelled) return
      if (lineIdx < biosMessages.length) {
        const msg = biosMessages[lineIdx]
        if (msg !== undefined) {
          setLines((prev) => [...prev, msg])
        }
        lineIdx++
      } else {
        clearInterval(interval)
        if (!cancelled) setTimeout(() => setShowProgress(true), 300)
      }
    }, 120)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])


  useEffect(() => {
    if (!showProgress) return
    let width = 0
    const interval = setInterval(() => {
      width += 2
      setProgressWidth(width)
      if (width >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setShowLogo(true)
          setTimeout(() => {
            setFading(true)
            setTimeout(onComplete, 800)
          }, 1200)
        }, 400)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [showProgress, onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: '#000000',
        color: '#c0c0c0',
        fontFamily: 'VT323, monospace',
        fontSize: '18px',
        lineHeight: '1.4',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    >
      {!showLogo ? (
        <div className="p-6 flex-1 overflow-hidden">
          {lines.map((line, i) => (
            <div key={i} style={{ color: line != null && (line.startsWith('Booting') || line.startsWith('With love')) ? '#ffff00' : '#c0c0c0' }}>
              {line || '\u00A0'}
            </div>
          ))}

          {showProgress && (
            <div className="mt-6">
              <div style={{ color: '#ffffff', marginBottom: '8px' }}>
                Loading Retro Nostalgia OS...
              </div>
              <div style={{ background: '#333', width: '400px', height: '24px', border: '2px solid #808080', padding: '2px' }}>
                <div
                  style={{
                    width: `${progressWidth}%`,
                    height: '100%',
                    background: 'repeating-linear-gradient(90deg, #000080 0px, #000080 10px, #1084d0 10px, #1084d0 20px)',
                    transition: 'width 0.04s linear',
                  }}
                />
              </div>
              <div style={{ color: '#808080', marginTop: '4px', fontSize: '14px' }}>
                {progressWidth}% Complete
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center" style={{ background: '#008080' }}>
          <div style={{ textAlign: 'center' }}>
            {/* Win95 style logo */}
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🪟</div>
            <div
              style={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#ffffff',
                fontSize: '14px',
                lineHeight: '2',
                textShadow: '2px 2px 0 #000080',
              }}
            >
              Retro Nostalgia OS™
            </div>
            <div style={{ fontFamily: 'VT323, monospace', color: '#c0ffee', fontSize: '22px', marginTop: '8px' }}>
              Birthday Edition — v1.0
            </div>
            <div style={{ fontFamily: 'VT323, monospace', color: '#ffff88', fontSize: '18px', marginTop: '16px' }}>
              🎂 For {config.birthday.recipientName} 🎂
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
