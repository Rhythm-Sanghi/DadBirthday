'use client'

import { useState, useCallback } from 'react'
import { config } from '@/config'

interface Story {
  id: string
  filename: string
  content: string
}

const stories: Story[] = config.stories

export default function DadTales() {
  const [selected, setSelected] = useState<Story>(stories[0])

  return (
    <div className="flex h-full" style={{ background: '#c0c0c0' }}>
      {/* Left panel — file list */}
      <div
        className="win95-sunken flex flex-col overflow-y-auto"
        style={{ width: '200px', minWidth: '150px', background: '#ffffff', padding: '4px' }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '7px',
            color: '#000080',
            padding: '4px 2px 6px',
            borderBottom: '1px solid #808080',
            marginBottom: '4px',
          }}
        >
          📄 Stories
        </div>
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setSelected(story)}
            aria-label={`Open ${story.filename}`}
            className="flex items-center gap-1 px-1 py-1 text-left cursor-default select-none w-full"
            style={{
              fontFamily: 'VT323, monospace',
              fontSize: '16px',
              background: selected.id === story.id ? '#000080' : 'transparent',
              color: selected.id === story.id ? '#ffffff' : '#000000',
              borderRadius: 0,
              outline: 'none',
              border: 'none',
            }}
          >
            <span>📄</span>
            <span style={{ wordBreak: 'break-all', lineHeight: '1.2', fontSize: '14px' }}>
              {story.filename}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: '4px', background: '#c0c0c0', cursor: 'col-resize' }} />

      {/* Right panel — story content */}
      <div
        className="win95-inset flex-1 overflow-y-auto p-4"
        style={{ background: '#ffffff' }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '8px',
            color: '#000080',
            marginBottom: '12px',
            borderBottom: '1px solid #808080',
            paddingBottom: '8px',
          }}
        >
          {selected.filename}
        </div>
        <div
          style={{
            fontFamily: 'VT323, monospace',
            fontSize: '20px',
            color: '#000000',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
          }}
        >
          {selected.content}
          <span className="cursor-blink">█</span>
        </div>
      </div>
    </div>
  )
}
