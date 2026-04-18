import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import Icon from "shared/ui/Icon"
import type { CafeTable } from "entities/table"
import { BookingTableForm } from "./booking-table-form"

type BookingTableModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  table: CafeTable | null
  /** Все столы зала (для согласованности запросов; при брони из модалки используется только `table`). */
  tables: CafeTable[]
}

export function BookingTableModal(props: BookingTableModalProps) {
  const table = props.table

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <Dialog UNSAFE_className="w-full max-w-sm">
        <Dialog.Header>
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-2 pr-2">
              <Dialog.Header.Title>Бронирование стола</Dialog.Header.Title>
              {table ? (
                <p className="text-body-small text-secondary">
                  Выберите дату, удобное время и контакты — бронь сразу попадёт в систему.
                </p>
              ) : null}
            </div>
            <Button
              variant="plain"
              size="sm"
              onPress={() => props.onOpenChange(false)}
              aria-label="Закрыть"
            >
              <Icon name="xmark" />
            </Button>
          </div>
        </Dialog.Header>

        <Dialog.Content UNSAFE_className="overflow-y-auto max-h-[min(85vh,560px)]">
          {table ? (
            <BookingTableForm
              key={table.id}
              tables={props.tables}
              tablesLoading={false}
              lockedTable={table}
              onSuccess={() => props.onOpenChange(false)}
            />
          ) : null}
        </Dialog.Content>
      </Dialog>
    </Modal>
  )
}
