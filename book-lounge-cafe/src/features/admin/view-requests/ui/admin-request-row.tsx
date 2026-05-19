import { classes } from "shared/lib/classes"
import { dateFormatter } from "shared/lib/formatters/date-formatter"
import type { ReservationRequest } from "entities/reservation-request"

type AdminRequestRowProps = {
  request: ReservationRequest
  isSelected: boolean
  onSelect: (id: number) => void
}

const CREATED_AT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}

export function AdminRequestRow(props: AdminRequestRowProps) {
  const { request, isSelected } = props

  const createdAtLabel = request.createdAt
    ? dateFormatter.formatIso(request.createdAt, CREATED_AT_OPTIONS)
    : null

  return (
    <button
      type="button"
      onClick={() => props.onSelect(request.id)}
      aria-pressed={isSelected}
      className={classes(
        "w-full text-left rounded-2 px-4 py-3 outline-none",
        "border transition-colors",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
        isSelected
          ? "border-default bg-surface-secondary"
          : "border-transparent hover:bg-surface-secondary/60",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-body font-medium truncate">
            {request.customerName || "Без имени"}
          </p>
          <p className="text-body-small text-secondary truncate">
            {request.customerPhone || "Без номера"}
          </p>
        </div>
        {createdAtLabel ? (
          <span className="text-body-small text-secondary shrink-0 whitespace-nowrap">
            {createdAtLabel}
          </span>
        ) : null}
      </div>
    </button>
  )
}
