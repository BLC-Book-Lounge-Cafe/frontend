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
  /** Все столы зала. Если `table` не передан, в форме появится выбор стола. */
  tables: CafeTable[]
  /** Предзаполнить контакты клиента (используется при бронировании по заявке). */
  initialCustomer?: { customerName?: string; customerPhone?: string } | null
}

export function BookingTableModal(props: BookingTableModalProps) {
  const table = props.table
  const initialCustomer = props.initialCustomer ?? null
  const formKey = `${table?.id ?? "free"}-${initialCustomer?.customerName ?? ""}-${initialCustomer?.customerPhone ?? ""}`

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
              <p className="text-body-small text-secondary">
                Выберите дату, удобное время и контакты — бронь сразу попадёт в систему.
              </p>
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
          <BookingTableForm
            key={formKey}
            tables={props.tables}
            tablesLoading={false}
            lockedTable={table}
            initialCustomer={initialCustomer}
            onSuccess={() => props.onOpenChange(false)}
          />
        </Dialog.Content>
      </Dialog>
    </Modal>
  )
}
