import type { MouseEvent } from "react"
import Icon from "shared/ui/Icon"
import type { IconName } from "shared/ui/Icon"

type CardActionButtonProps = {
  icon: IconName
  label: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export function CardActionButton(props: CardActionButtonProps) {
  const { icon, label, onClick } = props

  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation()
        onClick?.(event)
      }}
      className="inline-flex items-center justify-center text-black transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <Icon name={icon} tone="black" size={5} />
    </button>
  )
}
