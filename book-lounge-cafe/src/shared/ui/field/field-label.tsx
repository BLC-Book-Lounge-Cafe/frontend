import React from "react"
import type { LabelProps } from "react-aria-components"
import { Label } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type AppFieldLabelProps = (
  Omit<LabelProps, "className" | "style" | "children"> &
  UnsafeStyles & {
    UNSAFE_wrapper_className?: string
    isDisabled?: boolean
    isRequired?: boolean
    necessityIndicator?: boolean
    contextualHelp?: React.ReactNode
    isQuiet?: boolean
    isBold?: boolean
    children?: React.ReactNode
  }
)

function AppFieldLabel(props: AppFieldLabelProps, ref: React.ForwardedRef<HTMLLabelElement>) {
  const {
    isRequired,
    necessityIndicator = "icon",
    contextualHelp,
    isBold,
    UNSAFE_wrapper_className,
    ...labelProps
  } = props

  // const contextualHelpId = React.useId()
  const fallbackLabelPropsId = React.useId()

  if (contextualHelp && !labelProps.id) {
    labelProps.id = fallbackLabelPropsId
  }

  if (!props.children) {
    return null
  }

  return (
    <div className={classes("inline-flex items-baseline justify-between mb-1 text-left", UNSAFE_wrapper_className)}>
      <Label
        {...labelProps}
        ref={ref}
        style={props.UNSAFE_style}
        className={classes(
          "relative wrap-break-word cursor-default",
          (isRequired && necessityIndicator) && "after:content-['*'] after:text-negative after:font-bold",
          isBold && "font-bold",
          props.UNSAFE_className,
        )}
      >
        {props.children}
      </Label>

      {contextualHelp && (
        <div className={classes("flex items-end whitespace-nowrap", props.children && "h-0")}>
          &nbsp;
          <div className="inline-flex">
            {contextualHelp}
          </div>
        </div>
      )}
    </div>
  )
}

const _AppFieldLabel = React.forwardRef(AppFieldLabel)
export { _AppFieldLabel as AppFieldLabel }
