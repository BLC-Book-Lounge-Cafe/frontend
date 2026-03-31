import React from "react"
import type { TextAreaProps } from "react-aria-components"
import { TextArea, composeRenderProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type AppFieldTextAreaProps = (
  UnsafeStyles
  & Omit<TextAreaProps, "className" | "style"> & {}
)

function AppFieldTextArea(props: AppFieldTextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) {
  return (
    <TextArea
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

const _AppFieldTextArea = React.forwardRef(AppFieldTextArea)
export { _AppFieldTextArea as AppFieldTextArea }
