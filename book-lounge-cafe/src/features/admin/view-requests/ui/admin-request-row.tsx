import { classes } from "shared/lib/classes"
import type { ReservationRequest } from "entities/reservation-request"

type AdminRequestRowProps = {
  request: ReservationRequest
  isSelected: boolean
  onSelect: (id: number) => void
}

export function AdminRequestRow(props: AdminRequestRowProps) {
  const { request, isSelected } = props

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
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="text-body font-medium truncate">
            {request.customerName || "Без имени"}
          </p>
          <p className="text-body-small text-secondary truncate">
            {request.customerPhone || "Без номера"}
          </p>
        </div>
      </div>
    </button>
  )
}
