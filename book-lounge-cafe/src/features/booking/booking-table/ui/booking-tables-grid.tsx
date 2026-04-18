import type { CafeTable } from "entities/table"
import { Notice } from "shared/ui/notice"
import { BookingTableCard } from "./booking-table-card"

type BookingTablesGridProps = {
  tables: CafeTable[]
  loading: boolean
  error: string | null
  onTablePress: (table: CafeTable) => void
}

export function BookingTablesGrid(props: BookingTablesGridProps) {
  if (props.loading) {
    return (
      <p className="text-body text-center text-secondary py-8" aria-live="polite">
        Загружаем столы…
      </p>
    )
  }

  if (props.error) {
    return (
      <Notice tone="negative" variant="tinted">
        {props.error}
      </Notice>
    )
  }

  if (props.tables.length === 0) {
    return (
      <p className="text-body text-center text-secondary py-6">
        Столы пока недоступны. Попробуйте позже или оставьте заявку администратору.
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 list-none p-0 m-0">
      {props.tables.map((table) => (
        <li key={table.id}>
          <BookingTableCard table={table} onPress={() => props.onTablePress(table)} />
        </li>
      ))}
    </ul>
  )
}
