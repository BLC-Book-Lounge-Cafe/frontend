import React from "react"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import { Link, type LinkProps } from "react-router-dom"

export type AppLinkProps = (
  Omit<LinkProps, "className" | "style">
  & UnsafeStyles & {
    noDefaultStyles?: boolean
    children?: React.ReactNode
  }
)

function AppLink(props: AppLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) {

  return (
    <Link
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      className={classes(
        "break-words disabled:text-primary-light disabled:cursor-not-allowed",
        props.noDefaultStyles && "no-underline text-current ",
        props.UNSAFE_className,
      )}
    >
      {props.children}
    </Link>
  )
}

const _AppLink = Object.assign(React.forwardRef(AppLink))

export { _AppLink as AppLink }
