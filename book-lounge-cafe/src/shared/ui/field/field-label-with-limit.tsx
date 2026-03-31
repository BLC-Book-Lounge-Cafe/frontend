import { forwardRef } from "react"
import { classes } from "shared/lib/classes"
import type { AppFieldLabelProps } from "./field-label"
import { AppFieldLabel } from "./field-label"

export type AppFieldLabelWithLimitProps = AppFieldLabelProps & {
  isLimitReached: boolean
  charactersLeftCount: number
  labelText: string | React.ReactNode
  limitText?: string | React.ReactNode
}

function AppFieldLabelWithLimit(props: AppFieldLabelWithLimitProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const { isLimitReached, charactersLeftCount, labelText, limitText, ...labelProps } = props

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-between gap-1 mb-1">
      <AppFieldLabel {...labelProps} UNSAFE_wrapper_className="m-0">
        {labelText}
      </AppFieldLabel>
      <p
        className={classes(
          "text-secondary text-caption",
          isLimitReached && "text-negative",
        )}
      >
        {limitText || `Осталось символов: ${charactersLeftCount}`}
      </p>
    </div>
  )
}

const _AppFieldLabelWithLimit = forwardRef(AppFieldLabelWithLimit)
export { _AppFieldLabelWithLimit as AppFieldLabelWithLimit }
