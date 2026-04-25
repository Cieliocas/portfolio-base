"use client"

import { useMemo } from 'react'

type GpuVariant = 'h100' | 'h200' | 'l4'

type GpuCardProps = {
  variant: GpuVariant
  className?: string
}

const variantMeta: Record<GpuVariant, { label: string; form: string; die: string; accent: string }> = {
  h100: { label: 'H100', form: 'SXM5', die: 'Hopper · GH100', accent: 'var(--compute-green)' },
  h200: { label: 'H200', form: 'SXM5', die: 'Hopper · GH200', accent: 'var(--cyber-cyan)' },
  l4: { label: 'L4', form: 'PCIe', die: 'Ada · AD104', accent: 'var(--cyber-pink)' },
}

function buildSmGrid(cols: number, rows: number, startX: number, startY: number, cellW: number, cellH: number, gap: number) {
  const cells: React.ReactElement[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (cellW + gap)
      const y = startY + r * (cellH + gap)
      const idx = r * cols + c
      cells.push(
        <rect
          key={`sm-${r}-${c}`}
          x={x}
          y={y}
          width={cellW}
          height={cellH}
          rx={0.8}
          className="gpu-card-sm"
          style={{ animationDelay: `${(idx * 0.06) % 2.4}s` }}
        />,
      )
    }
  }
  return cells
}

function H100Svg() {
  const sms = useMemo(() => buildSmGrid(6, 8, 68, 68, 6.5, 5.5, 1.2), [])
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className="gpu-card-svg">
      <rect x="4" y="4" width="172" height="212" rx="12" className="gpu-card-pcb" />
      <rect x="12" y="12" width="156" height="196" rx="9" className="gpu-card-plate" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`hs-${i}`}
          x1="20"
          y1={18 + i * 3}
          x2="160"
          y2={18 + i * 3}
          className="gpu-card-heatsink"
        />
      ))}
      <rect x="54" y="56" width="72" height="96" rx="4" className="gpu-card-die" />
      <text x="90" y="63" textAnchor="middle" className="gpu-card-die-tag">GH100</text>
      {sms}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`hbm-l-${i}`}
          x="36"
          y={62 + i * 22}
          width="14"
          height="18"
          rx="2"
          className="gpu-card-hbm"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`hbm-r-${i}`}
          x="130"
          y={62 + i * 22}
          width="14"
          height="18"
          rx="2"
          className="gpu-card-hbm"
        />
      ))}
      {[32, 58, 84, 110, 136].map((x) => (
        <rect key={`nv-${x}`} x={x} y="162" width="18" height="3" rx="1" className="gpu-card-nvlink" />
      ))}
      {[32, 58, 84, 110, 136].map((x) => (
        <rect key={`nv2-${x}`} x={x} y="168" width="18" height="3" rx="1" className="gpu-card-nvlink" />
      ))}
      <text x="90" y="188" textAnchor="middle" className="gpu-card-brand">NVIDIA</text>
      <text x="90" y="200" textAnchor="middle" className="gpu-card-model">H100 · SXM5</text>
    </svg>
  )
}

