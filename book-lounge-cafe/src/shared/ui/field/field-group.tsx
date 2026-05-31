import React from "react"
import type { GroupProps, GroupRenderProps } from "react-aria-components"
import { Group, composeRenderProps, Provider } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import Icon from "shared/ui/Icon"

export type AppFieldGroupProps = (
  Omit<GroupProps, "className" | "style">
  & UnsafeStyles<GroupRenderProps> & {
    isActive?: boolean
  }
)

function AppFieldGroup(props: AppFieldGroupProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    UNSAFE_className,
    UNSAFE_style,
    isActive,
    ...groupProps
  } = props

  return (
    <Group
      {...groupProps}
      ref={ref}
      style={UNSAFE_style}
      data-group=""
      onPointerDown={(e) => {
        // Forward focus to input element when clicking on a non-interactive child (e.g. icon or padding)
        if (e.pointerType === "mouse" && !(e.target as Element).closest("button,input,textarea")) {
          e.preventDefault()
          e.currentTarget.querySelector("input")?.focus()
        }
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse" && !(e.target as Element).closest("button,input,textarea")) {
          e.preventDefault()
          e.currentTarget.querySelector("input")?.focus()
        }
      }}
      className={composeRenderProps(
        UNSAFE_className,
        (className, state) => classes(
          "flex items-center h-10 px-3 rounded-1 cursor-text [&_*]:placeholder:text-tertiary transition-colors",
          state.isDisabled ? [
            "text-tertiary bg-black/5 dark:bg-white/5 !cursor-not-allowed [&_*]:!cursor-not-allowed",
          ] : [
            state.isInvalid ? [
              "bg-negative/10",
              state.isHovered && "bg-negative/20",
              state.isFocusVisible && "ring ring-negative/50",
              state.isFocusVisible && "ring ring-negative/50",
            ] : [
              "bg-accent/10",
              state.isHovered && "bg-accent/20",
              state.isFocusVisible && "ring",
              isActive && "ring",
            ],
          ],
          className,
        ),
      )}
    >
      {composeRenderProps(
        props.children,
        (children, state) => (
          <Provider values={[
            [Icon.Context, {
              UNSAFE_className: classes(
                "text-accent",
                state.isInvalid && "text-negative",
                state.isDisabled && "!text-tertiary",
              ),
            }],
          ]}>
            {children}
          </Provider>
        ),
      )}
    </Group>
  )
}

const _AppFieldGroup = React.forwardRef(AppFieldGroup)
export { _AppFieldGroup as AppFieldGroup }
