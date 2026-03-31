import { NavLink } from "shared/ui/nav-link"
import { menuLinks } from "../model/menu-links"

export type HeaderMenuProps = {
  className?: string
  itemClassName?: string
  linkClassName?: string
  onNavigate?: () => void
}

export function HeaderMenu(props: HeaderMenuProps) {
  const { className, itemClassName, linkClassName, onNavigate } = props

  return (
    <ul className={className ?? "flex flex-wrap items-center gap-4"}>
      {menuLinks.map((link) => (
        <li key={link.href} className={itemClassName}>
          <NavLink to={link.href} onClick={onNavigate} UNSAFE_className={linkClassName}>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

