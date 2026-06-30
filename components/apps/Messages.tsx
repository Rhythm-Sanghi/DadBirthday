'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { config } from '@/config'

// ----------------------------------------------------------------
// Messages.exe — Answering Machine
// Plays dad-voicemail.mp3 if present; otherwise reveals transcript
// line-by-line as a typewriter effect.
// ----------------------------------------------------------------

export default function Messages() {
  const [playing, setPlaying]         = useState(false)
  const [progress, setProgress]       = useState(0)       // 0–100
  const [duration, setDuration]       = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioAvailable, setAudioAvailable] = useState<boolean | null>(null)  // null = checking
  const [transcriptLines, setTranscriptLines] = useState<string[]>([])
  const [typewriterDone, setTypewriterDone]   = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const vm     = config.voicemail
  const lines  = Array.isArray(vm.transcriptFallback) ? vm.transcriptFallback : [vm.transcriptFallback as string]
  const hasAudioPath = vm.audioPath && vm.audioPath.length > 0

  // ── Check if audio file actually exists ──────────────────────
  useEffect(() => {
    if (!hasAudioPath) { setAudioAvailable(false); return }
    fetch(vm.audioPath, { method: 'HEAD' })
      .then((r) => setAudioAvailable(r.ok))
      .catch(() => setAudioAvailable(false))
  }, [hasAudioPath, vm.audioPath])

  // ── Wire up <audio> events once availability is known ────────
  useEffect(() => {
    if (audioAvailable !== true) return
    const audio = new Audio(vm.audioPath)
    audioRef.current = audio

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onLoaded   = () => setDuration(audio.duration)
    const onEnded    = () => { setPlaying(false); setProgress(100) }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioAvailable, vm.audioPath])

  // ── Typewriter: reveal lines one-by-one when no audio ────────
  useEffect(() => {
    if (audioAvailable !== false || transcriptLines.length >= lines.length) return
    if (!playing) return  // only advance when "playing"
    const t = setTimeout(() => {
      setTranscriptLines((prev) => {
        const next = [...prev, lines[prev.length]]
        if (next.length >= lines.length) setTypewriterDone(true)
        return next
      })
    }, 800)
    return () => clearTimeout(t)
  }, [audioAvailable, playing, transcriptLines, lines])

  // ── Play / Pause toggle ───────────────────────────────────────
  const handlePlay = useCallback(() => {
    if (audioAvailable === true && audioRef.current) {
      if (playing) { audioRef.current.pause() }
      else         { audioRef.current.play()  }
    }
    setPlaying((p) => !p)
  }, [audioAvailable, playing])

  const handleRewind = useCallback(() => {
    if (audioRef.current) audioRef.current.currentTime = 0
    setCurrentTime(0)
    setProgress(0)
    setPlaying(false)
    setTranscriptLines([])
    setTypewriterDone(false)
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const isLoading = audioAvailable === null

  return (
    <div
      className="flex flex-col h-full p-4 gap-3"
      style={{ background: '#c0c0c0', fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Header — cassette tape label */}
      <div className="win95-sunken px-3 py-2" style={{ background: '#ffffff' }}>
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#808080', marginBottom: 4 }}>
          ANSWERING MACHINE
        </div>
        <div className="flex items-center gap-2">
          {/* Blinking red dot */}
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#ff0000',
              animation: 'blink-dot 1s step-start infinite',
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: 1 }}>
            1 NEW MESSAGE
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#444', marginTop: 4 }}>
          From: <strong>{vm.callerName}</strong> &nbsp;|&nbsp; {vm.callerDate}
        </div>
      </div>

      {/* Tape player controls */}
      <div className="win95-raised px-3 py-3" style={{ background: '#c0c0c0' }}>
        {/* Tape reels — purely decorative */}
        <div className="flex justify-center gap-8 mb-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 40, height: 40,
                border: '2px solid #808080',
                borderRadius: '50%',
                background: '#1a1a1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: playing ? `spin-reel${i} 2s linear infinite` : 'none',
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#444', border: '2px solid #666' }} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="win95-sunken mb-2"
          style={{ height: 14, background: '#000', cursor: 'pointer', position: 'relative' }}
          aria-label="Playback progress"
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #004400, #00cc00)',
              transition: 'width 0.5s linear',
            }}
          />
        </div>

        {/* Time display */}
        <div className="flex justify-between" style={{ fontFamily: 'VT323, monospace', fontSize: 15, color: '#444', marginBottom: 6 }}>
          <span>{formatTime(currentTime)}</span>
          <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-2">
          <button
            onClick={handleRewind}
            aria-label="Rewind"
            className="win95-raised px-3 py-1"
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', cursor: 'default', background: '#c0c0c0' }}
          >
            |◀◀
          </button>
          <button
            onClick={handlePlay}
            disabled={isLoading}
            aria-label={playing ? 'Pause' : 'Play'}
            className="win95-raised px-4 py-1"
            style={{
              fontFamily: '"Press Start 2P", monospace', fontSize: '8px',
              cursor: isLoading ? 'default' : 'default',
              background: '#c0c0c0',
              minWidth: 70,
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? 'LOADING' : playing ? '⏸ PAUSE' : '▶ PLAY'}
          </button>
        </div>
      </div>

      {/* Transcript or status */}
      <div
        className="win95-sunken flex-1 p-3 overflow-y-auto"
        style={{ background: '#fffff0', fontFamily: 'VT323, monospace', fontSize: 18, lineHeight: 1.6 }}
      >
        {audioAvailable === true ? (
          <div style={{ color: '#004400' }}>
            {playing
              ? '▶ Playing — use your device speakers.'
              : progress === 100
                ? '✓ Message played.'
                : '▶ Press PLAY to hear your message.'}
          </div>
        ) : audioAvailable === false ? (
          <>
            <div style={{ color: '#808080', fontSize: 13, marginBottom: 6, fontFamily: 'Arial, sans-serif' }}>
              [Transcript]
            </div>
            {transcriptLines.map((line, i) => (
              <div key={i} style={{ color: '#000033' }}>{line}</div>
            ))}
            {playing && !typewriterDone && (
              <span className="cursor-blink" style={{ color: '#000080' }}>█</span>
            )}
            {!playing && transcriptLines.length === 0 && (
              <div style={{ color: '#808080', fontStyle: 'italic', fontSize: 15 }}>
                Press PLAY to read message...
              </div>
            )}
          </>
        ) : (
          <div style={{ color: '#808080' }}>Checking tape...</div>
        )}
      </div>

      {/* CSS for blink + spin — scoped via style tag */}
      <style>{`
        @keyframes blink-dot { 50% { opacity: 0; } }
        @keyframes spin-reel0 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reel1 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  )
}
