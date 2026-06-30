export type AppId =
  | 'birthday-card'
  | 'file-explorer'
  | 'dad-tales'
  | 'media-player'
  | 'terminal'
  | 'minesweeper'
  | 'about'
  | 'messages'
  | 'control-panel'

export type WindowState = 'normal' | 'minimized' | 'maximized'

export interface WindowInstance {
  id: string
  appId: AppId
  title: string
  state: WindowState
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
  isActive: boolean
}
