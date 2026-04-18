import type { CafeTable } from "entities/table"
import { Card } from "shared/ui/card"
import { classes } from "shared/lib/classes"
import { formatSeatsCount } from "shared/lib/plural-ru"

type BookingTableCardProps = {
  table: CafeTable
  onPress: () => void
}

export function BookingTableCard(props: BookingTableCardProps) {
  const { table } = props

  return (
    <button
      type="button"
      onClick={props.onPress}
      className={classes(
        "text-left w-full h-full rounded-2 outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
      )}
    >
      <Card
        rounded={2}
        UNSAFE_className={classes(
          "p-5 h-full flex flex-col gap-3 text-left",
          "bg-surface-accent/90 ring-1 ring-inset ring-accent/25 shadow-md shadow-black/5",
          "hover:ring-accent/45 hover:shadow-lg hover:shadow-black/10 transition-[box-shadow,transform] duration-200",
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="text-title-3 font-bold">Стол №{table.id}</span>
          <span
            className="inline-flex gap-0.5 shrink-0 pt-1"
            aria-hidden
            title={formatSeatsCount(table.seatsCount)}
          >
            {Array.from({ length: Math.min(table.seatsCount, 8) }, (_, i) => (
              <span key={i} className="w-2 h-3 rounded-sm bg-accent/35" />
            ))}
          </span>
        </div>
        <p className="text-body text-secondary">{formatSeatsCount(table.seatsCount)}</p>
        <p className="text-body-small text-accent font-medium mt-auto">Забронировать →</p>
      </Card>
    </button>
  )
}
