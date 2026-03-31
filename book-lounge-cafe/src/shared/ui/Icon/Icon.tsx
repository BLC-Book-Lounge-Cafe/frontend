import React from "react"
import type { DOMProps } from "@react-types/shared"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
// local
import { icons } from "./icons"

export type IconVariant = "tinted" | "plain"
export type IconTone = "white" | "black" | "accent" | "positive" | "warning" | "negative"
export type IconSize = "lg" | "md" | "sm"
export type IconRound = "full"
export type IconName = keyof typeof icons

export type IconProps = (
  UnsafeStyles
  & DOMProps & {
    name: IconName
    variant?: IconVariant
    tone?: IconTone
    rounded?: IconRound | boolean
    size?: IconSize | number
  }
)

const IconContext = React.createContext<ContextValue<Partial<IconProps>, SVGSVGElement>>(null)

function Icon(props: IconProps) {
  [props] = useContextProps(props, null, IconContext)

  const {
    name,
    rounded = true,
    size = "md",
    tone = "accent",
    variant = "plain",
    ...otherProps
  } = props

  const IconComponent = icons[name] || icons["object"]

  return (
    <IconComponent
      {...otherProps}
      aria-hidden="true"
      style={{
        ...(typeof size === "number" && {
          width: `${size * 0.25}rem`,
          height: `${size * 0.25}rem`,
        }),
        ...props.UNSAFE_style,
      }}
      className={classes(
        "shrink-0 inline-flex w-1",
        (rounded === true && variant === "tinted") && "rounded-2 p-1",
        rounded === "full" && "rounded-full",
        classes.match(size as IconSize, {
          lg: "w-8 h-8",
          md: "w-6 h-6",
          sm: "w-4 h-4",
        }),
        classes.match(tone, {
          white: "text-white",
          black: "text-black",
          accent: "text-accent",
          positive: "text-positive",
          warning: "text-warning",
          negative: "text-negative",
        }),
        classes.match(variant, {
          plain: "",
          tinted: classes.match(tone, {
            white: "bg-white/5",
            black: "bg-black/5",
            accent: "bg-accent/10",
            positive: "bg-positive/10",
            warning: "bg-warning/10",
            negative: "bg-negative/10",
          }),
        }),
        props.UNSAFE_className,
      )}
    />
  )
}

const _Icon = Object.assign(Icon, {
  Context: IconContext,
})

export { _Icon as Icon }
