'use client'

import { config } from '@/config'

export default function BirthdayCard() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full p-6 text-center"
      style={{ background: '#ffffff', overflowY: 'auto' }}
    >
      {/* Pixel Birthday Cake */}
      <div className="mb-4" style={{ lineHeight: 1.1 }}>
        {/* Candles row */}
        <div className="flex justify-center gap-3 mb-1">
          {['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff'].map((color, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <div
                className="candle-flame"
                style={{
                  width: '8px',
                  height: '14px',
                  background: `radial-gradient(ellipse at 50% 70%, #ffff00, ${color})`,
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  animationDelay: `${i * 0.07}s`,
                }}
              />
              {/* Wick */}
              <div style={{ width: '2px', height: '6px', background: '#444' }} />
              {/* Candle body */}
              <div style={{ width: '10px', height: '28px', background: color, border: '1px solid #ccc' }} />
            </div>
          ))}
        </div>

        {/* Cake layers */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Top layer */}
          <div style={{
            width: '140px', height: '36px',
            background: 'linear-gradient(180deg, #ff9ecd, #ff6bab)',
            border: '2px solid #d45b8d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontFamily: 'VT323, monospace', fontSize: '14px', color: '#ffffff', textShadow: '1px 1px 0 #d45b8d' }}>
              Happy Birthday!
            </div>
          </div>
          {/* Frosting drip */}
          <div style={{ width: '160px', height: '10px', background: 'repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 18px, transparent 18px, transparent 28px)', position: 'relative', top: '-2px' }} />
          {/* Middle layer */}
          <div style={{
            width: '180px', height: '40px',
            background: 'linear-gradient(180deg, #ffe066, #ffcc00)',
            border: '2px solid #ccaa00',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: '-2px',
          }}>
            <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#6b4400' }}>
              {config.birthday.recipientFirstName}
            </div>
          </div>
          {/* Frosting drip 2 */}
          <div style={{ width: '200px', height: '10px', background: 'repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 22px, transparent 22px, transparent 32px)', position: 'relative', top: '-2px' }} />
          {/* Bottom layer */}
          <div style={{
            width: '200px', height: '44px',
            background: 'linear-gradient(180deg, #7ec8e3, #0077b6)',
            border: '2px solid #005f91',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: '-2px',
          }}>
            <div style={{ fontFamily: 'VT323, monospace', fontSize: '18px', color: '#ffffff' }}>
              🎉 With Love 🎉
            </div>
          </div>
          {/* Plate */}
          <div style={{ width: '220px', height: '10px', background: '#808080', border: '1px solid #000' }} />
        </div>
      </div>

      {/* Message */}
      <div style={{ maxWidth: '380px' }}>
        <p
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '10px',
            color: '#000080',
            marginBottom: '12px',
            lineHeight: '2',
          }}
        >
          ✨ Happy Birthday, {config.birthday.recipientName}! ✨
        </p>

        <p
          style={{
            fontFamily: 'VT323, monospace',
            fontSize: '20px',
            color: '#000000',
            marginBottom: '12px',
            lineHeight: '1.5',
          }}
        >
          {config.birthday.personalMessage}
        </p>

        <p
          style={{
            fontFamily: 'VT323, monospace',
            fontSize: '18px',
            color: '#444444',
            marginBottom: '12px',
            lineHeight: '1.5',
          }}
        >
          This little OS is filled with memories, inside jokes,
          and proof that someone who loves you very much
          has too much free time. 😄
        </p>

        <p
          style={{
            fontFamily: 'VT323, monospace',
            fontSize: '18px',
            color: '#444',
            marginBottom: '16px',
          }}
        >
          Explore. Double-click everything. Have fun.
        </p>

        <p
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '9px',
            color: '#000080',
          }}
        >
          With love, {config.birthday.gifterName} 💙
        </p>
      </div>
    </div>
  )
}
