import { Container } from "shared/ui/container";
import { HeaderMenu } from "./header-menu";
import { Button } from "shared/ui/button";

type HeaderMobileMenuProps = {
  onClose: () => void
}

export function HeaderMobileMenu(props: HeaderMobileMenuProps) {
  return (
    <div className="absolute left-0 right-0 top-full bg-surface-primary border-b border-default md:hidden z-[9999999]">
    <Container UNSAFE_className="py-4 flex flex-col gap-4">
      <nav>
        <HeaderMenu
          onNavigate={props.onClose}
          className="flex flex-col gap-3"
          linkClassName="text-primary"
        />
      </nav>
      <Button fullWidth onPress={props.onClose}>
        Забронировать
      </Button>
    </Container>
  </div>
  )
}