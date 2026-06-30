'use client'

import { useReducer, useCallback, useEffect } from 'react'

type CellState = 'hidden' | 'revealed' | 'flagged' | 'exploded'

interface Cell {
  isMine: boolean
  adjacentMines: number
  state: CellState
}

type Difficulty = 'beginner' | 'intermediate' | 'expert'

const CONFIGS: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  beginner:     { rows: 9,  cols: 9,  mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert:       { rows: 16, cols: 30, mines: 99 },
}

type GameStatus = 'idle' | 'playing' | 'won' | 'lost'

interface GameState {
  grid: Cell[][]
  status: GameStatus
  flagCount: number
  revealCount: number
  difficulty: Difficulty
  time: number
}

function createGrid(rows: number, cols: number, mines: number, firstClick?: [number, number]): Cell[][] {
  const grid: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      adjacentMines: 0,
      state: 'hidden' as CellState,
    }))
  )

  // Place mines avoiding first click and its neighbors
  const forbidden = new Set<string>()
  if (firstClick) {
    const [fr, fc] = firstClick
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        const nr = fr + dr, nc = fc + dc
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols)
          forbidden.add(`${nr},${nc}`)
      }
  }

  let placed = 0
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)
    if (!grid[r][c].isMine && !forbidden.has(`${r},${c}`)) {
      grid[r][c].isMine = true
      placed++
    }
  }

  // Calculate adjacentMines
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].isMine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].isMine)
            count++
        }
      grid[r][c].adjacentMines = count
    }
  }
  return grid
}

function revealCell(grid: Cell[][], r: number, c: number): Cell[][] {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })))
  const rows = grid.length
  const cols = grid[0].length

  function flood(row: number, col: number) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return
    const cell = newGrid[row][col]
    if (cell.state !== 'hidden') return
    cell.state = 'revealed'
    if (cell.adjacentMines === 0 && !cell.isMine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          flood(row + dr, col + dc)
    }
  }

  flood(r, c)
  return newGrid
}

type GameAction =
  | { type: 'REVEAL'; r: number; c: number }
  | { type: 'FLAG'; r: number; c: number }
  | { type: 'RESET'; difficulty: Difficulty }
  | { type: 'TICK' }

function countRevealed(grid: Cell[][]): number {
  return grid.flat().filter((c) => c.state === 'revealed').length
}

function reducer(state: GameState, action: GameAction): GameState {
  const { difficulty } = state
  const { rows, cols, mines } = CONFIGS[difficulty]

  switch (action.type) {
    case 'TICK':
      if (state.status === 'playing') return { ...state, time: state.time + 1 }
      return state

    case 'RESET':
      return {
        grid: createGrid(CONFIGS[action.difficulty].rows, CONFIGS[action.difficulty].cols, CONFIGS[action.difficulty].mines),
        status: 'idle',
        flagCount: 0,
        revealCount: 0,
        difficulty: action.difficulty,
        time: 0,
      }

    case 'FLAG': {
      if (state.status === 'won' || state.status === 'lost') return state
      const cell = state.grid[action.r][action.c]
      if (cell.state === 'revealed') return state
      const newGrid = state.grid.map((row) => row.map((c) => ({ ...c })))
      const newState = cell.state === 'hidden' ? 'flagged' : 'hidden'
      newGrid[action.r][action.c].state = newState as CellState
      return {
        ...state,
        grid: newGrid,
        flagCount: state.flagCount + (newState === 'flagged' ? 1 : -1),
      }
    }

    case 'REVEAL': {
      if (state.status === 'won' || state.status === 'lost') return state
      const cell = state.grid[action.r][action.c]
      if (cell.state !== 'hidden') return state

      // First click: generate real grid around this cell
      let grid = state.grid
      if (state.status === 'idle') {
        grid = createGrid(rows, cols, mines, [action.r, action.c])
      }

      const targetCell = grid[action.r][action.c]
      if (targetCell.isMine) {
        // Explode
        const explodedGrid = grid.map((row, r) =>
          row.map((c, col) => ({
            ...c,
            state: (c.isMine
              ? r === action.r && col === action.c ? 'exploded' : 'revealed'
              : c.state === 'flagged' && !c.isMine ? 'revealed' : c.state) as CellState,
          }))
        )
        return { ...state, grid: explodedGrid, status: 'lost' }
      }

      const newGrid = revealCell(grid, action.r, action.c)
      const revealed = countRevealed(newGrid)
      const totalSafe = rows * cols - mines
      const won = revealed >= totalSafe
      return {
        ...state,
        grid: newGrid,
        status: won ? 'won' : 'playing',
        revealCount: revealed,
      }
    }

    default:
      return state
  }
}

