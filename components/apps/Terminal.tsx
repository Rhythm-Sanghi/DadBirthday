'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useWindowStore } from '@/store/windowStore'
import { config } from '@/config'

interface TerminalLine {
  text: string
  type: 'output' | 'input' | 'system' | 'error' | 'success'
}

type AdventureState = 'none' | 'start' | 'room1a' | 'room1b' | 'room2a' | 'room2b' | 'end'

const DIRS = [
  'secrets.dat        .hidden_jokes     memories.sys      dad_wisdom.txt',
  'birthday_gift.exe  love_letters/     embarrassing/     The_Vault/',
  'rickroll.bat       nice_try.txt      404_youth.sys     config_dad.ini',
]

const JOKES = config.insideJokes

const FACTS = config.terminalFacts

const FORTUNES = [
  '"The secret to happiness is good chai, good company, and knowing where your keys are."',
  '"A man who wakes up before the birds has already won the day."',
  '"Every problem has a solution. Usually tape, confidence, and a rubber band."',
  '"The best investment is in the people you love. Returns are infinite."',
  '"It\'s not about the destination. It\'s about finding the best dhaba on the way."',
]

const ADVENTURE: Record<AdventureState, { text: string[]; choices?: string[] }> = {
  none: { text: [] },
  start: {
    text: [
      '',
      'Accessing classified files...',
      '[████████████████] 100%',
      '',
      'Welcome to: THE VAULT OF MEMORIES',
      `Licensed to: ${config.birthday.recipientName}`,
      '',
      'You find yourself in a hallway with two doors.',
      'A warm light glows from underneath each one.',
      '',
      '> Door 1: "The Early Years" (you hear old Bollywood music)',
      '> Door 2: "The Legend Grows" (something smells like masala chai)',
      '',
      'Type 1 or 2 to continue...',
    ],
    choices: ['1', '2'],
  },
  room1a: {
    text: [
      '',
      '--- The Early Years ---',
      '',
      'You step through the door and find a scrapbook glowing',
      'on an old wooden table. It\'s full of photos and stories',
      'from before you can even remember.',
      '',
      'There\'s a sticky note on the front that says:',
      '"You were always going to be extraordinary."',
      '',
      '> Path A: "Open the scrapbook" (go deeper)',
      '> Path B: "Step back into the hallway" (return)',
      '',
      'Type A or B...',
    ],
    choices: ['a', 'b'],
  },
  room1b: {
    text: [
      '',
      '--- The Legend Grows ---',
      '',
      'The room is filled with certificates, trophies (metaphorical ones),',
      'and a whiteboard covered in life lessons.',
      '',
      'In the center: a single chair. A cup of chai, still warm.',
      'A sticky note on the cup says:',
      '"You made every day count."',
      '',
      '> Path A: "Read the whiteboard" (go deeper)',
      '> Path B: "Return to hallway"',
      '',
      'Type A or B...',
    ],
    choices: ['a', 'b'],
  },
  room2a: {
    text: [
      '',
      '====================================',
      '  🎂 YOU FOUND THE SECRET ENDING 🎂',
      '====================================',
      '',
      `Congratulations, ${config.birthday.recipientFirstName}.`,
      '',
      'You have successfully navigated The Vault of Memories.',
      'Your reward: the truth.',
      '',
      'The truth is: you are deeply, completely, endlessly loved.',
      '',
      'Every road trip, every piece of advice, every early morning,',
      'every story that went on slightly too long — all of it has',
      'shaped the people around you in ways they cannot fully express.',
      '',
      'This OS? This is just one small attempt.',
      '',
      `Happy Birthday, ${config.birthday.recipientName}.`,
      `From: ${config.birthday.gifterName}, with all the love. 💙`,
      '',
      '>>> Type "exit" to close this window.',
      '>>> Or just keep exploring. We\'re not the boss of you.',
      '',
    ],
    choices: [],
  },
  room2b: {
    text: [
      '',
      '--- Back in the hallway ---',
      'The doors are still there. The warm light still glows.',
      '',
      'Type 1 or 2 to try again...',
    ],
    choices: ['1', '2'],
  },
  end: { text: [] },
}

interface TerminalProps {
  windowId: string
}

