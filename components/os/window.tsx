import type { ReactNode } from 'react'

type WindowProps = {
  title: string
  titleIcon?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  rightSlot?: ReactNode
}

export function Window({
  title,
  titleIcon,
  children,
  className = '',
  bodyClassName = '',
  rightSlot,
}: WindowProps) {
  return (
    <div className={`os-window ${className}`}>
      <div className="os-window-bar">
        {/* Traffic lights */}
        <div className="tl-cluster">
          <span className="tl tl-r" />
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
