'use client'

import { useState, useEffect } from 'react'
import Desktop from '@/components/desktop/Desktop'
import BootScreen from '@/components/BootScreen'

export default function Home() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="w-full h-full">
      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} />
      ) : (
        <Desktop />
      )}
    </div>
  )
}
