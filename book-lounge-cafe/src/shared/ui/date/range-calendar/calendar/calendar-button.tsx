import type { ButtonProps } from "shared/ui/button"
import { Button } from "shared/ui/button"

type CalendarButtonProps = Omit<ButtonProps, "children"> & {
  children: React.ReactNode
}

export function CalendarButton(props: CalendarButtonProps) {
  return (
    <Button
      {...props}
      variant="plain"
      size="sm"
    >
      {props.children}
    </Button>
  )
}
