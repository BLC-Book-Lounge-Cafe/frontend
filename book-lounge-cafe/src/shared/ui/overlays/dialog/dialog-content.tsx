import React from "react"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import { classes } from "shared/lib/classes"
import { Card, type CardContentProps } from "shared/ui/card"

export type AppDialogContentProps = (
  Omit<CardContentProps, "elementType"> & {}
)

const AppDialogContentContext = React.createContext<
  ContextValue<Partial<AppDialogContentProps>, HTMLDivElement>
>(null)

function AppDialogContent(props: AppDialogContentProps, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, AppDialogContentContext)

  return (
    <Card.Content
      {...props}
      ref={ref as any}
      elementType="div"
      UNSAFE_className={classes(
        "w-full h-full min-h-0",
        props.UNSAFE_className,
      )}
    >
      {props.children}
    </Card.Content>
  )
}

const _AppDialogContent = Object.assign(React.forwardRef(AppDialogContent), ({
  Context: AppDialogContentContext,
}))

export { _AppDialogContent as AppDialogContent }
