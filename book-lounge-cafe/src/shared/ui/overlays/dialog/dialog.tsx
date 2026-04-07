import React from "react"
import type { ContextValue, DialogProps } from "react-aria-components"
import { Dialog, DialogContext, useContextProps, composeRenderProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import type { CardProps } from "shared/ui/card"
import { Card } from "shared/ui/card"

export type AppDialogProps = (
  Omit<DialogProps, "className" | "style">
  & Pick<CardProps, "border" | "rounded">
  & UnsafeStyles & {}
)

const AppDialogContext = DialogContext as React.Context<ContextValue<AppDialogProps, HTMLDivElement>>

function AppDialog(props: AppDialogProps, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, AppDialogContext)

  return (
    <Dialog
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      className={classes(
        "flex flex-col max-w-full max-h-full outline-none",
        props.UNSAFE_className,
      )}
    >
      {composeRenderProps(props.children, (children) => (
        <Card
          border={props.border}
          rounded={props.rounded}
          UNSAFE_className="w-full h-full bg-surface-primary"
        >
          {children}
        </Card>
      ))}
    </Dialog>
  )
}

const _AppDialog = Object.assign(
  React.forwardRef(AppDialog), ({
    Context: AppDialogContext,
  }),
)

export { _AppDialog as AppDialog }
