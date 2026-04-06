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
    <ul className={className ?? "flex flex-wrap items-center gap-8"}>
      {menuLinks.map((link) => (
        <li key={link.href} className={itemClassName}>
          <a 
            href={link.href} 
            onClick={onNavigate} 
            className={linkClassName ?? "text-primary font-medium no-underline transition-colors hover:text-accent"}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

