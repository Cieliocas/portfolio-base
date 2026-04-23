"use client"

import { useMemo } from 'react'

function buildSMs(
  cols: number, rows: number,
  startX: number, startY: number,
  cellW: number, cellH: number,
  gap: number,
) {
  const cells: React.ReactElement[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (cellW + gap)
      const y = startY + r * (cellH + gap)
      const idx = r * cols + c
      const variant =
        idx % 7 === 0 ? ' gpu-hero-sm-tensor'
        : idx % 5 === 0 ? ' gpu-hero-sm-rt'
        : ''
      cells.push(
        <rect
          key={`hsm-${r}-${c}`}
          x={x} y={y}
          width={cellW} height={cellH}
          rx={2}
          className={`gpu-hero-sm${variant}`}
          style={{ animationDelay: `${((idx * 0.055) % 3.6).toFixed(2)}s` }}
        />,
      )
    }
  }
  return cells
}

export function GpuHeroIllustration() {
  // 10 cols × 6 rows of SMs inside die (die starts x=310,y=55 w=280 h=170)
  // cellW=22 cellH=13 gap=2 → totalW=239 totalH=89 → startX=310+(280-239)/2=330 startY=55+(170-89)/2=96
  const sms = useMemo(() => buildSMs(10, 6, 330, 96, 22, 13, 2), [])

  const hbmLeft  = [{ x: 42, y: 36 }, { x: 42, y: 122 }, { x: 108, y: 36 }, { x: 108, y: 122 }]
  const hbmRight = [{ x: 750, y: 36 }, { x: 750, y: 122 }, { x: 816, y: 36 }, { x: 816, y: 122 }]

  const traceY = [56, 76, 98, 136, 158, 178]
  const nvX    = Array.from({ length: 16 }, (_, i) => 196 + i * 33)
  const vTraceX = [360, 393, 426, 459, 492, 525, 558]

  return (
    <div className="gpu-hero-wrap">
      <svg
        viewBox="0 0 930 280"
        xmlns="http://www.w3.org/2000/svg"
        className="gpu-hero-svg"
        role="img"
        aria-label="NVIDIA H100 SXM5 GPU illustration"
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="45%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.2)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
          <radialGradient id="boardAmbient" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.04)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* ── PCB board ── */}
        <rect x="0" y="0" width="930" height="280" className="gpu-hero-pcb" />
        <rect x="0" y="0" width="930" height="280" fill="url(#boardAmbient)" />

        {/* Subtle PCB grid */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`vg${i}`} x1={i * 62} y1="0" x2={i * 62} y2="280" className="gpu-hero-grid" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`hg${i}`} x1="0" y1={i * 56} x2="930" y2={i * 56} className="gpu-hero-grid" />
        ))}

        {/* ── NVLink pads — top ── */}
        {nvX.map((x, i) => (
          <rect key={`nvt${i}`} x={x} y="5" width="20" height="8" rx="1.5"
            className="gpu-hero-nvlink"
            style={{ animationDelay: `${(i * 0.13).toFixed(2)}s` }}
          />
        ))}

        {/* ── NVLink pads — bottom ── */}
        {nvX.map((x, i) => (
          <rect key={`nvb${i}`} x={x} y="267" width="20" height="8" rx="1.5"
            className="gpu-hero-nvlink"
            style={{ animationDelay: `${(i * 0.13 + 1.0).toFixed(2)}s` }}
          />
        ))}

        {/* ── Vertical traces: die top → NVLink ── */}
        {vTraceX.map((x, i) => (
          <line key={`vt${i}`} x1={x} y1="16" x2={x} y2="55"
            className="gpu-hero-trace-v"
            style={{ animationDelay: `${(i * 0.09).toFixed(2)}s` }}
          />
        ))}

        {/* ── Vertical traces: die bottom → NVLink ── */}
        {vTraceX.map((x, i) => (
          <line key={`vb${i}`} x1={x} y1="225" x2={x} y2="264"
            className="gpu-hero-trace-v"
            style={{ animationDelay: `${(i * 0.09 + 0.7).toFixed(2)}s` }}
          />
        ))}

        {/* ── HBM stacks — left ── */}
        {hbmLeft.map(({ x, y }, i) => (
          <g key={`hbml${i}`}>
            <rect x={x} y={y} width={56} height={72} rx={4} className="gpu-hero-hbm" />
            {[0, 1, 2, 3].map(d => (
              <line key={d} x1={x + 7} y1={y + 13 + d * 13} x2={x + 49} y2={y + 13 + d * 13}
                className="gpu-hero-hbm-line" />
            ))}
            <text x={x + 28} y={y + 66} textAnchor="middle" className="gpu-hero-hbm-tag">HBM3e</text>
          </g>
        ))}

        {/* ── HBM stacks — right ── */}
        {hbmRight.map(({ x, y }, i) => (
          <g key={`hbmr${i}`}>
            <rect x={x} y={y} width={56} height={72} rx={4} className="gpu-hero-hbm" />
            {[0, 1, 2, 3].map(d => (
              <line key={d} x1={x + 7} y1={y + 13 + d * 13} x2={x + 49} y2={y + 13 + d * 13}
                className="gpu-hero-hbm-line" />
            ))}
            <text x={x + 28} y={y + 66} textAnchor="middle" className="gpu-hero-hbm-tag">HBM3e</text>
          </g>
        ))}

        {/* ── Traces: left HBM → die ── */}
        {traceY.map((y, i) => (
          <line key={`tl${i}`} x1="168" y1={y} x2="310" y2={y}
            className="gpu-hero-trace-h gpu-hero-trace-left"
            style={{ animationDelay: `${(i * 0.17).toFixed(2)}s` }}
          />
        ))}

        {/* ── Traces: die → right HBM ── */}
        {traceY.map((y, i) => (
          <line key={`tr${i}`} x1="620" y1={y} x2="750" y2={y}
            className="gpu-hero-trace-h gpu-hero-trace-right"
            style={{ animationDelay: `${(i * 0.17 + 0.45).toFixed(2)}s` }}
          />
        ))}

        {/* ── Diagonal corner traces ── */}
        <path d="M 168 36 L 168 56" className="gpu-hero-trace-v" style={{ animationDelay: '0.3s' }} />
        <path d="M 168 122 L 168 178" className="gpu-hero-trace-v" style={{ animationDelay: '0.6s' }} />
        <path d="M 762 36 L 762 56" className="gpu-hero-trace-v" style={{ animationDelay: '0.5s' }} />
        <path d="M 762 122 L 762 178" className="gpu-hero-trace-v" style={{ animationDelay: '0.8s' }} />

        {/* ── Die glow bloom ── */}
        <rect x="300" y="44" width="330" height="192" rx="12" fill="url(#heroGlow)" />

        {/* ── Die body ── */}
        <rect x="310" y="55" width="310" height="170" rx="8" className="gpu-hero-die" />

        {/* ── SM grid ── */}
        {sms}

        {/* ── Die corner accents ── */}
        {[[310,55],[596,55],[310,201],[596,201]].map(([cx,cy], i) => (
          <circle key={`ca${i}`} cx={cx} cy={cy} r="4" className="gpu-hero-die-corner" />
        ))}

        {/* ── Die label ── */}
        <text x="465" y="51" textAnchor="middle" className="gpu-hero-die-label">
          GH100 · NVIDIA H100 SXM5
        </text>

        {/* ── SXM power connector — right edge ── */}
        <rect x="910" y="76" width="14" height="128" rx="3" className="gpu-hero-connector" />
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={`sp${i}`} x="912" y={80 + i * 9.2} width="10" height="6" rx="0.8"
            className="gpu-hero-connector-pin" />
        ))}

        {/* ── Power delivery — left edge ── */}
        <rect x="6" y="76" width="14" height="128" rx="3" className="gpu-hero-connector" />
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={`pp${i}`} x="8" y={80 + i * 9.2} width="10" height="6" rx="0.8"
            className="gpu-hero-connector-pin" />
        ))}

        {/* ── Thermal vias (corner circles) ── */}
        {[[26,20],[904,20],[26,260],[904,260]].map(([cx,cy], i) => (
          <circle key={`via${i}`} cx={cx} cy={cy} r="6" className="gpu-hero-via" />
        ))}
        {[[26,20],[904,20],[26,260],[904,260]].map(([cx,cy], i) => (
          <circle key={`viac${i}`} cx={cx} cy={cy} r="3" className="gpu-hero-via-center" />
        ))}

        {/* ── NVIDIA branding ── */}
        <text x="465" y="245" textAnchor="middle" className="gpu-hero-brand">NVIDIA</text>
        <text x="465" y="259" textAnchor="middle" className="gpu-hero-spec">
          H100 · 80 GB HBM3e · 3.35 TB/s · NVLink 4.0 · 700W TDP
        </text>
      </svg>
    </div>
  )
}
