// lib/sounds.ts — Web Audio API sound effects (no audio files needed)

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return audioCtx
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'square', gain = 0.3) {
  try {
    const ctx = getCtx()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
    gainNode.gain.setValueAtTime(gain, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  } catch {
    // Silently fail if audio is not available
  }
}

export function playClick() {
  playTone(440, 0.05, 'square', 0.15)
}

export function playWindowOpen() {
  playTone(440, 0.1, 'sine', 0.2)
  setTimeout(() => playTone(550, 0.1, 'sine', 0.2), 60)
  setTimeout(() => playTone(660, 0.15, 'sine', 0.2), 120)
}

export function playWindowClose() {
  playTone(660, 0.1, 'sine', 0.2)
  setTimeout(() => playTone(550, 0.1, 'sine', 0.2), 60)
  setTimeout(() => playTone(440, 0.15, 'sine', 0.15), 120)
}

export function playError() {
  playTone(220, 0.15, 'sawtooth', 0.3)
  setTimeout(() => playTone(200, 0.2, 'sawtooth', 0.3), 150)
}

export function playStartup() {
  // Approximate the Win95 startup chime
  const notes = [
    { f: 523, d: 0.15 },
    { f: 659, d: 0.1 },
    { f: 784, d: 0.2 },
    { f: 698, d: 0.1 },
    { f: 784, d: 0.3 },
  ]
  let delay = 0
  notes.forEach(({ f, d }) => {
    setTimeout(() => playTone(f, d, 'sine', 0.25), delay * 1000)
    delay += d + 0.05
  })
}
