import React from "react"
import type { ContextValue, SeparatorProps } from "react-aria-components"
import { Separator, SeparatorContext, useContextProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type DividerProps = (
  Omit<SeparatorProps, "className" | "style" | "elementType">
  & UnsafeStyles & {}
)

const DividerContext = SeparatorContext as React.Context<
  ContextValue<Partial<DividerProps>, HTMLElement>
>

function Divider(props: DividerProps, ref: React.ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, DividerContext)

  const { orientation = "horizontal" } = props

  return (
    <Separator
      {...props}
      ref={ref}
      elementType="div"
      orientation={orientation}
      style={props.UNSAFE_style}
      className={classes(
        "self-stretch rounded-none",
        classes.match(orientation, {
          vertical: "w-px min-h-px border-r",
          horizontal: "h-px min-w-px border-t",
        }),
        props.UNSAFE_className,
      )}
    />
  )
}

const _Divider = Object.assign(
  React.forwardRef(Divider), ({
    Context: DividerContext,
  }),
)

export { _Divider as Divider }
