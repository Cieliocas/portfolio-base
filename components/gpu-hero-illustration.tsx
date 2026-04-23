"use client"

type FanProps = {
  cx: number
  cy: number
  speed: number
  blades?: number
}

function Fan({ cx, cy, speed, blades = 9 }: FanProps) {
  const rx = 30
  const ry = 19
  const bladeOuter = 0.88 // keep blade tips inside the frame
  const bladeAngles = Array.from({ length: blades }, (_, i) => (i / blades) * 360)
  const clipId = `fanClip-${cx}-${cy}`

  return (
    <g className="gpu-fan">
      <defs>
        <clipPath id={clipId}>
          <ellipse cx={cx} cy={cy} rx={rx - 1.5} ry={ry - 1.5} />
        </clipPath>
      </defs>

      {/* Fan recess (deep shadow) */}
      <ellipse cx={cx} cy={cy} rx={rx + 4} ry={ry + 3} className="gpu-fan-well" />

      {/* Pulsing glow backdrop */}
      <ellipse cx={cx} cy={cy} rx={rx + 2} ry={ry + 1} className="gpu-fan-glow" />

      {/* Clipped interior: blades + hub */}
      <g clipPath={`url(#${clipId})`}>
        {/* Spinning blades group — SMIL rotation */}
        <g className="gpu-fan-blades">
          {bladeAngles.map((a, i) => {
            const r = (a * Math.PI) / 180
            const rCurve = ((a - 32) * Math.PI) / 180
            const rInner = ((a - 10) * Math.PI) / 180
            const tipX = cx + rx * bladeOuter * Math.cos(r)
            const tipY = cy + ry * bladeOuter * Math.sin(r)
            const cpX = cx + rx * 0.58 * Math.cos(rCurve)
            const cpY = cy + ry * 0.58 * Math.sin(rCurve)
            const innerX = cx + rx * 0.18 * Math.cos(rInner)
            const innerY = cy + ry * 0.18 * Math.sin(rInner)
            return (
              <path
                key={`blade-${i}`}
                d={`M ${innerX} ${innerY} Q ${cpX} ${cpY} ${tipX} ${tipY} L ${cx} ${cy} Z`}
                className="gpu-fan-blade"
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
      </g>

      {/* Fan frame ring (on top of blades) */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} className="gpu-fan-frame" />

      {/* Outer rim struts (fixed, on top) */}
      {[22, 112].map((a) => {
        const r = (a * Math.PI) / 180
        return (
          <line
            key={`strut-${a}`}
            x1={cx + rx * Math.cos(r)}
            y1={cy + ry * Math.sin(r)}
            x2={cx - rx * Math.cos(r)}
            y2={cy - ry * Math.sin(r)}
            className="gpu-fan-strut"
          />
        )
      })}

      {/* Fan hub */}
      <ellipse cx={cx} cy={cy} rx={6} ry={4.2} className="gpu-fan-hub" />
      <ellipse cx={cx} cy={cy} rx={3} ry={2} className="gpu-fan-hub-inner" />
      {/* Blinking center LED */}
      <circle cx={cx} cy={cy} r={1.2} className="gpu-fan-led" />
    </g>
  )
}

export function GpuHeroIllustration() {
  // Fan centers along the top parallelogram
  const fans = [
    { cx: 142, cy: 146, speed: 1.4 },
    { cx: 222, cy: 146, speed: 1.1 },
    { cx: 302, cy: 146, speed: 1.6 },
  ]

  // PCIe gold fingers: 24 contacts
  const pcieContacts = Array.from({ length: 24 }, (_, i) => 158 + i * 7.5)

  // Bracket port cutouts
  const ports = [
    { y: 187, h: 6, label: 'DP' },
    { y: 197, h: 6, label: 'DP' },
    { y: 207, h: 6, label: 'DP' },
    { y: 218, h: 12, label: 'HDMI' },
  ]

  return (
    <div className="gpu-hero-wrap">
      <svg
        viewBox="0 0 500 340"
        xmlns="http://www.w3.org/2000/svg"
        className="gpu-hero-svg"
        role="img"
        aria-label="NVIDIA GPU card isometric illustration with spinning fans"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Ambient halo behind the card */}
          <radialGradient id="gpuAmbient" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.28)" />
            <stop offset="55%" stopColor="rgba(34, 211, 238, 0.05)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </radialGradient>

          {/* Shroud — top face of the card */}
          <linearGradient id="gpuShroud" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2541a8" />
            <stop offset="55%" stopColor="#1b2f7d" />
            <stop offset="100%" stopColor="#0d1949" />
          </linearGradient>

          {/* Side face (darker) */}
          <linearGradient id="gpuSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1b2f7d" />
            <stop offset="100%" stopColor="#080f30" />
          </linearGradient>

          {/* Front strip */}
          <linearGradient id="gpuFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#162557" />
            <stop offset="100%" stopColor="#070d28" />
          </linearGradient>

          {/* PCIe bracket */}
          <linearGradient id="gpuBracket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8893a8" />
            <stop offset="100%" stopColor="#323c55" />
          </linearGradient>

          {/* Fan glow */}
          <radialGradient id="gpuFanGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.9)" />
            <stop offset="55%" stopColor="rgba(34, 211, 238, 0.25)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </radialGradient>

          {/* Fan blades */}
          <linearGradient id="gpuFanBlade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(222, 236, 255, 0.92)" />
            <stop offset="100%" stopColor="rgba(120, 160, 220, 0.7)" />
          </linearGradient>

          {/* Gold PCIe finger */}
          <linearGradient id="gpuGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* ─── Ambient glow behind card ─── */}
        <ellipse cx="260" cy="210" rx="250" ry="100" fill="url(#gpuAmbient)">
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="4s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* ─── Back spine (top-back ridge) ─── */}
        <polygon
          points="172,102 436,102 436,112 172,112"
          fill="#0a1332"
          stroke="rgba(34, 211, 238, 0.22)"
          strokeWidth="0.6"
        />

        {/* ─── Top face / Shroud parallelogram ─── */}
        <polygon
          points="82,172 354,172 436,112 172,112"
          fill="url(#gpuShroud)"
          stroke="rgba(140, 180, 255, 0.55)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Shroud ribbed panels between fans */}
        {[103, 183, 263, 343].map((x, i) => (
          <line
            key={`rib-${i}`}
            x1={x}
            y1={172}
            x2={x + 55}
            y2={112}
            className="gpu-shroud-rib"
          />
        ))}

        {/* Shroud brand — placed on back spine above fans */}
        <text x="290" y="108" textAnchor="middle" className="gpu-shroud-brand">
          GeForce
        </text>

        {/* ─── Right side face ─── */}
        <polygon
          points="354,172 436,112 436,152 354,212"
          fill="url(#gpuSide)"
          stroke="rgba(34, 211, 238, 0.32)"
          strokeWidth="0.7"
        />

        {/* ─── Front face (thin strip showing depth) ─── */}
        <polygon
          points="82,172 354,172 354,212 82,212"
          fill="url(#gpuFront)"
          stroke="rgba(34, 211, 238, 0.3)"
          strokeWidth="0.7"
        />

        {/* LED strip along the front edge */}
        <rect x="88" y="187" width="260" height="2.2" className="gpu-led-strip" />
        {[100, 135, 170, 205, 240, 275, 310, 340].map((x, i) => (
          <circle
            key={`led-${i}`}
            cx={x}
            cy="188.1"
            r="1.4"
            className="gpu-led-dot"
            style={{ animationDelay: `${(i * 0.18).toFixed(2)}s` }}
          />
        ))}

        {/* ─── Fans (3x) ─── */}
        {fans.map((f, i) => (
          <Fan key={`fan-${i}`} cx={f.cx} cy={f.cy} speed={f.speed} />
        ))}

        {/* ─── PCIe bracket (left) ─── */}
        <polygon
          points="46,170 82,170 82,260 46,260"
          fill="url(#gpuBracket)"
          stroke="rgba(34, 211, 238, 0.22)"
          strokeWidth="0.6"
        />
        {ports.map((p, i) => (
          <g key={`port-${i}`}>
            <rect
              x={54}
              y={p.y}
              width={22}
              height={p.h}
              rx={1.4}
              className="gpu-bracket-port"
            />
          </g>
        ))}
        {/* Bracket screw holes */}
        <circle cx="64" cy="175" r="1.8" className="gpu-bracket-screw" />
        <circle cx="64" cy="255" r="1.8" className="gpu-bracket-screw" />

        {/* ─── PCIe gold connector (bottom) ─── */}
        <g className="gpu-pcie-group">
          <rect x="152" y="225" width="184" height="14" className="gpu-pcie-base" />
          <rect x="152" y="225" width="184" height="14" fill="url(#gpuGold)" />
          {pcieContacts.map((x, i) => (
            <rect
              key={`pcie-${i}`}
              x={x}
              y={228}
              width={4.5}
              height={9}
              className="gpu-pcie-pin"
              style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}
            />
          ))}
          {/* PCIe notch */}
          <rect x="236" y="225" width="6" height="5" className="gpu-pcie-notch" />
        </g>

        {/* ─── Text labels below ─── */}
        <text x="258" y="286" textAnchor="middle" className="gpu-hero-brand">
          NVIDIA
        </text>
        <text x="258" y="302" textAnchor="middle" className="gpu-hero-spec">
          RTX · 24GB GDDR6X · PCIe 5.0 · CUDA 12.4
        </text>

        {/* Power indicator LED below card */}
        <g transform="translate(430, 240)">
          <circle r="3" className="gpu-status-led" />
          <text x="8" y="3" className="gpu-status-label">PWR</text>
        </g>
      </svg>
    </div>
  )
}
