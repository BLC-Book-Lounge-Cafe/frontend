import React from "react"
import type { PopoverProps, ContextValue } from "react-aria-components"
import { Popover, PopoverContext, useContextProps, Provider, OverlayArrow } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import { Dialog } from "shared/ui/overlays/dialog"

/** Необходимо для синхронизации arrowBoundaryOffset */
const BORDER_RADIUS = 10

export type AppPopoverProps = (
  UnsafeStyles
  & Omit<PopoverProps,
  | "style"
  | "className"
  | "children"
  | "arrowSize"
  | "boundaryElement"
  | "offset"
  | "crossOffset"
  | "arrowBoundaryOffset"
  | "containerPadding"
  | "shouldCloseOnInteractOutside"
  | "shouldUpdatePosition"
  | "shouldFlip"
  | "isEntering"
  | "isExiting"
  > & {
    children: React.ReactNode
    showArrow?: boolean
  }
)

const AppPopoverContext = PopoverContext as React.Context<ContextValue<Partial<AppPopoverProps>, HTMLElement>>

function AppPopover(props: AppPopoverProps, ref: React.ForwardedRef<HTMLElement>) {
  [props, ref] = useContextProps(props, ref, AppPopoverContext)

  const { showArrow = true } = props

  return (
    <Popover
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      arrowBoundaryOffset={BORDER_RADIUS}
      offset={10}
      className={(state) => classes(
        [
          "motion-duration-300 motion-ease-in-out",
          state.isEntering && "motion-opacity-in-0 motion-translate-y-in-[theme(spacing.2)]",
          state.isExiting && "motion-opacity-out-0 motion-translate-y-out-[theme(spacing.2)]",
        ],
        props.UNSAFE_className,
      )}
    >
      {(state) => (
        <React.Fragment>
          {showArrow && (
            <OverlayArrow>
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                className={classes(
                  "block fill-surface-secondary stroke-accent/25",
                  state.placement === "bottom" && "rotate-180",
                  state.placement === "left" && "rotate-[270deg]",
                )}>
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          )}

          <Provider values={[
            [Dialog.Context, { rounded: true, border: true, UNSAFE_className: "max-w-xs -m-px" }],
            [Dialog.Header.Context, { UNSAFE_className: "pb-0" }],
          ]}>
            {props.children}
          </Provider>
        </React.Fragment>
      )}
    </Popover>
  )
}

const _AppPopover = Object.assign(
  React.forwardRef(AppPopover), ({
    Context: AppPopoverContext,
  }),
)
export { _AppPopover as AppPopover }
