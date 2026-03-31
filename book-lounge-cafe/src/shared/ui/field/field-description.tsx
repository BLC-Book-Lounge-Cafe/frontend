import React from "react"
import { Text } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import { Notice } from "shared/ui/notice"

export type AppFieldDescriptionProps = (
  UnsafeStyles & {
    children?: React.ReactNode
  }
)

function AppFieldDescription(props: AppFieldDescriptionProps, ref: React.ForwardedRef<HTMLDivElement>) {
  if (!props.children) {
    return null
  }

  return (
    <Notice
      ref={ref}
      tone="neutral"
      variant="plain"
      UNSAFE_style={props.UNSAFE_style}
      UNSAFE_className={classes("mt-1", props.UNSAFE_className)}
    >
      <Text slot="description" className="wrap-break-word">
        {props.children}
      </Text>
    </Notice>
  )
}

const _AppFieldDescription = React.forwardRef(AppFieldDescription)
export { _AppFieldDescription as AppFieldDescription }
