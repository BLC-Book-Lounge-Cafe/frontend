import React from "react"
import type { ProgressBarProps, ContextValue } from "react-aria-components"
import { ProgressBar, ProgressBarContext, useContextProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type AppProgressBarSize = "sm" | "md" | "lg"
export type AppProgressBarTone = "accent" | "positive" | "warning" | "negative"
export type AppProgressBarProps = (
  Omit<ProgressBarProps, "children" | "className" | "style">
  & UnsafeStyles & {
    tone?: AppProgressBarTone
    size?: AppProgressBarSize
  }
)

const AppProgressBarContext = ProgressBarContext as React.Context<ContextValue<Partial<AppProgressBarProps>, HTMLDivElement>>

function AppProgressBar(props: AppProgressBarProps, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, AppProgressBarContext)

  const {
    tone = "accent",
    size = "sm",
    ...otherProps
  } = props

  return (
    <ProgressBar
      {...otherProps}
      ref={ref}
      style={props.UNSAFE_style}
    >
      {(state) => (
        <div className={classes(
          "rounded-full overflow-hidden",
          classes.match(tone, {
            accent: "bg-accent/20 *:bg-accent",
            negative: "bg-negative/20 *:bg-negative",
            positive: "bg-positive/20 *:bg-positive",
            warning: "bg-warning/20 *:bg-warning",
          }),
          classes.match(size, {
            sm: "h-1.5",
            md: "h-3",
            lg: "h-5",
          }),
          props.UNSAFE_className,
        )}>
          <div
            style={{ width: state.isIndeterminate ? undefined : state.percentage + "%" }}
            className={classes(
              "relative h-full rounded-full origin-left will-change-transform",
              state.isIndeterminate && "animate-progress-bar",
            )}
          />
        </div>
      )}
    </ProgressBar>
  )
}

const _AppProgressBar = Object.assign(
  React.forwardRef(AppProgressBar), ({
    Context: AppProgressBarContext,
  }),
)

export { _AppProgressBar as AppProgressBar }
