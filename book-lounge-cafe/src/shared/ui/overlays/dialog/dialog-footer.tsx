import React from "react"
import type { ContextValue } from "react-aria-components"
import { Provider, OverlayTriggerStateContext, DEFAULT_SLOT, useContextProps } from "react-aria-components"
// shared
import { Card, type CardFooterProps } from "shared/ui/card"
import { Button, ButtonSlot } from "shared/ui/button"

export type AppDialogFooterProps = (
  Omit<CardFooterProps,
    | "elementType"
  > & {}
)

const AppDialogFooterContext = React.createContext<
  ContextValue<Partial<AppDialogFooterProps>, any>
>(null)

function AppDialogFooter(props: AppDialogFooterProps, ref: React.ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, AppDialogFooterContext)
  const state = React.useContext(OverlayTriggerStateContext)

  return (
    <Card.Footer
      {...props}
      ref={ref as any}
      elementType="footer"
    >
      <Provider values={[
        [Button.Context, {
          slots: {
            [DEFAULT_SLOT]: {},
            [ButtonSlot.dismiss]: {
              onPress: () => state?.close(),
            },
          },
        }],
      ]}>
        {props.children}
      </Provider>
    </Card.Footer>
  )
}

const _AppDialogFooter = Object.assign(React.forwardRef(AppDialogFooter), ({
  Context: AppDialogFooterContext,
}))

export { _AppDialogFooter as AppDialogFooter }
