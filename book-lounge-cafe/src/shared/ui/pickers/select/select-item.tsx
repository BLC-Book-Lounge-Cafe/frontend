import React from "react"
import type { ListBoxItemProps } from "react-aria-components"
import { ListBoxItem, composeRenderProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import Icon from "shared/ui/Icon"
import { classes } from "shared/lib/classes"

export type AppSelectItemProps = (
  Omit<ListBoxItemProps, "children" | "style" | "className">
  & UnsafeStyles & {
    children: React.ReactNode
  }
)

export function AppSelectItem(props: AppSelectItemProps) {
  const itemRef = React.useRef(null)

  return (
    <ListBoxItem
      {...props}
      ref={itemRef}
      textValue={props.textValue || (typeof props.children === "string" ? props.children as string : undefined)}
      className={(state) => classes(
        "shrink-0 flex items-center min-h-8 px-1.5 py-1 leading-tight break-words rounded-1 outline-none cursor-pointer",
        state.isDisabled ? "text-tertiary cursor-not-allowed" : [
          state.isHovered && "bg-accent/10",
          state.isFocusVisible && "ring ring-inset",
          state.isSelected && "text-accent",
        ],
        props.UNSAFE_className,
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {isSelected && (
            <Icon
              name="arrowSuccess"
              size="sm"
              UNSAFE_className="mr-1"
            />
          )}
          {children}
        </>
      ))}
    </ListBoxItem>
  )
}
