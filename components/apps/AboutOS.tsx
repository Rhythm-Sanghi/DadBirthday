'use client'

import { config } from '@/config'

export default function AboutOS() {
  return (
    <div
      className="flex flex-col items-center p-6 gap-4"
      style={{ background: '#c0c0c0', fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Logo */}
      <div style={{ fontSize: '48px' }}>🪟</div>

      {/* OS Name */}
      <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px', color: '#000080', textAlign: 'center', lineHeight: '2' }}>
        Retro Nostalgia OS™
      </div>

      {/* Details */}
      <div className="win95-sunken p-4 w-full" style={{ background: '#ffffff', fontSize: '13px' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Version:</td>
              <td style={{ padding: '3px 8px' }}>1.0 (Birthday Edition)</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Licensed to:</td>
              <td style={{ padding: '3px 8px' }}>{config.birthday.recipientName}</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Built with love by:</td>
              <td style={{ padding: '3px 8px' }}>{config.birthday.gifterName}</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>RAM:</td>
              <td style={{ padding: '3px 8px' }}>Infinite nostalgia</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Storage:</td>
              <td style={{ padding: '3px 8px' }}>All your memories</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>CPU:</td>
              <td style={{ padding: '3px 8px' }}>Love @ 9999MHz</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quote */}
      <div
        className="win95-sunken p-3 w-full text-center"
        style={{ background: '#ffffc0', fontStyle: 'italic', fontSize: '13px' }}
      >
        "Made entirely from good intentions and zero sleep."
      </div>

      {/* OK Button */}
      <button
        className="win95-raised px-8 py-1"
        aria-label="OK"
        id="about-ok-button"
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '13px',
          background: '#c0c0c0',
          cursor: 'default',
          minWidth: '75px',
        }}
      >
        OK
      </button>
    </div>
  )
}
