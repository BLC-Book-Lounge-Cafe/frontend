import React from "react"
import { useObjectRef } from "@react-aria/utils"
import type { AriaLabelingProps } from "@react-types/shared"
import type { ContextValue } from "react-aria-components"
import { ToggleButton, ToggleButtonContext, ToggleGroupStateContext, useContextProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
// local
import { SegmentsSelectionTracker } from "./segments-selection-tracker"
import { SegmentSliderTracker } from "./segments-slider-tracker"

export type SegmentsGroupItemProps = (
  AriaLabelingProps
  & UnsafeStyles & {
    id: Key
    children: React.ReactNode
    isDisabled?: boolean
  }
)

const SegmentsGroupItemContext = ToggleButtonContext as React.Context<
  ContextValue<Partial<SegmentsGroupItemProps>, HTMLButtonElement>
>

function SegmentsGroupItem(props: SegmentsGroupItemProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  [props, ref] = useContextProps(props, ref, SegmentsGroupItemContext)
  const domRef = useObjectRef(ref)
  const state = React.useContext(ToggleGroupStateContext)
  const isSelected = !!state?.selectedKeys.has(props.id)

  const { register } = React.useContext(SegmentsSelectionTracker.Context)
  const { prevRef, currentRef: trackRef } = React.useContext(SegmentSliderTracker.Context)

  React.useLayoutEffect(() => {
    register?.(props.id)
  }, [])

  React.useLayoutEffect(() => {
    if (isSelected && prevRef?.current && trackRef?.current) {
      const prevItem = prevRef.current.getBoundingClientRect()
      const currentItem = trackRef.current.getBoundingClientRect()
      const deltaX = prevItem.left - currentItem.left

      trackRef.current.animate(
        [
          { transform: `translateX(${deltaX}px)`, width: `${prevItem.width}px` },
          { transform: "translateX(0px)", width: `${currentItem.width}px` },
        ],
        {
          duration: 200,
          easing: "ease-out",
        },
      )

      prevRef.current = null
    }
  }, [isSelected])

  return (
    <ToggleButton
      {...props}
      ref={domRef}
      data-key={props.id}
      style={props.UNSAFE_style}
      className={(state) => classes(
        "shrink-0 relative flex items-center justify-center h-full min-w-0 px-2 transition-colors",
        state.isSelected && "text-accent",
        !state.isSelected && "z-[1]",
        state.isFocusVisible && "ring",
        (state.isHovered || state.isPressed) && "bg-black/5 dark:bg-white/5",
        state.isDisabled && "cursor-not-allowed",
        props.UNSAFE_className,
      )}
    >
      {isSelected && (
        <div
          ref={trackRef}
          className="absolute left-0 top-0 w-full h-full bg-white dark:bg-[#3f3f46] rounded-inherit"
        />
      )}
      <div className="relative m-auto truncate">
        {props.children}
      </div>
    </ToggleButton>
  )
}

const _SegmentsGroupItem = Object.assign(React.forwardRef(SegmentsGroupItem), {
  Context: SegmentsGroupItemContext,
})

export { _SegmentsGroupItem as SegmentsGroupItem }
