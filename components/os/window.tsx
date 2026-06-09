"use client"

import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type WindowProps = {
  title: string
  titleIcon?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  rightSlot?: ReactNode
  /** When provided, the red traffic light becomes a working close button
   *  (shows an X on hover, macOS-style). */
  onClose?: () => void
}

export function Window({
  title,
  titleIcon,
  children,
  className = '',
  bodyClassName = '',
  rightSlot,
  onClose,
}: WindowProps) {
  return (
    <div className={`os-window ${className}`}>
      <div className="os-window-bar">
        {/* Traffic lights */}
        <div className="tl-cluster">
          {onClose ? (
            <button className="tl tl-r tl-close" onClick={onClose} aria-label="Close" title="Close">
              <X className="tl-close-icon" strokeWidth={3} />
            </button>
          ) : (
            <span className="tl tl-r" />
          )}
          <span className="tl tl-y" />
          <span className="tl tl-g" />
        </div>

        {/* Title */}
        <div className="os-window-title flex items-center justify-center gap-1.5">
          {titleIcon && <span className="opacity-40">{titleIcon}</span>}
          <span>{title}</span>
        </div>

        {/* Right slot (optional actions / controls) */}
        <div className="flex-shrink-0 w-[54px] flex justify-end">
          {rightSlot}
        </div>
      </div>

      <div className={`os-window-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  )
}
