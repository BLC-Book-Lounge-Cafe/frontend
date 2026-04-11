import { Button } from "shared/ui/button"
import type { ButtonProps } from "shared/ui/button"
import { RESERVATION_LEAVE_REQUEST_LABEL } from "../model/constants"

export type ReservationLeaveRequestPlacement = "header" | "footer" | "mobile" | "section"

const placementDefaults: Record<ReservationLeaveRequestPlacement, Partial<ButtonProps>> = {
  header: { variant: "filled", rounded: true, size: "md" },
  footer: { variant: "filled", rounded: true, size: "md" },
  mobile: { variant: "filled", fullWidth: true },
  section: { variant: "filled", rounded: true, size: "lg" },
}

export type ReservationLeaveRequestButtonProps = Omit<ButtonProps, "children"> & {
  placement: ReservationLeaveRequestPlacement
}

export function ReservationLeaveRequestButton(props: ReservationLeaveRequestButtonProps) {
  const { placement, ...rest } = props
  return (
    <Button {...placementDefaults[placement]} {...rest}>
      {RESERVATION_LEAVE_REQUEST_LABEL}
    </Button>
  )
}
