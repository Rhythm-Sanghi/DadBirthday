'use client'

import { useState, useCallback } from 'react'
import { config } from '@/config'

interface Track {
  id: number
  title: string
  artist: string
}

const playlist: Track[] = config.dadJams

const EQ_BARS = 12

export default function MediaPlayer() {
  const [playing, setPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track>(playlist[0])
  const [volume, setVolume] = useState(70)

  const handlePlay = useCallback(() => setPlaying((p) => !p), [])
  const handleStop = useCallback(() => { setPlaying(false) }, [])

  const handleNext = useCallback(() => {
    const idx = playlist.findIndex((t) => t.id === currentTrack.id)
    setCurrentTrack(playlist[(idx + 1) % playlist.length])
  }, [currentTrack])

  const handlePrev = useCallback(() => {
    const idx = playlist.findIndex((t) => t.id === currentTrack.id)
    setCurrentTrack(playlist[(idx - 1 + playlist.length) % playlist.length])
  }, [currentTrack])

  return (
    <div
      className="flex flex-col h-full select-none"
      style={{ background: '#000000', color: '#00ff00', fontFamily: 'VT323, monospace', padding: '4px' }}
    >
      {/* Now Playing display */}
      <div
        className="win95-inset p-2 mb-2"
        style={{ background: '#001100', minHeight: '52px' }}
      >
        <div style={{ color: '#888888', fontSize: '12px', marginBottom: '2px', fontFamily: '"Press Start 2P", monospace' }}>
          NOW PLAYING:
        </div>
        <div style={{ overflow: 'hidden', height: '22px' }}>
          <div className="marquee-text" style={{ color: '#00ff00', fontSize: '20px' }}>
            {playing ? `▶ ${currentTrack.title} — ${currentTrack.artist}` : `■ ${currentTrack.title} — ${currentTrack.artist}`}
          </div>
        </div>
        <div style={{ color: '#007700', fontSize: '14px', marginTop: '2px' }}>
          {currentTrack.artist}
        </div>
      </div>

      {/* Equalizer */}
      <div
        className={`win95-inset p-2 mb-2 ${!playing ? 'eq-paused' : ''}`}
        style={{ background: '#001100', height: '80px' }}
      >
        <div style={{ color: '#444', fontSize: '11px', fontFamily: '"Press Start 2P", monospace', marginBottom: '4px' }}>
          EQUALIZER
        </div>
        <div className="flex items-end gap-0.5 h-10">
          {Array.from({ length: EQ_BARS }).map((_, i) => (
            <div
              key={i}
              className={`eq-bar-${i + 1}`}
              style={{
                flex: 1,
                background: `linear-gradient(180deg, #00ff00 0%, #008800 60%, #004400 100%)`,
                height: '70%',
                transition: 'height 0.3s ease',
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-1 mb-2 justify-center">
        <button
          onClick={handlePrev}
          aria-label="Previous track"
          className="win95-raised px-2 py-0.5"
          style={{ background: '#c0c0c0', color: '#000', fontFamily: '"Press Start 2P", monospace', fontSize: '8px', cursor: 'default' }}
        >
          |◀◀
        </button>
        <button
          onClick={handlePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="win95-raised px-2 py-0.5"
          style={{ background: '#c0c0c0', color: '#000', fontFamily: '"Press Start 2P", monospace', fontSize: '8px', cursor: 'default', minWidth: '52px' }}
        >
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={handleStop}
          aria-label="Stop"
          className="win95-raised px-2 py-0.5"
          style={{ background: '#c0c0c0', color: '#000', fontFamily: '"Press Start 2P", monospace', fontSize: '8px', cursor: 'default' }}
        >
          ■ Stop
        </button>
        <button
          onClick={handleNext}
          aria-label="Next track"
          className="win95-raised px-2 py-0.5"
          style={{ background: '#c0c0c0', color: '#000', fontFamily: '"Press Start 2P", monospace', fontSize: '8px', cursor: 'default' }}
        >
          ▶▶|
        </button>
      </div>

      {/* Volume */}
      <div className="mb-2 flex items-center gap-2 px-1">
        <span style={{ color: '#888', fontSize: '12px', fontFamily: '"Press Start 2P", monospace', minWidth: '50px' }}>
          VOL:
        </span>
        <div className="flex-1 win95-sunken" style={{ height: '14px', background: '#001100', padding: '2px' }}>
          <div
            style={{
              height: '100%',
              width: `${volume}%`,
              background: 'linear-gradient(90deg, #004400, #00ff00)',
              transition: 'width 0.1s',
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          style={{ position: 'absolute', opacity: 0, width: '140px', cursor: 'pointer' }}
        />
        <span style={{ color: '#00ff00', fontSize: '14px', minWidth: '36px' }}>{volume}%</span>
      </div>

      {/* Playlist */}
      <div className="win95-inset flex-1 overflow-y-auto" style={{ background: '#001100' }}>
        <div style={{ color: '#444', fontSize: '11px', fontFamily: '"Press Start 2P", monospace', padding: '4px 6px 2px', borderBottom: '1px solid #004400' }}>
          PLAYLIST
        </div>
        {playlist.map((track, i) => (
          <button
            key={track.id}
            onClick={() => { setCurrentTrack(track); setPlaying(true) }}
            aria-label={`Play ${track.title}`}
            className="w-full text-left px-2 py-0.5"
            style={{
              background: currentTrack.id === track.id ? '#004400' : 'transparent',
              color: currentTrack.id === track.id ? '#00ff00' : '#006600',
              fontFamily: 'VT323, monospace',
              fontSize: '15px',
              cursor: 'default',
              border: 'none',
              outline: 'none',
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {i + 1}. {track.title}
          </button>
        ))}
      </div>
    </div>
  )
}
