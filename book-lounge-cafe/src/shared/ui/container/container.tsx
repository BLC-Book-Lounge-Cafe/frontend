import { classes } from "shared/lib/classes"
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"

export type ContainerSize = "sm" | "md" | "lg"

type ContainerProps = {
  children: React.ReactNode
  size?: ContainerSize
} & UnsafeStyles

export function Container(props: ContainerProps) {
  const { children, size = "lg", UNSAFE_style, UNSAFE_className } = props

  return (
    <div style={UNSAFE_style} className={classes(
      "mx-auto py-2 px-4 w-full",
      classes.match(size, {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-xl",
      }),
      UNSAFE_className,
    )}>
      {children}
    </div>
  )
}