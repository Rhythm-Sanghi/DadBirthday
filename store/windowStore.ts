import { create } from 'zustand'
import { WindowInstance, AppId, WindowState } from '@/types/window'

let instanceCounter = 0

interface WindowStore {
  windows: WindowInstance[]
  openWindow: (appId: AppId, title: string, defaultSize?: { width: number; height: number }) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, position: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
  getOpenWindows: () => WindowInstance[]
  getTaskbarWindows: () => WindowInstance[]
  getActiveWindow: () => WindowInstance | undefined
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  openWindow: (appId, title, defaultSize) => {
    const { windows } = get()
    const maxZIndex = windows.reduce((max, w) => Math.max(max, w.zIndex), 0)
    const offset = (instanceCounter % 8) * 24
    instanceCounter++

    const baseSize = defaultSize ?? { width: 640, height: 480 }
    const id = `${appId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

    set((state) => ({
      windows: [
        ...state.windows,
        {
          id,
          appId,
          title,
          state: 'normal' as WindowState,
          zIndex: maxZIndex + 1,
          position: { x: 80 + offset, y: 60 + offset },
          size: baseSize,
          isActive: true,
        },
      ].map((w) => (w.id === id ? w : { ...w, isActive: false })),
    }))
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }))
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, state: 'minimized' as WindowState, isActive: false } : w
      ),
    }))
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w
        const newState: WindowState = w.state === 'maximized' ? 'normal' : 'maximized'
        return { ...w, state: newState }
      }),
    }))
  },

  focusWindow: (id) => {
    const { windows } = get()
    const maxZIndex = windows.reduce((max, w) => Math.max(max, w.zIndex), 0)
    set((state) => ({
      windows: state.windows.map((w) => ({
        ...w,
        isActive: w.id === id,
        zIndex: w.id === id ? maxZIndex + 1 : w.zIndex,
        state: w.id === id && w.state === 'minimized' ? ('normal' as WindowState) : w.state,
      })),
    }))
  },

  updatePosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    }))
  },

  updateSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }))
  },

  getOpenWindows: () => get().windows.filter((w) => w.state !== 'minimized'),
  getTaskbarWindows: () => get().windows,
  getActiveWindow: () => {
    const wins = get().windows
    return wins.reduce<WindowInstance | undefined>((best, w) => {
      if (!best) return w
      return w.zIndex > best.zIndex ? w : best
    }, undefined)
  },
}))
