import React from "react"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type CardProps<E extends React.ElementType = "div"> = (
  UnsafeStyles & {
    elementType?: E
    children?: React.ReactNode
    rounded?: boolean | number
    border?: boolean
    hasHoverEffect?: boolean
    hasOverlay?: boolean
  }
)

const CardContext = React.createContext<ContextValue<Partial<CardProps>, any>>(null)

function Card<E extends React.ElementType = "div">(props: CardProps<E>, ref: React.ForwardedRef<E>) {
  [props, ref] = useContextProps(props, ref, CardContext)

  const {
    UNSAFE_style,
    UNSAFE_className,
    elementType: ElementType = "div",
    children,
    rounded,
    border,
    hasOverlay,
    hasHoverEffect,
    ...restProps
  } = props

  return (
    <ElementType
      {...restProps}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
      style={{
        ...UNSAFE_style,
        "--rounded": typeof rounded === "number" ?
          `calc(${rounded} * 0.25rem)` :
          undefined,
      }}
      className={classes(
        "flex flex-col p-2 bg-surface-primary shadow-sm relative",
        hasHoverEffect && "hover:scale-[1.010] transition",
        hasOverlay && "before:absolute before:inset-0 before:bg-surface-primary before:opacity-50 before:rounded-3 before:content-[\"\"]",
        classes.match(typeof rounded, {
          boolean: "rounded-3",
          number: "rounded-[--rounded]",
        }),
        border && "border",
        UNSAFE_className,
      )}
    >
      {children}
    </ElementType>
  )
}

const _Card = Object.assign(React.forwardRef(Card), ({
  Context: CardContext,
}))

export { _Card as Card }
