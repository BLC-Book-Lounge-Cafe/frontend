import { classes } from "shared/lib/classes"
import { dateFormatter } from "shared/lib/formatters/date-formatter"
import { Button } from "shared/ui/button"
import type { BookReservation } from "entities/book-reservation"

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}

function formatUntilDate(iso: string): string {
  const label = dateFormatter.formatIso(iso, DATE_OPTIONS)
  return `До ${label}`
}

type BookInfo = {
  title: string
  author: string
}

type AdminBookedBookRowProps = {
  reservation: BookReservation
  book: BookInfo | null
  isPendingDelete: boolean
  isDisabled: boolean
  onToggle: (id: number) => void
}

export function AdminBookedBookRow(props: AdminBookedBookRowProps) {
  const { reservation, book, isPendingDelete, isDisabled, onToggle } = props

  const title = book?.title || `Книга №${reservation.bookId}`
  const author = book?.author || "Автор не указан"
  const untilLabel = formatUntilDate(reservation.date)

  return (
    <div
      className={classes(
        "rounded-2 border bg-surface-secondary/60 px-4 py-3 transition-opacity",
        isPendingDelete ? "border-default opacity-50" : "border-transparent",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className={classes(
              "text-body font-semibold text-title-1 line-clamp-2",
              isPendingDelete && "line-through",
            )}
          >
            {title}
          </p>
          <p className="text-body-small text-secondary mt-1 truncate">{author}</p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-body-small text-secondary whitespace-nowrap">
            {untilLabel}
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
    </div>
  )
}