export default function Terminal({ windowId }: TerminalProps) {
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: 'Microsoft(R) Windows 95', type: 'system' },
    { text: '(C) Copyright Microsoft Corp 1981-1995.', type: 'system' },
    { text: '', type: 'output' },
    { text: 'Type "help" for available commands.', type: 'system' },
    { text: '', type: 'output' },
  ])
  const [input, setInput] = useState('')
  const [adventureState, setAdventureState] = useState<AdventureState>('none')
  const [matrixActive, setMatrixActive] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const addLines = useCallback((newLines: Array<{ text: string; type: TerminalLine['type'] }>) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  // Pre-generate stable random values so re-renders don't scramble them
  const matrixColumns = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${(i / 24) * 100 + Math.random() * 2}%`,
      duration: 1.2 + Math.random() * 1.6,
      delay: Math.random() * 1.2,
      fontSize: 13 + Math.floor(Math.random() * 6),
      chars: Array.from({ length: 28 }, () =>
        String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
      ).join('\n'),
    })),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [matrixActive]   // regenerate fresh chars each time it activates
  )

  const runMatrix = useCallback(() => {
    setMatrixActive(true)
    setTimeout(() => setMatrixActive(false), 3000)
  }, [])

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    addLines([{ text: `C:\\> ${cmd}`, type: 'input' }])

    // Adventure mode
    if (adventureState !== 'none') {
      if (adventureState === 'start') {
        if (trimmed === '1') {
          addLines(ADVENTURE.room1a.text.map((t) => ({ text: t, type: 'output' as const })))
          setAdventureState('room1a')
        } else if (trimmed === '2') {
          addLines(ADVENTURE.room1b.text.map((t) => ({ text: t, type: 'output' as const })))
          setAdventureState('room1b')
        } else {
          addLines([{ text: 'Type 1 or 2 to choose a door.', type: 'error' }])
        }
        return
      }
      if (adventureState === 'room1a' || adventureState === 'room1b') {
        if (trimmed === 'a') {
          addLines(ADVENTURE.room2a.text.map((t) => ({ text: t, type: 'success' as const })))
          setAdventureState('end')
        } else if (trimmed === 'b') {
          addLines(ADVENTURE.room2b.text.map((t) => ({ text: t, type: 'output' as const })))
          setAdventureState('start')
        } else {
          addLines([{ text: 'Type A or B.', type: 'error' }])
        }
        return
      }
    }

    switch (trimmed) {
      case 'help':
        addLines([
          { text: '', type: 'output' },
          { text: 'Available commands:', type: 'system' },
          { text: '─'.repeat(40), type: 'output' },
          { text: '  help       — Show this help', type: 'output' },
          { text: '  dir        — List directory', type: 'output' },
          { text: '  whoami     — Who are you?', type: 'output' },
          { text: '  birthday   — ASCII birthday cake', type: 'output' },
          { text: '  joke       — Random inside joke', type: 'output' },
          { text: '  secret     — ??? (classified)', type: 'output' },
          { text: `  facts      — facts ${config.birthday.recipientFirstName.toLowerCase()}`, type: 'output' },
          { text: '  then_vs_now — 1995 vs today', type: 'output' },
          { text: '  love       — A message for you', type: 'output' },
          { text: '  fortune    — Words of wisdom', type: 'output' },
          { text: '  matrix     — The Matrix has you', type: 'output' },
          { text: '  cls        — Clear screen', type: 'output' },
          { text: '  exit       — Close terminal', type: 'output' },
          { text: '', type: 'output' },
        ])
        break

      case 'dir':
        addLines([
          { text: '', type: 'output' },
          { text: ` Volume in drive C is BIRTHDAY_EDITION`, type: 'output' },
          { text: ` Volume Serial Number is B1RTH-D4Y`, type: 'output' },
          { text: '', type: 'output' },
          { text: ` Directory of C:\\MEMORIES`, type: 'output' },
          { text: '', type: 'output' },
          ...DIRS.map((d) => ({ text: `  ${d}`, type: 'output' as const })),
          { text: '', type: 'output' },
          { text: `        7 File(s)    420,690 bytes`, type: 'output' },
          { text: `        ∞ Dir(s)   INFINITE bytes free`, type: 'output' },
          { text: '', type: 'output' },
        ])
        break

      case 'whoami':
        addLines([
          { text: '', type: 'output' },
          { text: `User: ${config.birthday.recipientName}`, type: 'success' },
          { text: `Age:  ${config.birthday.recipientAge} (WOW, very distinguished!)`, type: 'success' },
          { text: `Role: Legend, Dad, Chai Expert, GPS Override Specialist`, type: 'success' },
          { text: `Status: Deeply loved`, type: 'success' },
          { text: '', type: 'output' },
        ])
        break

      case 'birthday':
        addLines([
          { text: '', type: 'output' },
          { text: `  *  *  *  *  *  *  *  *  *`, type: 'success' },
          { text: `  |  |  |  |  |  |  |  |  |`, type: 'success' },
          { text: `  |  |  |  |  |  |  |  |  |`, type: 'success' },
          { text: ` ╔═══════════════════════╗`, type: 'success' },
          { text: ` ║  HAPPY BIRTHDAY SUMIT ║`, type: 'success' },
          { text: ` ╚═══════════════════════╝`, type: 'success' },
          { text: ` ╔═══════════════════════╗`, type: 'success' },
          { text: ` ║   🎂 🎉 💙 🎊 🎈 🎁  ║`, type: 'success' },
          { text: ` ╚═══════════════════════╝`, type: 'success' },
          { text: ` ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`, type: 'success' },
          { text: '', type: 'output' },
        ])
        break

      case 'joke':
        addLines([
          { text: '', type: 'output' },
          { text: JOKES[Math.floor(Math.random() * JOKES.length)], type: 'success' },
          { text: '', type: 'output' },
        ])
        break

      case 'secret':
        addLines(ADVENTURE.start.text.map((t) => ({ text: t, type: 'output' as const })))
        setAdventureState('start')
        break

      case `facts ${config.birthday.recipientFirstName.toLowerCase()}`:
      case 'facts sumit':
      case 'facts':
        addLines([
          { text: '', type: 'output' },
          { text: `FUN FACTS ABOUT ${config.birthday.recipientName.toUpperCase()}:`, type: 'system' },
          { text: '─'.repeat(40), type: 'output' },
          ...FACTS.map((f, i) => ({ text: `${i + 1}. ${f}`, type: 'output' as const })),
          { text: '', type: 'output' },
        ])
        break

      case 'love':
        addLines([
          { text: '', type: 'output' },
          { text: '  ♥♥♥   ♥♥♥  ', type: 'success' },
          { text: ' ♥♥♥♥♥ ♥♥♥♥♥ ', type: 'success' },
          { text: '  ♥♥♥♥♥♥♥♥♥  ', type: 'success' },
          { text: '   ♥♥♥♥♥♥♥   ', type: 'success' },
          { text: '    ♥♥♥♥♥    ', type: 'success' },
          { text: '     ♥♥♥     ', type: 'success' },
          { text: '      ♥      ', type: 'success' },
          { text: '', type: 'output' },
          { text: `Happy Birthday, ${config.birthday.recipientName}.`, type: 'success' },
          { text: `With love, ${config.birthday.gifterName}.`, type: 'success' },
          { text: '', type: 'output' },
        ])
        break

      case 'fortune':
        addLines([
          { text: '', type: 'output' },
          { text: '--- Fortune Cookie ---', type: 'system' },
          { text: FORTUNES[Math.floor(Math.random() * FORTUNES.length)], type: 'success' },
          { text: '', type: 'output' },
        ])
        break

      case 'then_vs_now': {
        // Build fixed-width columns matching `dir` / `facts` formatting style
        const COL_LABEL = 26
        const COL_THEN  = 26
        const pad = (s: string, n: number) => s.length >= n ? s.slice(0, n - 1) + ' ' : s + ' '.repeat(n - s.length)
        addLines([
          { text: '', type: 'output' },
          { text: `  THEN (${config.birthday.systemYear ?? '1995'}) vs NOW`, type: 'system' },
          { text: '─'.repeat(72), type: 'output' },
          { text: `  ${pad('Category', COL_LABEL)}${pad('Then', COL_THEN)}Now`, type: 'system' },
          { text: '─'.repeat(72), type: 'output' },
          ...config.thenVsNow.map((row) => ({
            text: `  ${pad(row.label, COL_LABEL)}${pad(row.then, COL_THEN)}${row.now}`,
            type: 'output' as const,
          })),
          { text: '─'.repeat(72), type: 'output' },
          { text: '', type: 'output' },
        ])
        break
      }

      case 'matrix':
        addLines([{ text: 'Entering The Matrix...', type: 'system' }])
        runMatrix()
        break

      case 'cls':
        setLines([])
        break

      case 'exit':
        closeWindow(windowId)
        break

      default:
        addLines([
          { text: `'${cmd}' is not recognized as an internal or external command.`, type: 'error' },
          { text: `Try 'help' for available commands.`, type: 'error' },
        ])
    }
  }, [adventureState, addLines, closeWindow, runMatrix, windowId])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    handleCommand(input)
    setInput('')
  }, [input, handleCommand])

  const getColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return '#ffffff'
      case 'system': return '#c0c0c0'
      case 'error': return '#ff4444'
      case 'success': return '#00ff00'
      default: return '#a0a0a0'
    }
  }

  return (
    <div
      className="relative h-full flex flex-col"
      style={{ background: '#000000', fontFamily: 'VT323, monospace', fontSize: '18px' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Matrix overlay */}
      {matrixActive && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {matrixColumns.map((col) => (
            <div
              key={col.id}
              style={{
                position: 'absolute',
                left: col.left,
                top: '-120px',
                color: '#00ff00',
                fontFamily: 'VT323, monospace',
                fontSize: col.fontSize,
                whiteSpace: 'pre',
                lineHeight: '1.2',
                animation: `matrix-drop ${col.duration}s linear ${col.delay}s both`,
                textShadow: '0 0 8px #00ff00',
              }}
            >
              {col.chars}
            </div>
          ))}
        </div>
      )}

      {/* Output */}
      <div className="flex-1 overflow-y-auto p-3 pb-0">
        {lines.map((line, i) => (
          <div key={i} style={{ color: getColor(line.type), whiteSpace: 'pre-wrap' }}>
            {line.text || '\u00A0'}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center p-3 pt-1">
        <span style={{ color: '#c0c0c0' }}>C:\&gt;&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none"
          style={{ color: '#ffffff', fontFamily: 'VT323, monospace', fontSize: '18px', caretColor: '#ffffff' }}
          aria-label="Terminal input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="cursor-blink" style={{ color: '#ffffff' }}>█</span>
      </form>
    </div>
  )
}
