import type { DateSegmentProps, DateSegmentRenderProps } from "react-aria-components"
import { DateSegment, composeRenderProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type AppDateSegmentProps = (
  Omit<DateSegmentProps, "className" | "style">
  & UnsafeStyles<DateSegmentRenderProps> & {}
)

export function AppDateSegment(props: AppDateSegmentProps) {
  return (
    <DateSegment
      {...props}
      style={props.UNSAFE_style}
      className={composeRenderProps(
        props.UNSAFE_className,
        (className, state) => classes(
          "px-0.5 text-end rounded-1 caret-transparent cursor-pointer outline-none",
          state.type === "literal" && "!px-0",
          state.isHovered && "bg-accent/20",
          state.isFocused && "!text-white !bg-accent",
          state.isPlaceholder && "text-tertiary",
          className,
        ),
      )}
    />
  )
}
