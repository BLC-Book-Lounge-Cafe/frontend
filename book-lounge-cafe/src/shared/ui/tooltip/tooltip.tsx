import React from "react"
import { Tooltip, TooltipTrigger, type TooltipProps } from "react-aria-components"
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"

export type AppTooltipProps = {
  children: React.ReactElement
  content: React.ReactNode
  delay?: number
} & Omit<TooltipProps, "children" | "className" | "style"> &
  UnsafeStyles

function AppTooltip(props: AppTooltipProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const { children, content, delay = 700, UNSAFE_className, UNSAFE_style, ...rest } = props

  return (
    <TooltipTrigger delay={delay}>
      {children}
      <Tooltip
        {...rest}
        ref={ref}
        style={UNSAFE_style}
        className={
          UNSAFE_className ??
          "bg-surface-tertiary text-white px-3 py-2 rounded-1 text-caption shadow-lg z-50"
        }
      >
        {content}
      </Tooltip>
    </TooltipTrigger>
  )
}

const _AppTooltip = React.forwardRef(AppTooltip)

export { _AppTooltip as AppTooltip }