const NUM_COLORS: Record<number, string> = {
  1: '#0000ff', 2: '#008000', 3: '#ff0000', 4: '#000080',
  5: '#800000', 6: '#008080', 7: '#000000', 8: '#808080',
}

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useReducer((_: Difficulty, d: Difficulty) => d, 'beginner' as Difficulty)

  const [state, dispatch] = useReducer(reducer, {
    grid: createGrid(9, 9, 10),
    status: 'idle',
    flagCount: 0,
    revealCount: 0,
    difficulty: 'beginner',
    time: 0,
  })

  useEffect(() => {
    if (state.status !== 'playing') return
    const t = setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => clearInterval(t)
  }, [state.status])

  const { rows, cols, mines } = CONFIGS[state.difficulty]
  const minesLeft = mines - state.flagCount

  const face = state.status === 'won' ? '😎' : state.status === 'lost' ? '😵' : '🙂'

  const handleRightClick = useCallback((e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault()
    dispatch({ type: 'FLAG', r, c })
  }, [])

  const handleChangeDifficulty = useCallback((d: Difficulty) => {
    dispatch({ type: 'RESET', difficulty: d })
  }, [])

  return (
    <div className="flex flex-col items-center p-2 gap-2 overflow-auto" style={{ background: '#c0c0c0', height: '100%' }}>
      {/* Difficulty selector */}
      <div className="flex gap-1">
        {(['beginner', 'intermediate', 'expert'] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => handleChangeDifficulty(d)}
            aria-label={`Difficulty: ${d}`}
            aria-pressed={state.difficulty === d}
            className={`px-2 py-0.5 ${state.difficulty === d ? 'win95-sunken' : 'win95-raised'}`}
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', background: '#c0c0c0', cursor: 'default' }}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="win95-sunken flex items-center justify-between px-3 py-1 w-full" style={{ background: '#c0c0c0' }}>
        <div
          className="win95-inset px-2"
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '16px', color: '#ff0000', background: '#000', minWidth: '40px', textAlign: 'center' }}
        >
          {String(Math.max(0, minesLeft)).padStart(3, '0')}
        </div>
        <button
          onClick={() => dispatch({ type: 'RESET', difficulty: state.difficulty })}
          aria-label="Reset game"
          className="win95-raised"
          style={{ fontSize: '20px', padding: '2px 6px', cursor: 'default', background: '#c0c0c0' }}
        >
          {face}
        </button>
        <div
          className="win95-inset px-2"
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '16px', color: '#ff0000', background: '#000', minWidth: '40px', textAlign: 'center' }}
        >
          {String(Math.min(999, state.time)).padStart(3, '0')}
        </div>
      </div>

      {/* Win/Lose message */}
      {state.status === 'won' && (
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: '#000080' }}>
          🎉 You Win! Happy Birthday! 🎂
        </div>
      )}
      {state.status === 'lost' && (
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: '#ff0000' }}>
          💥 Game Over! Try again?
        </div>
      )}

      {/* Grid */}
      <div
        className="win95-sunken"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 20px)`,
          gap: 0,
          background: '#c0c0c0',
          maxWidth: '100%',
          overflow: 'auto',
        }}
      >
        {state.grid.map((row, r) =>
          row.map((cell, c) => {
            const isRevealed = cell.state === 'revealed' || cell.state === 'exploded'
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => dispatch({ type: 'REVEAL', r, c })}
                onContextMenu={(e) => handleRightClick(e, r, c)}
                aria-label={`Cell ${r},${c}`}
                className={isRevealed ? 'win95-sunken' : 'win95-raised'}
                style={{
                  width: '20px',
                  height: '20px',
                  background: cell.state === 'exploded' ? '#ff0000' : '#c0c0c0',
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: '9px',
                  color: isRevealed && !cell.isMine ? NUM_COLORS[cell.adjacentMines] || '#000' : '#000',
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  border: 'none',
                  outline: 'none',
                  flexShrink: 0,
                }}
              >
                {cell.state === 'flagged' ? '🚩'
                  : cell.state === 'exploded' ? '💥'
                  : isRevealed && cell.isMine ? '💣'
                  : isRevealed && cell.adjacentMines > 0 ? cell.adjacentMines
                  : ''}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
