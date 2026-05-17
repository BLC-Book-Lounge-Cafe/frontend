import { ReservationLeaveRequestButton } from "entities/reservation"
import { LogoutButton, useCurrentUser } from "entities/user"
import { Container } from "shared/ui/container"
import { HeaderMenu } from "./header-menu"

type HeaderMobileMenuProps = {
  onClose: () => void
  onReservationPress?: () => void
}

export function HeaderMobileMenu(props: HeaderMobileMenuProps) {
  const { isAdmin } = useCurrentUser()

  return (
    <div className="absolute left-0 right-0 top-full bg-surface-primary border-b border-default lg:hidden z-[9999999]">
    <Container UNSAFE_className="py-4 flex flex-col gap-4">
      <nav>
        <HeaderMenu
          onNavigate={props.onClose}
          className="flex flex-col gap-3"
          linkClassName="text-primary"
        />
      </nav>
      {isAdmin ? (
        <LogoutButton
          placement="mobile"
          onPress={() => props.onClose()}
        />
      ) : (
        <ReservationLeaveRequestButton
          placement="mobile"
          onPress={() => {
            props.onReservationPress?.()
            props.onClose()
          }}
        />
      )}
    </Container>
  </div>
  )
}