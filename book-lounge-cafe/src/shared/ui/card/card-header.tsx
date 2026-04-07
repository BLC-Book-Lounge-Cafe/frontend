import React from "react"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type CardHeaderProps<E extends React.ElementType = "div"> = (
  UnsafeStyles & {
    elementType?: E
    children?: React.ReactNode
  }
)

const CardHeaderContext = React.createContext<
  ContextValue<Partial<CardHeaderProps>, any>
>(null)

function CardHeader<E extends React.ElementType = "div">(props: CardHeaderProps<E>, ref: React.ForwardedRef<E>) {
  [props, ref] = useContextProps(props, ref, CardHeaderContext)

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
        "flex flex-col justify-center p-2",
        UNSAFE_className,
      )}
    >
      {children}
    </ElementType>
  )
}

const _CardHeader = Object.assign(React.forwardRef(CardHeader), ({
  Context: CardHeaderContext,
}))

export { _CardHeader as CardHeader }
