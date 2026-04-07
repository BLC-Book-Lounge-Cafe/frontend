import React from "react"
import type { HeadingProps } from "react-aria-components"
import { Heading } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type AppDialogHeaderTitleProps = (
  UnsafeStyles
  & Omit<HeadingProps, "level" | "className" | "style"> & {}
)

function AppDialogHeaderTitle(props: AppDialogHeaderTitleProps, ref: React.ForwardedRef<HTMLHeadingElement>) {
  return (
    <Heading
      {...props}
      ref={ref}
      level={2}
      style={props.UNSAFE_style}
      className={classes(
        "text-title-2 leading-tight font-bold break-words",
        props.UNSAFE_className,
      )}
    >
      {props.children}
    </Heading>
  )
}

const _AppDialogHeaderTitle = React.forwardRef(AppDialogHeaderTitle)
export { _AppDialogHeaderTitle as AppDialogHeaderTitle }
