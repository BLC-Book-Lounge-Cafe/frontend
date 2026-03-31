import React from "react"
import { FieldError } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import { Notice } from "shared/ui/notice"

export type AppFieldErrorProps = (
  UnsafeStyles & {
    children?: React.ReactNode
  }
)

function AppFieldError(props: AppFieldErrorProps, ref: React.ForwardedRef<HTMLDivElement>) {
  if (!props.children) {
    return null
  }

  return (
    <Notice
      ref={ref}
      tone="negative"
      variant="plain"
      UNSAFE_style={props.UNSAFE_style}
      UNSAFE_className={classes("mt-1", props.UNSAFE_className)}
    >
      <FieldError className="wrap-break-word text-negative">
        {props.children}
      </FieldError>
    </Notice>
  )
}

const _AppFieldError = React.forwardRef(AppFieldError)
export { _AppFieldError as AppFieldError }
