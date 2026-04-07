import React from "react"
import type { AriaLabelingProps } from "@react-types/shared"
import type { ContextValue } from "react-aria-components"
import { ToggleButtonGroup, ToggleButtonGroupContext, useContextProps, Provider } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
// local
import { SegmentsSelectionTracker } from "./segments-selection-tracker"
import { SegmentSliderTracker } from "./segments-slider-tracker"
import { SegmentsGroupItem } from "./segments-item"

type SegmentsLayout = "auto" | "stretch"

export type SegmentsGroupProps = (
  AriaLabelingProps
  & UnsafeStyles & {
    layout?: SegmentsLayout
    children: React.ReactNode
    isDisabled?: boolean
    selectedKey?: Key | null
    defaultSelectedKey?: Key
    onSelectionChange?: (id: Key) => void
  }
)

const SegmentsGroupContext = ToggleButtonGroupContext as React.Context<ContextValue<Partial<SegmentsGroupProps>, HTMLDivElement>>

function SegmentsGroup(props: SegmentsGroupProps, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, SegmentsGroupContext)

  const {
    UNSAFE_style,
    UNSAFE_className,
    layout = "auto",
    children,
    defaultSelectedKey,
    selectedKey,
    isDisabled,
    onSelectionChange,
  } = props

  return (
    <ToggleButtonGroup
      {...props}
      ref={ref}
      isDisabled={isDisabled}
      selectedKeys={selectedKey != null ? [selectedKey] : undefined}
      defaultSelectedKeys={defaultSelectedKey != null ? [defaultSelectedKey] : undefined}
      onSelectionChange={(values) => onSelectionChange?.(values.values().next().value!)}
      disallowEmptySelection
      orientation="horizontal"
      style={UNSAFE_style}
      className={(state) => (
        classes(
          "relative isolate flex gap-0.5 h-10 p-0.5 bg-accent/10 rounded-1",
          layout === "auto" && "w-fit",
          state.isDisabled && "opacity-50 cursor-not-allowed",
          UNSAFE_className,
        )
      )}
    >
      <SegmentsSelectionTracker
        value={selectedKey}
        defaultValue={defaultSelectedKey}
      >
        <SegmentSliderTracker containerRef={ref}>
          <Provider values={[
            [SegmentsGroupItem.Context, {
              UNSAFE_className: classes(
                "rounded-0.5",
                classes.match(layout, {
                  stretch: "flex-1",
                }),
              ),
              isDisabled: isDisabled,
            }],
          ]}>
            {children}
          </Provider>
        </SegmentSliderTracker>
      </SegmentsSelectionTracker>
    </ToggleButtonGroup>
  )
}

const _SegmentsGroup = Object.assign(
  React.forwardRef(SegmentsGroup),
  { Context: SegmentsGroupContext },
)

export { _SegmentsGroup as SegmentsGroup }