function H200Svg() {
  const sms = useMemo(() => buildSmGrid(6, 8, 68, 68, 6.5, 5.5, 1.2), [])
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className="gpu-card-svg">
      <rect x="4" y="4" width="172" height="212" rx="12" className="gpu-card-pcb" />
      <rect x="12" y="12" width="156" height="196" rx="9" className="gpu-card-plate" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`hs-${i}`}
          x1="20"
          y1={18 + i * 3}
          x2="160"
          y2={18 + i * 3}
          className="gpu-card-heatsink"
        />
      ))}
      <rect x="54" y="56" width="72" height="96" rx="4" className="gpu-card-die" />
      <text x="90" y="63" textAnchor="middle" className="gpu-card-die-tag">GH200</text>
      {sms}
      {[0, 1, 2, 3].map((i) => (
        <g key={`hbm-l-${i}`}>
          <rect x="36" y={62 + i * 22} width="14" height="18" rx="2" className="gpu-card-hbm gpu-card-hbm3e" />
          <line x1="38" y1={66 + i * 22} x2="48" y2={66 + i * 22} className="gpu-card-hbm-line" />
          <line x1="38" y1={70 + i * 22} x2="48" y2={70 + i * 22} className="gpu-card-hbm-line" />
          <line x1="38" y1={74 + i * 22} x2="48" y2={74 + i * 22} className="gpu-card-hbm-line" />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={`hbm-r-${i}`}>
          <rect x="130" y={62 + i * 22} width="14" height="18" rx="2" className="gpu-card-hbm gpu-card-hbm3e" />
          <line x1="132" y1={66 + i * 22} x2="142" y2={66 + i * 22} className="gpu-card-hbm-line" />
          <line x1="132" y1={70 + i * 22} x2="142" y2={70 + i * 22} className="gpu-card-hbm-line" />
          <line x1="132" y1={74 + i * 22} x2="142" y2={74 + i * 22} className="gpu-card-hbm-line" />
        </g>
      ))}
      {[32, 58, 84, 110, 136].map((x) => (
        <rect key={`nv-${x}`} x={x} y="162" width="18" height="3" rx="1" className="gpu-card-nvlink" />
      ))}
      {[32, 58, 84, 110, 136].map((x) => (
        <rect key={`nv2-${x}`} x={x} y="168" width="18" height="3" rx="1" className="gpu-card-nvlink" />
      ))}
      <text x="90" y="188" textAnchor="middle" className="gpu-card-brand">NVIDIA</text>
      <text x="90" y="200" textAnchor="middle" className="gpu-card-model">H200 · HBM3e</text>
    </svg>
  )
}

function L4Svg() {
  const sms = useMemo(() => buildSmGrid(8, 4, 72, 78, 5, 4, 1), [])
  return (
    <svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg" className="gpu-card-svg gpu-card-svg-wide">
      <rect x="4" y="20" width="212" height="120" rx="6" className="gpu-card-pcb" />
      <rect x="12" y="28" width="196" height="104" rx="5" className="gpu-card-plate" />
      {Array.from({ length: 18 }).map((_, i) => (
        <rect
          key={`fin-${i}`}
          x={18 + i * 10}
          y="34"
          width="6"
          height="32"
          rx="1"
          className="gpu-card-heatsink-fin"
        />
      ))}
      <rect x="68" y="74" width="84" height="42" rx="3" className="gpu-card-die" />
      <text x="110" y="80" textAnchor="middle" className="gpu-card-die-tag">AD104</text>
      {sms}
      <rect x="20" y="118" width="16" height="14" rx="2" className="gpu-card-hbm" />
      <rect x="38" y="118" width="16" height="14" rx="2" className="gpu-card-hbm" />
      <rect x="166" y="118" width="16" height="14" rx="2" className="gpu-card-hbm" />
      <rect x="184" y="118" width="16" height="14" rx="2" className="gpu-card-hbm" />
      <rect x="30" y="140" width="160" height="18" rx="2" className="gpu-card-pcie" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect
          key={`pin-${i}`}
          x={34 + i * 8}
          y="146"
          width="4"
          height="10"
          rx="0.5"
          className="gpu-card-pcie-pin"
        />
      ))}
      <rect x="10" y="6" width="40" height="10" rx="2" className="gpu-card-bracket" />
      <rect x="170" y="6" width="40" height="10" rx="2" className="gpu-card-bracket" />
      <text x="110" y="168" textAnchor="middle" className="gpu-card-brand">NVIDIA</text>
      <text x="110" y="176" textAnchor="middle" className="gpu-card-model">L4 · PCIe Gen4</text>
    </svg>
  )
}

export function GpuCard({ variant, className }: GpuCardProps) {
  const meta = variantMeta[variant]

  return (
    <div className={`gpu-card gpu-card-${variant}${className ? ` ${className}` : ''}`}>
      <div className="gpu-card-head">
        <span className="gpu-card-led" style={{ ['--led' as string]: meta.accent }} />
        <span className="gpu-card-name">NVIDIA {meta.label}</span>
        <span className="gpu-card-form">{meta.form}</span>
      </div>
      <div className="gpu-card-viz">
        {variant === 'h100' ? <H100Svg /> : variant === 'h200' ? <H200Svg /> : <L4Svg />}
      </div>
      <div className="gpu-card-footer">
        <span className="gpu-card-die-line">{meta.die}</span>
      </div>
    </div>
  )
}

export function GpuCardRow() {
  return (
    <div className="gpu-card-row">
      <GpuCard variant="l4" />
      <GpuCard variant="h100" />
      <GpuCard variant="h200" />
    </div>
  )
}
