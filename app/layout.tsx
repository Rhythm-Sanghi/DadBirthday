import type { Metadata } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'
import { config } from '@/config'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-retro',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `Happy Birthday, ${config.birthday.recipientFirstName}! 🎂`,
  description: `A personalized Windows 95-style birthday experience made with love by ${config.birthday.gifterName}.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body className="overflow-hidden w-screen h-screen">
        {/* Mobile BSOD — shown only on small screens */}
        <div className="md:hidden fixed inset-0 z-[99999] flex items-start justify-start p-8"
          style={{ background: '#0000AA', color: '#ffffff', fontFamily: 'VT323, monospace', fontSize: '20px', lineHeight: '1.5' }}>
          <div className="max-w-sm">
            <p>A fatal exception 0E has occurred at</p>
            <p>0028:C0011E36 in VXD VMM(01)+00010E36.</p>
            <br />
            <p style={{ background: '#ffffff', color: '#0000AA', padding: '4px 8px', display: 'inline-block' }}>
              💔 MONITOR RESOLUTION TOO LOW 💔
            </p>
            <br /><br />
            <p>This operating system requires a minimum</p>
            <p>screen width of 768px to function.</p>
            <br />
            <p>Please reboot in Desktop Mode.</p>
            <br />
            <p>* Press any key to continue</p>
            <p>  (jk, just get a bigger screen)</p>
            <br />
            <p>If this is a phone: we appreciate you,</p>
            <p>but this gift was made for a computer</p>
            <p>screen. Open it on a laptop or desktop</p>
            <p>for the full experience! 🖥️</p>
            <br />
            <p>— With love, {config.birthday.gifterName}</p>
            <br />
            <span className="cursor-blink">█</span>
          </div>
        </div>

        {/* Desktop app — shown on md+ screens */}
        <div className="hidden md:block w-full h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
