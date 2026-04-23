"use client"

import { useMemo } from 'react'

type NodeKind = 'cyan' | 'violet' | 'green'

type MeshNode = {
  id: string
  x: number
  y: number
  kind: NodeKind
  pulse: boolean
  delay: number
}

type MeshEdge = {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  flow: boolean
  delay: number
}

const VIEW_W = 1000
const VIEW_H = 1600
const COLS = 6
const ROWS = 9

function buildMesh() {
  const nodes: MeshNode[] = []
  const nodeById = new Map<string, MeshNode>()
  const colW = VIEW_W / COLS
  const rowH = VIEW_H / ROWS

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const id = `n-${r}-${c}`
      const jitterX = (((c * 7 + r * 3) % 5) - 2) * 9
      const jitterY = (((r * 5 + c * 2) % 5) - 2) * 7
      const x = colW * (c + 0.5) + jitterX
      const y = rowH * (r + 0.5) + jitterY
      const kindIdx = (r * 3 + c * 5) % 11
      const kind: NodeKind =
        kindIdx === 0 ? 'violet' : kindIdx === 1 || kindIdx === 7 ? 'green' : 'cyan'
      const pulse = ((r * 2 + c) % 4) === 0
      const delay = ((r * 13 + c * 7) % 40) / 10
      const node: MeshNode = { id, x, y, kind, pulse, delay }
      nodes.push(node)
      nodeById.set(id, node)
    }
  }

  const edges: MeshEdge[] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const current = nodeById.get(`n-${r}-${c}`)!
      if (c < COLS - 1) {
        const right = nodeById.get(`n-${r}-${c + 1}`)!
        const flow = ((r + c) % 5) === 0
        edges.push({
          id: `e-${r}-${c}-r`,
          x1: current.x,
          y1: current.y,
          x2: right.x,
          y2: right.y,
          flow,
          delay: ((r * 11 + c * 5) % 50) / 10,
        })
      }
      if (r < ROWS - 1) {
        const targetCol = r % 2 === 0 ? c : Math.min(c + 1, COLS - 1)
        const down = nodeById.get(`n-${r + 1}-${targetCol}`)!
        const flow = ((r * 2 + c * 3) % 7) === 0
        edges.push({
          id: `e-${r}-${c}-d`,
          x1: current.x,
          y1: current.y,
          x2: down.x,
          y2: down.y,
          flow,
          delay: ((r * 17 + c * 3) % 60) / 10,
        })
      }
    }
  }

  return { nodes, edges }
}

export function AIMeshBackground() {
  const { nodes, edges } = useMemo(() => buildMesh(), [])

  return (
    <div className="ai-mesh-bg" aria-hidden>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="mesh-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="mesh-edges">
          {edges.map((e) => (
            <line
              key={e.id}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              className={`mesh-edge${e.flow ? ' mesh-edge-flow' : ''}`}
              style={e.flow ? { animationDelay: `${e.delay}s` } : undefined}
            />
          ))}
        </g>

        <g className="mesh-nodes">
          {nodes.map((n) => (
            <g
              key={n.id}
              transform={`translate(${n.x} ${n.y})`}
              className={`mesh-node mesh-node-${n.kind}${n.pulse ? ' mesh-node-pulse' : ''}`}
              style={n.pulse ? { animationDelay: `${n.delay}s` } : undefined}
            >
              <circle className="mesh-node-halo" r="10" />
              <circle className="mesh-node-core" r="1.8" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
