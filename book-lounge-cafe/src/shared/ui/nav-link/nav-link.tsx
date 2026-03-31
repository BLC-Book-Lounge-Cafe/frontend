import React from "react"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import { NavLink, type NavLinkProps } from "react-router-dom"

export type AppNavLinkProps = (
  Omit<NavLinkProps, "className" | "style">
  & UnsafeStyles & {
    noDefaultStyles?: boolean
    children?: React.ReactNode
  }
)

function AppNavLink(props: AppNavLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) {

  return (
    <NavLink
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      className={(state => classes(
        "break-words disabled:text-primary-light disabled:cursor-not-allowed",
        state.isActive && "text-accent",
        props.noDefaultStyles && "no-underline text-current ",
        props.UNSAFE_className,
      ))}
    >
      {props.children}
    </NavLink>
  )
}

const _AppNavLink = Object.assign(React.forwardRef(AppNavLink))

export { _AppNavLink as AppNavLink }
