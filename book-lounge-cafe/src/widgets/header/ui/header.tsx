import React from "react"
import Icon from "shared/ui/Icon"
import { ReservationLeaveRequestButton } from "entities/reservation"
import { Container } from "shared/ui/container"
import { HeaderMenu } from "./header-menu"
import { HeaderMobileMenu } from "./header-mobile-menu"
import { HeaderBurgerButton } from "./header-burger-button"
import { useMediaQuery } from "shared/lib/media-query"

type HeaderProps = {
  onReservationPress?: () => void
}

export function Header(props: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const media = useMediaQuery()


  return (
    <header className="bg-surface-accent/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <Container UNSAFE_className="flex items-center justify-between gap-6 py-4 md:justify-between">
        <a href="#hero">
          <Icon name="logo" size={ media.max('xs') ? 12 : 16} UNSAFE_className="transition-transform hover:scale-105 shrink-0" />
        </a>

        <nav className="hidden md:flex flex-1 justify-center">
          <HeaderMenu />
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex-end md:hidden lg:flex shrink-0">
            <ReservationLeaveRequestButton
              placement="header"
              onPress={props.onReservationPress}
            />
          </div>

          <HeaderBurgerButton onClick={() => setIsMobileMenuOpen(v => !v)} isOpen={isMobileMenuOpen} UNSAFE_className="lg:hidden" />
        </div>
      </Container>

      {isMobileMenuOpen && (
        <HeaderMobileMenu
          onClose={() => setIsMobileMenuOpen(false)}
          onReservationPress={props.onReservationPress}
        />
      )}
    </header>
  )
}
