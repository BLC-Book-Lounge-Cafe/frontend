import { Button } from "shared/ui/button";
import type { UnsafeStyles } from "shared/model/types/unsafe-styles";
import { classes } from "shared/lib/classes";

type HeaderBurgerButtonProps = {
  onClick: () => void
  isOpen: boolean
} & UnsafeStyles

export function HeaderBurgerButton(props: HeaderBurgerButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      UNSAFE_className={classes(
        "inline-flex items-center justify-center rounded-2 p-2 text-black bg-white/10 hover:bg-white/15 active:bg-white/20",
        props.UNSAFE_className,
      )}
    >
      <span className="relative block w-6 h-4">
        <span className={"absolute left-0 top-0 block h-[2px] w-full bg-current transition-transform duration-200 " + (props.isOpen ? "translate-y-[7px] rotate-45" : "")} />
        <span className={"absolute left-0 top-1/2 -translate-y-1/2 block h-[2px] w-full bg-current transition-opacity duration-200 " + (props.isOpen ? "opacity-0" : "opacity-100")} />
        <span className={"absolute left-0 bottom-0 block h-[2px] w-full bg-current transition-transform duration-200 " + (props.isOpen ? "-translate-y-[7px] -rotate-45" : "")} />
      </span>
    </Button>
  )
}