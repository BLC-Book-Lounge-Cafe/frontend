import React from "react"
import type { InputProps, InputRenderProps } from "react-aria-components"
import { Input, composeRenderProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type AppFieldInputProps = (
  UnsafeStyles<InputRenderProps>
  & Omit<InputProps, "className" | "style"> & {}
)

function AppFieldInput(props: AppFieldInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  return (
    <Input
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      className={composeRenderProps(props.UNSAFE_className, (UNSAFE_className) => classes(
        "grow shrink h-full w-full text-ellipsis bg-transparent outline-none",
        UNSAFE_className,
      ))}
    />
  )
}

const _AppFieldInput = React.forwardRef(AppFieldInput)
export { _AppFieldInput as AppFieldInput }
