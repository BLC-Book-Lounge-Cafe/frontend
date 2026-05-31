import { classes } from "shared/lib/classes"

type CircleActionButtonProps = {
  variant: "add" | "remove"
  label: string
  onPress: () => void
  isDisabled?: boolean
}

export function CircleActionButton(props: CircleActionButtonProps) {
  const { variant, label, onPress, isDisabled = false } = props

  return (
    <button
      type="button"
      aria-label={label}
      disabled={isDisabled}
      onClick={onPress}
      className={classes(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-surface-primary transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variant === "add" &&
          "border-green-600 text-green-600 hover:bg-green-600/10",
        variant === "remove" &&
          "border-red-600 text-red-600 hover:bg-red-600/10",
      )}
    >
      {variant === "add" ? (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path
            fill="currentColor"
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path
            fill="currentColor"
            d="M5 11h14v2H5z"
          />
        </svg>
      )}
    </button>
  )
}
