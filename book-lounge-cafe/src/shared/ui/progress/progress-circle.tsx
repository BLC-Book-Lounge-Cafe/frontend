import React from "react"
import type { ProgressBarProps, ContextValue } from "react-aria-components"
import { ProgressBar, ProgressBarContext, useContextProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

const STROKE_WIDTH = 3
const radius = `calc(50% - ${STROKE_WIDTH / 2}px)`

type AppProgressSize = "sm" | "md" | "lg" | number

export type AppProgressCircleProps = (
  Omit<ProgressBarProps, "children" | "style" | "valueLabel" | "formatOptions" | "label" | "className">
  & UnsafeStyles & {
    tone?: "success" | "accent" | "negative"
    size?: AppProgressSize
  }
)

const AppProgressCircleContext = ProgressBarContext as React.Context<
  ContextValue<Partial<AppProgressCircleProps>, HTMLDivElement>
>

function AppProgressCircle(props: AppProgressCircleProps, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, AppProgressCircleContext)

  const { size = "md", tone = "accent" } = props

  return (
    <ProgressBar
      {...props}
      ref={ref}
      style={{
        ...(typeof size === "number" && {
          width: `${size * 0.25}rem`,
          height: `${size * 0.25}rem`,
        }),
        ...props.UNSAFE_style,
      }}
      className={classes(
        classes.match(size as Exclude<AppProgressSize, number>, {
          lg: "w-12 h-12",
          md: "w-9 h-9",
          sm: "w-6 h-6",
        }),
        props.UNSAFE_className,
      )}
    >
      {(state) => (
        <svg
          fill="none"
          width="100%"
          height="100%"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth={STROKE_WIDTH}
            className="stroke-accent/10 origin-center"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth={STROKE_WIDTH}
            pathLength="100"
            strokeDasharray="100 200"
            strokeDashoffset={(state.isIndeterminate || state.percentage == null) ? undefined : 100 - state.percentage}
            strokeLinecap="round"
            style={{ rotate: "-90deg" }}
            className={classes(
              "origin-center transition-all",
              classes.match(tone, {
                accent: "stroke-accent",
                negative: "stroke-negative",
                success: "stroke-positive",
              }),
              state.isIndeterminate && "animate-progress-circle",
            )}
          />
        </svg>
      )}
    </ProgressBar>
  )
}

const _AppProgressCircle = Object.assign(
  React.forwardRef(AppProgressCircle), ({
    Context: AppProgressCircleContext,
  }),
)

export { _AppProgressCircle as AppProgressCircle }
