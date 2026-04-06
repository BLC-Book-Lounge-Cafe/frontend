import React from "react"
import type { ButtonProps, ContextValue, ButtonRenderProps } from "react-aria-components"
import { Button, ButtonContext, composeRenderProps, useContextProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export const AppButtonSlot = Object.freeze({
  dismiss: "dismiss",
  close: "close",
})

export type AppButtonSlot = keyof typeof AppButtonSlot | (string & {}) | null

export type AppButtonTone = "accent" | "positive" | "warning" | "negative"
export type AppButtonVariant = "filled" | "tinted" | "plain"
export type AppButtonSize = "lg" | "md" | "sm"

export type AppButtonProps = (
  Omit<ButtonProps, "style" | "className" | "slot">
  & UnsafeStyles<ButtonRenderProps> & {
    UNSAFE_text_className?: string
    children?: React.ReactNode
    tone?: AppButtonTone
    variant?: AppButtonVariant
    rounded?: boolean | "full"
    size?: AppButtonSize
    fullWidth?: boolean
    uppercase?: boolean
    slot?: AppButtonSlot
  }
)

const AppButtonContext = ButtonContext as React.Context<ContextValue<Partial<AppButtonProps>, HTMLButtonElement>>

function AppButton(props: AppButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  [props, ref] = useContextProps(props, ref, AppButtonContext)

  const {
    variant = "filled",
    tone = "accent",
    size = "lg",
    fullWidth,
    rounded = false,
    uppercase,
  } = props

  return (
    <Button
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      className={composeRenderProps(props.UNSAFE_className, (UNSAFE_className, state) => classes(
        "relative inline-flex items-center justify-center leading-none border border-transparent outline-none",

        fullWidth && "w-full",
        uppercase && "uppercase",

        classes.match(`${rounded}`, {
          true: "rounded-1",
          full: "rounded-full",
        }),

        classes.match(size, {
          lg: "min-w-11 min-h-11",
          md: "min-w-10 min-h-10",
          sm: "min-w-9 min-h-9",
        }),

        state.isFocusVisible && [
          "ring",
          classes.match(tone, {
            accent: "ring-accent/50",
            positive: "ring-positive/50",
            warning: "ring-warning/50",
            negative: "ring-negative/50",
          }),
        ],

        state.isDisabled ? [
          "text-tertiary [&_*]:!text-tertiary bg-black/5 dark:bg-white/5 cursor-not-allowed",
        ] : [
          variant === "filled" && [
            "text-white",
            [
              "[--opacity:1]",
              (state.isHovered || state.isPressed) && "[--opacity:0.9]",
              (state.isPressed && state.isHovered) && "[--opacity:0.8]",
            ],
            classes.match(tone, {
              accent: "bg-accent/[--opacity]",
              positive: "bg-positive/[--opacity]",
              warning: "bg-warning/[--opacity]",
              negative: "bg-negative/[--opacity]",
            }),
          ],

          variant === "tinted" && [
            [
              "[--opacity:0.1]",
              (state.isHovered || state.isPressed) && "[--opacity:0.2]",
              (state.isPressed && state.isHovered) && "[--opacity:0.3]",
            ],
            classes.match(tone, {
              accent: "text-accent bg-accent/[--opacity]",
              positive: "text-positive bg-positive/[--opacity]",
              warning: "text-warning bg-warning/[--opacity]",
              negative: "text-negative bg-negative/[--opacity]",
            }),
          ],

          variant === "plain" && [
            [
              "[--opacity:0]",
              (state.isHovered || state.isPressed) && "[--opacity:0.1]",
              (state.isPressed && state.isHovered) && "[--opacity:0.2]",
            ],
            classes.match(tone, {
              accent: "text-accent bg-accent/[--opacity]",
              positive: "text-positive bg-positive/[--opacity]",
              warning: "text-warning bg-warning/[--opacity]",
              negative: "text-negative bg-negative/[--opacity]",
            }),
          ],
        ],

        UNSAFE_className,
      ))}
    >
      {composeRenderProps(props.children, (children) => (
        <>
          {typeof children !== "string" ? (
            children
          ) : (
            <span className={classes(
              "block leading-tight",
              classes.match(size, {
                sm: "px-4",
                md: "px-6",
                lg: "px-8",
              }),
              props.UNSAFE_text_className,
            )}>
              {children}
            </span>
          )}
        </>
      ))}
    </Button>
  )
}

const _AppButton = Object.assign(
  React.forwardRef(AppButton), ({
    Context: AppButtonContext,
  }),
)

export { _AppButton as AppButton }
