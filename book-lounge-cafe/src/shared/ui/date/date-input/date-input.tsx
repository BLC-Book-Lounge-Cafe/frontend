import React from "react"
import type { DateInputProps, DateInputRenderProps } from "react-aria-components"
import { DateInput, composeRenderProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type AppDateInputProps = (
  Omit<DateInputProps, "className" | "style">
  & UnsafeStyles<DateInputRenderProps> & {}
)

function AppDateInput(props: AppDateInputProps, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <DateInput
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      className={composeRenderProps(
        props.UNSAFE_className,
        (className) => classes(
          "flex whitespace-nowrap outline-none forced-color-adjust-none",
          className,
        ),
      )}
    />
  )
}

const _AppDateInput = React.forwardRef(AppDateInput)
export { _AppDateInput as AppDateInput }
