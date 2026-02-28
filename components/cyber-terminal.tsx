"use client"

import { useEffect, useState } from "react"

interface TerminalLine {
  prompt?: string
  command?: string
  output?: string
}

interface CyberTerminalProps {
  lines: TerminalLine[]
}

export function CyberTerminal({ lines }: CyberTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: "cmd" | "out" }[]>([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<"cmd" | "out">("cmd")

  useEffect(() => {
    if (lineIndex >= lines.length) return
    const line = lines[lineIndex]

    if (phase === "cmd" && line.command) {
      const text = line.command
      if (charIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedLines((prev) => {
            const copy = [...prev]
            const idx = copy.length - 1
            if (idx >= 0 && copy[idx].type === "cmd") {
              copy[idx] = { text: (line.prompt || "$ ") + text.slice(0, charIndex + 1), type: "cmd" }
            }
            return copy
          })
          setCharIndex((c) => c + 1)
        }, 25)
        return () => clearTimeout(timer)
      } else {
        if (line.output) {
          const timer = setTimeout(() => {
            setPhase("out")
            setCharIndex(0)
          }, 150)
          return () => clearTimeout(timer)
        } else {
          const timer = setTimeout(() => {
            setLineIndex((l) => l + 1)
            setCharIndex(0)
            setPhase("cmd")
            setDisplayedLines((prev) => [...prev, { text: "", type: "cmd" }])
          }, 200)
          return () => clearTimeout(timer)
        }
      }
    }

    if (phase === "out" && line.output) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { text: line.output!, type: "out" }])
        setPhase("cmd")
        setCharIndex(0)
        setLineIndex((l) => l + 1)
        setDisplayedLines((prev) => [...prev, { text: "", type: "cmd" }])
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [lineIndex, charIndex, phase, lines])

  useEffect(() => {
    if (lines.length > 0) {
      setDisplayedLines([{ text: "", type: "cmd" }])
    }
  }, [lines])

  return (
    <div className="terminal-border bg-cyber-bg p-4 md:p-5">
      {/* Title bar */}
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-cyber-line">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-cyber-amber opacity-80" />
          <div className="w-2.5 h-2.5 bg-cyber-green opacity-80" />
          <div className="w-2.5 h-2.5 bg-cyber-cyan opacity-80" />
        </div>
        <span className="text-[10px] text-muted-foreground tracking-wider">
          francielio@arch:~
        </span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1 min-h-[120px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex items-start gap-0">
            {line.type === "cmd" ? (
              <span className="text-xs md:text-sm text-cyber-green leading-relaxed">
                {line.text}
                {i === displayedLines.length - 1 && lineIndex < lines.length && (
                  <span className="cursor-blink text-cyber-green ml-0.5">_</span>
                )}
              </span>
            ) : (
              <span className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-2">
                {line.text}
              </span>
            )}
          </div>
        ))}
        {lineIndex >= lines.length && (
          <div>
            <span className="text-xs md:text-sm text-cyber-green">$ </span>
            <span className="cursor-blink text-xs md:text-sm text-cyber-green">_</span>
          </div>
        )}
      </div>
    </div>
  )
}
