import React from "react"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type CardFooterProps<E extends React.ElementType = "div"> = (
  UnsafeStyles & {
    elementType?: E
    children?: React.ReactNode
  }
)

const CardFooterContext = React.createContext<
  ContextValue<Partial<CardFooterProps>, any>
>(null)

function CardFooter<E extends React.ElementType = "div">(props: CardFooterProps<E>, ref: React.ForwardedRef<E>) {
  [props, ref] = useContextProps(props, ref, CardFooterContext)

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
        "flex p-2",
        UNSAFE_className,
      )}
    >
      {children}
    </ElementType>
  )
}

const _CardFooter = Object.assign(React.forwardRef(CardFooter), ({
  Context: CardFooterContext,
}))

export { _CardFooter as CardFooter }
