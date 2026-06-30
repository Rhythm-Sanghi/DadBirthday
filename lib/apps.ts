import { AppId } from '@/types/window'

interface AppDef {
  title: string
  icon: string
  defaultSize: { width: number; height: number }
  desktopLabel: string
}

export const appRegistry: Record<AppId, AppDef> = {
  'birthday-card': {
    title: '🎂 Happy Birthday, Sumit!',
    icon: '🎂',
    defaultSize: { width: 500, height: 440 },
    desktopLabel: 'Birthday Card',
  },
  'file-explorer': {
    title: '📁 My Memories — Sumit\'s Album',
    icon: '📁',
    defaultSize: { width: 680, height: 500 },
    desktopLabel: 'My Memories',
  },
  'dad-tales': {
    title: '📝 DadTales.exe — Notepad',
    icon: '📝',
    defaultSize: { width: 700, height: 500 },
    desktopLabel: 'DadTales.exe',
  },
  'media-player': {
    title: '🎵 WinBlast 2000 — v2.91',
    icon: '🎵',
    defaultSize: { width: 295, height: 420 },
    desktopLabel: 'WinBlast 2000',
  },
  'terminal': {
    title: 'C:\\WINDOWS\\system32\\cmd.exe',
    icon: '💻',
    defaultSize: { width: 680, height: 420 },
    desktopLabel: 'cmd.exe',
  },
  'minesweeper': {
    title: '💣 Minesweeper',
    icon: '💣',
    defaultSize: { width: 380, height: 400 },
    desktopLabel: 'Minesweeper',
  },
  'about': {
    title: 'ℹ️ About Retro Nostalgia OS',
    icon: 'ℹ️',
    defaultSize: { width: 380, height: 320 },
    desktopLabel: 'About This PC',
  },
  'messages': {
    title: '📼 Messages — 1 New Message',
    icon: '📼',
    defaultSize: { width: 420, height: 360 },
    desktopLabel: 'Messages.exe',
  },
  'control-panel': {
    title: '🛠 Control Panel — Installed Programs',
    icon: '🛠',
    defaultSize: { width: 540, height: 380 },
    desktopLabel: 'Control Panel',
  },
}

export const desktopIcons: Array<{ appId: AppId; label: string; icon: string }> = [
  { appId: 'birthday-card',  label: 'Birthday Card',  icon: '🎂' },
  { appId: 'file-explorer',  label: 'My Memories',    icon: '📁' },
  { appId: 'dad-tales',      label: 'DadTales.exe',   icon: '📝' },
  { appId: 'media-player',   label: 'WinBlast 2000',  icon: '🎵' },
  { appId: 'terminal',       label: 'cmd.exe',         icon: '💻' },
  { appId: 'minesweeper',    label: 'Minesweeper',     icon: '💣' },
  { appId: 'messages',       label: 'Messages.exe',    icon: '📼' },
  { appId: 'control-panel',  label: 'Control Panel',   icon: '🛠' },
  { appId: 'about',          label: 'About This PC',   icon: 'ℹ️' },
]
