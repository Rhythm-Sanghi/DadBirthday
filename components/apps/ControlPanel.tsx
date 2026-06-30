'use client'

import { useState } from 'react'
import { config } from '@/config'

// ----------------------------------------------------------------
// Control Panel — "Dad Skills" (Add/Remove Programs style list)
// Matches the existing DadTales / FileExplorer list styling.
// ----------------------------------------------------------------

interface ErrorDialogProps {
  onClose: () => void
}

function ErrorDialog({ onClose }: ErrorDialogProps) {
  return (
    // Overlay dims the parent window content only (position absolute within the app)
    <div
      className="absolute inset-0 flex items-center justify-center z-10"
      style={{ background: 'rgba(0,0,0,0.35)' }}
    >
      <div className="win95-raised" style={{ background: '#c0c0c0', minWidth: 300 }}>
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-2"
          style={{ height: 20, background: 'linear-gradient(90deg, #000080, #1084d0)' }}
        >
          <span style={{ fontSize: 12 }}>⛔</span>
          <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#ffffff', flex: 1 }}>
            Error
          </span>
          <button
            onClick={onClose}
            aria-label="Close error dialog"
            style={{
              width: 16, height: 14,
              background: '#c0c0c0',
              border: '1px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              fontFamily: 'Arial, sans-serif', fontSize: 11,
              cursor: 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex items-start gap-3 px-4 py-4">
          <span style={{ fontSize: 28, lineHeight: 1 }}>🛑</span>
          <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 13 }}>
            <p><strong>Error 0xDAD00001</strong></p>
            <br />
            <p>This program cannot be removed.</p>
            <p>It is a core system file.</p>
            <br />
            <p style={{ color: '#444', fontSize: 12 }}>
              (Some things are simply not optional.)
            </p>
          </div>
        </div>

        <div className="flex justify-center pb-3">
          <button
            onClick={onClose}
            className="win95-raised px-6 py-1"
            aria-label="OK"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 13, cursor: 'default', background: '#c0c0c0', minWidth: 75 }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ControlPanel() {
  const [selected, setSelected] = useState<number | null>(null)
  const [errorOpen, setErrorOpen] = useState(false)

  const skills = config.dadSkills

  return (
    <div
      className="flex flex-col h-full relative"
      style={{ background: '#c0c0c0', fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 border-b" style={{ borderColor: '#808080' }}>
        <span style={{ fontSize: 28 }}>🛠</span>
        <div>
          <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#000080' }}>
            Add/Remove Programs
          </div>
          <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>
            Select a program, then click Remove.
          </div>
        </div>
      </div>

      {/* List — mirrors the DadTales sidebar bordered-row style */}
      <div className="flex-1 overflow-y-auto mx-3 mt-2 win95-sunken" style={{ background: '#ffffff' }}>
        {/* Column headers */}
        <div
          className="flex gap-0 sticky top-0"
          style={{ borderBottom: '1px solid #808080', background: '#c0c0c0' }}
        >
          {['Name', 'Version', 'Status'].map((h) => (
            <div
              key={h}
              className="win95-raised px-2 py-0.5 flex-shrink-0"
              style={{
                fontFamily: '"Press Start 2P", monospace', fontSize: '7px',
                width: h === 'Name' ? '40%' : h === 'Version' ? '18%' : '42%',
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {skills.map((skill, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            aria-label={`Select ${skill.name}`}
            className="w-full flex items-center text-left cursor-default border-b"
            style={{
              borderColor: '#e0e0e0',
              background: selected === i ? '#000080' : i % 2 === 0 ? '#ffffff' : '#f4f4f4',
              color: selected === i ? '#ffffff' : '#000000',
              outline: 'none',
              padding: '4px 0',
            }}
          >
            <span
              style={{
                width: '40%', paddingLeft: 8, paddingRight: 4,
                fontFamily: 'VT323, monospace', fontSize: 16,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {skill.name}
            </span>
            <span
              style={{
                width: '18%', paddingRight: 4,
                fontFamily: 'VT323, monospace', fontSize: 16,
                textAlign: 'center',
              }}
            >
              {skill.version}
            </span>
            <span
              style={{
                flex: 1, paddingRight: 8,
                fontFamily: 'VT323, monospace', fontSize: 14,
                color: selected === i ? '#ffff88' : '#444',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {skill.status}
            </span>
          </button>
        ))}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-2 px-3 py-2">
        <button
          className="win95-raised px-4 py-1"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 13, cursor: 'default', background: '#c0c0c0' }}
          aria-label="Add program (disabled)"
          disabled
          title="No new programs available"
        >
          Add...
        </button>
        <button
          onClick={() => setErrorOpen(true)}
          className="win95-raised px-4 py-1"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 13, cursor: 'default', background: '#c0c0c0' }}
          aria-label="Remove selected program"
          id="control-panel-remove-btn"
        >
          Remove
        </button>
      </div>

      {/* Error modal */}
      {errorOpen && <ErrorDialog onClose={() => setErrorOpen(false)} />}
    </div>
  )
}
