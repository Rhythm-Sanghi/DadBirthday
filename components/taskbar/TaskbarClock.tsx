'use client'

import { useClock } from '@/hooks/useClock'

export default function TaskbarClock() {
  const { time, date } = useClock()

  return (
    <div
      className="win95-sunken px-2 flex items-center justify-center"
      style={{ minWidth: '80px', height: '28px' }}
      title={date}
      role="status"
      aria-label={`Current time: ${time}`}
    >
      <span style={{ fontFamily: 'VT323, monospace', fontSize: '18px', color: '#000000', whiteSpace: 'nowrap' }}>
        {time}
      </span>
    </div>
  )
}
