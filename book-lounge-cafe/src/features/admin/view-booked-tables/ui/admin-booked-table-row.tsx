import { classes } from "shared/lib/classes"
import { dateFormatter } from "shared/lib/formatters/date-formatter"
import { formatSeatsCount } from "shared/lib/plural-ru"
import { Button } from "shared/ui/button"
import type { TableReservation } from "entities/table-reservation"

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}

function formatRange(startIso: string, endIso: string): string {
  const datePart = dateFormatter.formatIso(startIso, DATE_OPTIONS)
  const startPart = dateFormatter.formatIso(startIso, TIME_OPTIONS)
  const endPart = dateFormatter.formatIso(endIso, TIME_OPTIONS)
  return `${datePart}, ${startPart}-${endPart}`
}

type AdminBookedTableRowProps = {
  reservation: TableReservation
  seatsCount: number | null
  isPendingDelete: boolean
  isDisabled: boolean
  onToggle: (id: number) => void
}

export function AdminBookedTableRow(props: AdminBookedTableRowProps) {
  const { reservation, seatsCount, isPendingDelete, isDisabled, onToggle } = props

  const seatsLabel = seatsCount != null ? formatSeatsCount(seatsCount) : null
  const rangeLabel = formatRange(reservation.startTime, reservation.endTime)

  return (
    <div
      className={classes(
        "rounded-2 border bg-surface-secondary/60 px-4 py-3 transition-opacity",
        isPendingDelete ? "border-default opacity-50" : "border-transparent",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={classes(
              "text-body font-semibold text-title-1",
              isPendingDelete && "line-through",
            )}
          >
            Стол №{reservation.tableId}
          </p>
          {seatsLabel ? (
            <p className="text-body-small text-secondary mt-1">{seatsLabel}</p>
          ) : null}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-body-small text-secondary whitespace-nowrap">
            {rangeLabel}
          </span>
          <Button
            variant="filled"
            tone="accent"
            size="sm"
            isDisabled={isDisabled}
            onPress={() => onToggle(reservation.id)}
          >
            {isPendingDelete ? "Восстановить" : "Снять бронь"}
          </Button>
        </div>
      </div>

      {reservation.customerName || reservation.customerPhone ? (
        <p className="text-body-small text-secondary mt-2 truncate">
          {reservation.customerName || "Без имени"}
          {reservation.customerPhone ? ` · ${reservation.customerPhone}` : ""}
        </p>
      ) : null}
    </div>
  )
}
