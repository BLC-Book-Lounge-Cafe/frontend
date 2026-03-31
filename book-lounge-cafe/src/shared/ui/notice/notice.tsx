import React from "react"
import type { DOMProps } from "@react-types/shared"
import { filterDOMProps } from "@react-aria/utils"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type NoticeTone = "neutral" | "accent" | "positive" | "warning" | "negative"
type NoticeVariant = "tinted" | "tintedPointer" | "plain"

export type NoticeProps = (
  DOMProps
  & UnsafeStyles & {
    role?: "alert" | "presentation"
    tone?: NoticeTone
    variant?: NoticeVariant
    children: React.ReactNode
  }
)

const NoticeContext = React.createContext<
  ContextValue<Partial<NoticeProps>, HTMLDivElement>
>(null)

function Notice(props: NoticeProps, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, NoticeContext)

  const {
    role = "presentation",
    tone = "accent",
    variant = "tinted",
  } = props

  return (
    <div
      {...filterDOMProps(props)}
      ref={ref}
      role={role}
      style={props.UNSAFE_style}
      className={classes(
        "!text-current",
        classes.match(tone, {
          neutral: "text-secondary",
          negative: "text-negative",
          positive: "text-positive",
          accent: "text-accent",
          warning: "text-warning",
        }),

        variant === "tinted" && [
          "px-3 py-1.5 rounded-1",
          classes.match(tone, {
            neutral: "bg-black/5 dark:bg-white/5",
            negative: "bg-negative/10",
            positive: "bg-positive/10",
            accent: "bg-accent/10",
            warning: "bg-warning/10",
          }),
        ],

        variant === "tintedPointer" && [
          "flex items-center gap-5 p-1 rounded-r-1 border-l-4 text-current",
          classes.match(tone, {
            neutral: "bg-black/5 dark:bg-white/5 border-black dark:border-white",
            negative: "bg-negative/10 border-negative",
            positive: "bg-positive/10 border-positive",
            accent: "bg-accent/10 border-accent",
            warning: "bg-warning/10 border-warning",
          }),
        ],


        props.UNSAFE_className,
      )}
    >
      {props.children}
    </div>
  )
}

const _Notice = Object.assign(
  React.forwardRef(Notice), ({
    Context: NoticeContext,
  }),
)

export { _Notice as Notice }
