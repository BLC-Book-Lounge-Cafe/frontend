import React from "react"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type CardContentProps<E extends React.ElementType = "div"> = (
  UnsafeStyles & {
    elementType?: E
    children?: React.ReactNode
  }
)

const CardContentContext = React.createContext<
  ContextValue<Partial<CardContentProps>, any>
>(null)

function CardContent<E extends React.ElementType = "div">(props: CardContentProps<E>, ref: React.ForwardedRef<E>) {
  [props, ref] = useContextProps(props, ref, CardContentContext)

  const {
    UNSAFE_style,
    UNSAFE_className,
    elementType: ElementType = "div",
    children,
    ...restProps
  } = props

  return (
    <ElementType
      {...restProps}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
      style={UNSAFE_style}
      className={classes(
        "flex-1 flex flex-col p-2",
        UNSAFE_className,
      )}
    >
      {children}
    </ElementType>
  )
}

const _CardContent = Object.assign(React.forwardRef(CardContent), ({
  Context: CardContentContext,
}))

export { _CardContent as CardContent }
