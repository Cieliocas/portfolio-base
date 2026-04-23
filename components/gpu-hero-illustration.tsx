"use client"

/**
 * GPU Hero Illustration — isometric 3-fan GPU card
 *
 * Architecture: everything on the shroud face is defined in LOCAL flat
 * coordinates (W×D rectangle), then projected to screen space via a
 * single SVG matrix transform. This ensures fans rotate correctly in the
 * isometric plane and their holes sit exactly on the card face.
 *
 * Local space:  (0,0) front-left  →  screen (82,172)
 *               (W,0) front-right →  screen (354,172)
 *               (0,D) back-left   →  screen (172,112)
 *
 * Depth vector (0,D)→screen: (90,-60), ||v||=108
 * c = 90/108 ≈ 0.8333   d = -60/108 ≈ -0.5556
 * → transform="matrix(1, 0, 0.8333, -0.5556, 82, 172)"
 */

type FanLocalProps = {
  cx: number
  cy: number
  r: number
  speed: number
}

function FanLocal({ cx, cy, r, speed }: FanLocalProps) {
  const bladeCount = 9

  return (
    <g>
      {/* Deep recess — dark hole behind the blades */}
      <circle cx={cx} cy={cy} r={r + 3} fill="#020710" />

      {/* Glow backdrop (pulsing) */}
      <circle cx={cx} cy={cy} r={r} fill="url(#gpuFanGlow)">
        <animate
          attributeName="opacity"
          values="0.28;0.65;0.28"
          dur={`${(speed * 2.1).toFixed(1)}s`}
          repeatCount="indefinite"
        />
      </circle>

      {/* ── Spinning blades ─────────────────────────────
          Tips end at (r-1) — always inside the ring (r).
          In local flat space → projected correctly by parent matrix.
          SMIL animateTransform rotates around LOCAL (cx,cy). */}
      <g>
        {Array.from({ length: bladeCount }).map((_, i) => {
          const a = (i / bladeCount) * Math.PI * 2
          const aCtrl = a - 0.5
          // toFixed(3) ensures identical output on SSR and client
          const tipX = (cx + (r - 1.5) * Math.cos(a)).toFixed(3)
          const tipY = (cy + (r - 1.5) * Math.sin(a)).toFixed(3)
          const cpX  = (cx + r * 0.56 * Math.cos(aCtrl)).toFixed(3)
          const cpY  = (cy + r * 0.56 * Math.sin(aCtrl)).toFixed(3)
          return (
            <path
              key={i}
              d={`M ${cx} ${cy} Q ${cpX} ${cpY} ${tipX} ${tipY} Z`}
              fill="rgba(188, 218, 255, 0.74)"
              stroke="rgba(230, 245, 255, 0.18)"
              strokeWidth="0.4"
            />
          )
        })}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur={`${speed}s`}
          repeatCount="indefinite"
        />
      </g>

      {/* Frame ring — rendered on top of blades */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(148, 192, 250, 0.75)"
        strokeWidth="1.8"
      />

      {/* Strut spokes (fixed) */}
      {[20, 110].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line
            key={i}
            x1={cx + r * Math.cos(rad)} y1={cy + r * Math.sin(rad)}
            x2={cx - r * Math.cos(rad)} y2={cy - r * Math.sin(rad)}
            stroke="rgba(90, 130, 200, 0.55)"
            strokeWidth="1"
          />
        )
      })}

      {/* Hub */}
      <circle cx={cx} cy={cy} r={5.5}
        fill="#0d182e" stroke="rgba(34, 211, 238, 0.9)" strokeWidth="1" />

      {/* Center LED */}
      <circle cx={cx} cy={cy} r={1.6} fill="rgba(34, 211, 238, 0.95)">
        <animate
          attributeName="opacity"
          values="0.45;1;0.45"
          dur={`${(speed * 1.4).toFixed(1)}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  )
}

export function GpuHeroIllustration() {
  // ── Local card dimensions ──────────────────────────────────────────
  const W = 272  // card length  (82→354 on front edge)
  const D = 108  // card depth   (172→112 in screen y)
  const FAN_R = 35 // fan radius — fans slightly gap at each side

  // Fan centres in local flat space
  const fanDefs: { cx: number; cy: number; speed: number }[] = [
    { cx: W * 0.25, cy: D * 0.5, speed: 1.45 },
    { cx: W * 0.5,  cy: D * 0.5, speed: 1.05 },
    { cx: W * 0.75, cy: D * 0.5, speed: 1.65 },
  ]

  return (
    <div className="gpu-hero-wrap">
      <svg
        viewBox="0 0 500 325"
        xmlns="http://www.w3.org/2000/svg"
        className="gpu-hero-svg"
        role="img"
        aria-label="NVIDIA GPU card isometric illustration with spinning fans"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Ambient halo */}
          <radialGradient id="gpuAmbient" cx="50%" cy="55%" r="55%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0.26)" />
            <stop offset="55%"  stopColor="rgba(34,211,238,0.05)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>

          {/* Shroud top face */}
          <linearGradient id="gpuShroud" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#304fcc" />
            <stop offset="50%"  stopColor="#1d3898" />
            <stop offset="100%" stopColor="#0e1f60" />
          </linearGradient>

          {/* Right side face */}
          <linearGradient id="gpuSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#1c328a" />
            <stop offset="100%" stopColor="#07102e" />
          </linearGradient>

          {/* Front edge face */}
          <linearGradient id="gpuFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#162268" />
            <stop offset="100%" stopColor="#060c28" />
          </linearGradient>

          {/* Bracket */}
          <linearGradient id="gpuBracket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#8a94ac" />
            <stop offset="100%" stopColor="#333e58" />
          </linearGradient>

          {/* PCIe gold */}
          <linearGradient id="gpuGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#fde88a" />
            <stop offset="50%"  stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92410e" />
          </linearGradient>

          {/* Fan glow */}
          <radialGradient id="gpuFanGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0.88)" />
            <stop offset="60%"  stopColor="rgba(34,211,238,0.22)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* ── Ambient glow backdrop ── */}
        <ellipse cx="260" cy="202" rx="238" ry="92" fill="url(#gpuAmbient)">
          <animate attributeName="opacity" values="0.65;1;0.65" dur="4s" repeatCount="indefinite" />
        </ellipse>

        {/* ── Back spine ridge ── */}
        <polygon
          points="172,100 436,100 436,112 172,112"
          fill="#080e2a"
          stroke="rgba(34,211,238,0.18)"
          strokeWidth="0.5"
        />

        {/* ═══════════════════════════════════════════════════════════
            SHROUD FACE + FANS — local flat coordinates
            Isometric matrix: new_x = x + 0.8333*y + 82
                              new_y = 0*x - 0.5556*y + 172
            ═══════════════════════════════════════════════════════════ */}
        <g transform="matrix(1, 0, 0.8333, -0.5556, 82, 172)">
          {/* Card face background */}
          <rect
            x={0} y={0} width={W} height={D}
            fill="url(#gpuShroud)"
            stroke="rgba(150,192,255,0.62)"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />

          {/* Separator ribs between fan bays */}
          {[W * 0.25 + FAN_R + 6, W * 0.5 + FAN_R + 6].map((x, i) => (
            <line
              key={i}
              x1={x} y1={3} x2={x} y2={D - 3}
              stroke="rgba(200,222,255,0.08)"
              strokeWidth="0.7"
            />
          ))}

          {/* Brand label on spine */}
          <text
            x={W / 2} y={8}
            textAnchor="middle"
            fontSize="7"
            letterSpacing="3"
            fill="rgba(215,232,255,0.42)"
            fontFamily="system-ui, sans-serif"
          >
            GEFORCE RTX
          </text>

          {/* ── 3 Fans in local flat space ── */}
          {fanDefs.map((f, i) => (
            <FanLocal key={i} cx={f.cx} cy={f.cy} r={FAN_R} speed={f.speed} />
          ))}
        </g>

        {/* ── Front edge (card thickness) ── */}
        <polygon
          points="82,172 354,172 354,212 82,212"
          fill="url(#gpuFront)"
          stroke="rgba(34,211,238,0.28)"
          strokeWidth="0.7"
        />

        {/* ── Right side face ── */}
        <polygon
          points="354,172 436,112 436,152 354,212"
          fill="url(#gpuSide)"
          stroke="rgba(34,211,238,0.28)"
          strokeWidth="0.7"
        />

        {/* ── LED strip along front edge ── */}
        <rect x="88" y="186" width="260" height="2" className="gpu-led-strip" />
        {[102, 138, 174, 210, 246, 282, 318, 348].map((x, i) => (
          <circle
            key={i} cx={x} cy="187" r="1.5"
            className="gpu-led-dot"
            style={{ animationDelay: `${(i * 0.18).toFixed(2)}s` }}
          />
        ))}

        {/* ── PCIe bracket (left) ── */}
        <polygon
          points="47,168 82,168 82,262 47,262"
          fill="url(#gpuBracket)"
          stroke="rgba(34,211,238,0.2)"
          strokeWidth="0.6"
        />
        {[
          { y: 185, h: 6  },
          { y: 195, h: 6  },
          { y: 205, h: 6  },
          { y: 216, h: 12 },
        ].map((p, i) => (
          <rect key={i} x={55} y={p.y} width={21} height={p.h} rx={1.5}
            className="gpu-bracket-port" />
        ))}
        <circle cx={64} cy={173} r={2} className="gpu-bracket-screw" />
        <circle cx={64} cy={257} r={2} className="gpu-bracket-screw" />

        {/* ── PCIe gold fingers ── */}
        <rect x={152} y={222} width={182} height={15} fill="url(#gpuGold)" rx={1} />
        {Array.from({ length: 24 }).map((_, i) => (
          <rect
            key={i}
            x={154 + i * 7.5} y={225}
            width={5.5} height={10}
            className="gpu-pcie-pin"
            style={{ animationDelay: `${(i * 0.045).toFixed(2)}s` }}
          />
        ))}
        {/* PCIe alignment notch */}
        <rect x={236} y={222} width={7} height={6} className="gpu-pcie-notch" />

        {/* ── Branding ── */}
        <text x="265" y="280" textAnchor="middle" className="gpu-hero-brand">NVIDIA</text>
        <text x="265" y="296" textAnchor="middle" className="gpu-hero-spec">
          RTX · 24 GB GDDR6X · PCIe 5.0 · CUDA 12.4
        </text>

        {/* ── Power LED ── */}
        <g transform="translate(436,232)">
          <circle r={2.8} className="gpu-status-led" />
          <text x="7" y="3" className="gpu-status-label">PWR</text>
        </g>
      </svg>
    </div>
  )
}
