import React from "react"
import Icon from "shared/ui/Icon"
import { Container } from "shared/ui/container"
import { Button } from "shared/ui/button"
import { HeaderMenu } from "./header-menu"
import { HeaderMobileMenu } from "./header-mobile-menu"
import { HeaderBurgerButton } from "./header-burger-button"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <header className="bg-surface-accent relative">
      <Container UNSAFE_className="flex items-center justify-between gap-4 py-3">
        <Icon name="logo" size={16} />

        <nav className="hidden md:flex">
          <HeaderMenu />
        </nav>

        <div className="hidden md:flex">
          <Button>Забронировать</Button>
        </div>

        <HeaderBurgerButton onClick={() => setIsMobileMenuOpen(v => !v)} isOpen={isMobileMenuOpen} />
      </Container>

      {isMobileMenuOpen && (
        <HeaderMobileMenu onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  )
}