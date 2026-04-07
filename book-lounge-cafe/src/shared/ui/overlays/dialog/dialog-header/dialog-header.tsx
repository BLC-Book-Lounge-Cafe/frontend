import React from "react"
import type { ContextValue } from "react-aria-components"
import { useContextProps } from "react-aria-components"
// shared
import { Card, type CardHeaderProps } from "shared/ui/card"

export type AppDialogHeaderProps = (
  Omit<CardHeaderProps,
    | "elementType"
  > & {}
)

const AppDialogHeaderContext = React.createContext<
  ContextValue<Partial<AppDialogHeaderProps>, HTMLElement>
>(null)

function AppDialogHeader(props: AppDialogHeaderProps, ref: React.ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, AppDialogHeaderContext)

  return (
    <Card.Header
      {...props}
      ref={ref as any}
      elementType="header"
    >
      {props.children}
    </Card.Header>
  )
}

const _AppDialogHeader = Object.assign(React.forwardRef(AppDialogHeader), ({
  Context: AppDialogHeaderContext,
}))

export { _AppDialogHeader as AppDialogHeader }
