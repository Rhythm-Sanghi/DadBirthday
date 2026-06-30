'use client'

import { useState } from 'react'
import { config } from '@/config'

const FOLDER_COLORS = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#c9baff']
const FOLDER_EMOJIS = ['📸', '🏕️', '👨‍👩‍👧', '⭐']

type FolderName = keyof typeof config.photos

const folders = Object.keys(config.photos) as FolderName[]

export default function FileExplorer() {
  const [openFolder, setOpenFolder] = useState<FolderName | null>(null)
  const [lightbox, setLightbox] = useState<{ src: string; idx: number } | null>(null)

  const currentPhotos = openFolder ? config.photos[openFolder] : []

  return (
    <div className="flex flex-col h-full" style={{ background: '#c0c0c0' }}>
      {/* Address bar */}
      <div className="flex items-center gap-2 p-1 border-b border-win95-dark">
        <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px' }}>Address:</span>
        <div
          className="win95-sunken flex-1 px-1"
          style={{ fontFamily: 'VT323, monospace', fontSize: '16px', height: '20px', display: 'flex', alignItems: 'center' }}
        >
          {openFolder
            ? `C:\\My Documents\\Memories\\${openFolder}\\`
            : 'C:\\My Documents\\Memories\\'}
        </div>
        {openFolder && (
          <button
            onClick={() => setOpenFolder(null)}
            aria-label="Go back"
            className="win95-raised px-1"
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', height: '20px', cursor: 'default' }}
          >
            ← Back
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left tree pane */}
        <div
          className="win95-sunken overflow-y-auto p-1"
          style={{ width: '160px', minWidth: '120px', background: '#ffffff', fontSize: '14px', fontFamily: 'VT323, monospace' }}
        >
          <div style={{ color: '#000080', fontFamily: '"Press Start 2P", monospace', fontSize: '7px', padding: '2px 0 4px' }}>
            📁 Folders
          </div>
          <div style={{ paddingLeft: '4px' }}>
            <div>🖥️ Desktop</div>
            <div style={{ paddingLeft: '8px' }}>
              <div>💾 My Computer</div>
              <div style={{ paddingLeft: '8px' }}>
                <div>📁 C:\</div>
                <div style={{ paddingLeft: '8px' }}>
                  <div>📁 My Documents</div>
                  <div style={{ paddingLeft: '8px' }}>
                    {folders.map((f) => (
                      <div
                        key={f}
                        onClick={() => setOpenFolder(f)}
                        style={{ cursor: 'default', color: openFolder === f ? '#000080' : '#000', padding: '1px 0' }}
                      >
                        📁 {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '3px', background: '#c0c0c0' }} />

        {/* Right content pane */}
        <div className="flex-1 win95-sunken overflow-y-auto p-2" style={{ background: '#ffffff' }}>
          {!openFolder ? (
            // Folder grid
            <div className="flex flex-wrap gap-4 p-2">
              {folders.map((folder, i) => (
                <div
                  key={folder}
                  className="flex flex-col items-center gap-1 cursor-default"
                  style={{ width: '80px' }}
                  onDoubleClick={() => setOpenFolder(folder)}
                  role="button"
                  aria-label={`Open folder ${folder}`}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setOpenFolder(folder) }}
                >
                  <div style={{ fontSize: '40px' }}>
                    {FOLDER_EMOJIS[i % FOLDER_EMOJIS.length]}
                  </div>
                  <span style={{ fontFamily: 'VT323, monospace', fontSize: '15px', textAlign: 'center', wordBreak: 'break-word' }}>
                    {folder}
                  </span>
                </div>
              ))}
            </div>
          ) : currentPhotos.length > 0 ? (
            // Photo grid
            <div className="flex flex-wrap gap-2 p-2">
              {currentPhotos.map((src, i) => (
                <div
                  key={i}
                  className="win95-raised cursor-default"
                  style={{ width: '100px', height: '100px', overflow: 'hidden', position: 'relative' }}
                  onClick={() => setLightbox({ src, idx: i })}
                  role="button"
                  aria-label={`Photo ${i + 1}`}
                  tabIndex={0}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Memory ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          ) : (
            // Placeholder grid
            <div className="flex flex-wrap gap-4 p-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="win95-raised flex flex-col items-center justify-center"
                  style={{
                    width: '130px',
                    height: '110px',
                    background: FOLDER_COLORS[i % FOLDER_COLORS.length],
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: '28px' }}>🖼️</div>
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: '13px', textAlign: 'center', padding: '4px', color: '#444' }}>
                    {openFolder} — Add your photos here!
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="win95-sunken px-2 flex items-center justify-between"
        style={{ height: '22px', fontFamily: 'VT323, monospace', fontSize: '15px' }}
      >
        <span>
          {openFolder
            ? `${currentPhotos.length || 6} objects`
            : `${folders.length} folders`}
        </span>
        <span>Disk: 420.69 KB free</span>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="win95-raised p-2"
            style={{ maxWidth: '80vw', maxHeight: '80vh', background: '#c0c0c0' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt="Memory" style={{ maxWidth: '70vw', maxHeight: '65vh', display: 'block' }} />
            <div className="flex justify-between mt-1">
              <button
                onClick={() => setLightbox((l) => l && { ...l, idx: Math.max(0, l.idx - 1), src: currentPhotos[Math.max(0, l.idx - 1)] })}
                className="win95-raised px-2"
                aria-label="Previous photo"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', cursor: 'default', background: '#c0c0c0' }}
              >
                ← Prev
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="win95-raised px-2"
                aria-label="Close lightbox"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', cursor: 'default', background: '#c0c0c0' }}
              >
                Close
              </button>
              <button
                onClick={() => setLightbox((l) => l && { ...l, idx: Math.min(currentPhotos.length - 1, l.idx + 1), src: currentPhotos[Math.min(currentPhotos.length - 1, l.idx + 1)] })}
                className="win95-raised px-2"
                aria-label="Next photo"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', cursor: 'default', background: '#c0c0c0' }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
