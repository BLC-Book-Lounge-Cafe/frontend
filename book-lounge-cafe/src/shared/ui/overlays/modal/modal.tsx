import React from "react"
import type { ModalOverlayProps, ContextValue } from "react-aria-components"
import { ModalOverlay, Modal, ModalContext, useContextProps, Provider, composeRenderProps } from "react-aria-components"
// shared
import { classes } from "shared/lib/classes"
import { Underlay } from "shared/ui/overlays/underlay"
import { Dialog } from "shared/ui/overlays/dialog"
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"

export type AppModalProps = (
  UnsafeStyles
  & Omit<ModalOverlayProps,
  | "className"
  | "style"
  | "isEntering"
  | "isExiting"
  | "shouldCloseOnInteractOutside"
  > & {}
)

const AppModalContext = ModalContext as React.Context<ContextValue<AppModalProps, HTMLDivElement>>

function AppModal(props: AppModalProps, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, AppModalContext)

  const { isDismissable = true, UNSAFE_style, UNSAFE_className, ...restProps } = props

  return (
    <ModalOverlay
      {...restProps}
      style={UNSAFE_style}
      isDismissable={isDismissable}
      className={(state) => classes(
        "fixed top-0 left-0 z-[100] flex flex-col w-screen h-full min-h-[--visual-viewport-height] p-4",
        [
          "motion-duration-300 motion-ease-in-out",
          state.isEntering && "motion-opacity-in-0",
          state.isExiting && "motion-opacity-out-0",
        ],
        UNSAFE_className,
      )}
    >
      {(state) => (
        <React.Fragment>
          <Underlay />
          <Modal
            {...restProps}
            ref={ref}
            isDismissable={isDismissable}
            className={classes(
              "relative flex flex-col w-full items-center m-auto max-w-full max-h-full min-h-0 outline-none",
              [
                "motion-duration-300 motion-ease-in-out",
                state.isEntering && "motion-translate-y-in-[theme(spacing.2)]",
                state.isExiting && "motion-translate-y-out-[theme(spacing.2)]",
              ],
            )}
          >
            {composeRenderProps(props.children, (children) => (
              <Provider values={[
                [Dialog.Context, { rounded: true }],
              ]}>
                {children}
              </Provider>
            ))}
          </Modal>
        </React.Fragment>
      )}
    </ModalOverlay>
  )
}

const _AppModal = Object.assign(
  React.forwardRef(AppModal), ({
    Context: AppModalContext,
  }),
)

export { _AppModal as AppModal }
