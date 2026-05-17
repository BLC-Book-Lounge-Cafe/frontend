import { Button } from "shared/ui/button"
import type { ButtonProps } from "shared/ui/button"
import { useUserStore } from "../model/user-store"

export const LOGOUT_LABEL = "Выход"

export type LogoutButtonPlacement = "header" | "footer" | "mobile" | "section"

const placementDefaults: Record<LogoutButtonPlacement, Partial<ButtonProps>> = {
  header: { variant: "filled", rounded: true, size: "md" },
  footer: { variant: "filled", rounded: true, size: "md" },
  mobile: { variant: "filled", fullWidth: true },
  section: { variant: "filled", rounded: true, size: "lg" },
}

export type LogoutButtonProps = Omit<ButtonProps, "children"> & {
  placement: LogoutButtonPlacement
}

export function LogoutButton(props: LogoutButtonProps) {
  const { placement, onPress, ...rest } = props
  const reset = useUserStore((s) => s.reset)

  return (
    <Button
      {...placementDefaults[placement]}
      {...rest}
      onPress={(event) => {
        onPress?.(event)
        reset()
      }}
    >
      {LOGOUT_LABEL}
    </Button>
  )
}
