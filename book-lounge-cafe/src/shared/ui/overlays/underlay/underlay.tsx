// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

type AppUnderlayProps = UnsafeStyles & {}

export function AppUnderlay(props: AppUnderlayProps) {
  const { UNSAFE_className, UNSAFE_style } = props

  return (
    <div
      style={UNSAFE_style}
      className={classes(
        "fixed left-0 top-0 w-full h-screen bg-black/50 pointer-events-none",
        UNSAFE_className,
      )}
    />
  )
}
