import { useCallback, useEffect, useMemo, useState } from "react"
import {
  fetchReservationRequests,
  updateReservationRequestStatus,
  type ReservationRequest,
} from "entities/reservation-request"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import Icon from "shared/ui/Icon"
import { parseAdminRequestsError } from "../lib/parse-admin-requests-error"
import { AdminRequestRow } from "./admin-request-row"

type AdminRequestsModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onBookForCustomer: (request: ReservationRequest) => void
}

export function AdminRequestsModal(props: AdminRequestsModalProps) {
  const [items, setItems] = useState<ReservationRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [cancelling, setCancelling] = useState(false)

  const selected = useMemo(
    () => items.find((r) => r.id === selectedId) ?? null,
    [items, selectedId],
  )

  const loadRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchReservationRequests({
        status: "pending",
        pageSize: 100,
      })
      setItems(result.items)
      setSelectedId((prev) =>
        prev != null && result.items.some((r) => r.id === prev) ? prev : null,
      )
    } catch (err) {
      setItems([])
      setError(
        parseAdminRequestsError(err, "Не удалось загрузить заявки."),
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!props.isOpen) return
    void loadRequests()
  }, [props.isOpen, loadRequests])

  useEffect(() => {
    if (!props.isOpen) {
      setSelectedId(null)
      setError(null)
    }
  }, [props.isOpen])

  const handleCancel = async () => {
    if (!selected) return
    setCancelling(true)
    try {
      await updateReservationRequestStatus(selected.id, "cancelled")
      toastManager.show({
        title: "Заявка отменена",
        message: `Заявка от «${selected.customerName || "клиента"}» переведена в отменённые.`,
        color: "success",
      })
      setItems((prev) => prev.filter((r) => r.id !== selected.id))
      setSelectedId(null)
    } catch (err) {
      toastManager.show({
        title: "Не удалось отменить заявку",
        message: parseAdminRequestsError(
          err,
          "Попробуйте обновить список и повторить.",
        ),
        color: "negative",
      })
    } finally {
      setCancelling(false)
    }
  }

  const handleBookForCustomer = () => {
    if (!selected) return
    props.onBookForCustomer(selected)
    props.onOpenChange(false)
  }

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <Dialog UNSAFE_className="w-full max-w-xl">
        <Dialog.Header>
          <div className="flex justify-between items-start gap-2">
            <Dialog.Header.Title>Просмотр заявок</Dialog.Header.Title>
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

        <Dialog.Content UNSAFE_className="overflow-y-auto max-h-[min(70vh,520px)]">
          {error ? (
            <Notice tone="negative" variant="tinted" UNSAFE_className="mb-4">
              {error}
            </Notice>
          ) : null}

          {loading ? (
            <p
              className="text-body text-center text-secondary py-8"
              aria-live="polite"
            >
              Загружаем заявки…
            </p>
          ) : items.length === 0 && !error ? (
            <p className="text-body text-center text-secondary py-8">
              Заявок в ожидании нет.
            </p>
          ) : (
            <ul className="flex flex-col gap-1 list-none p-0 m-0">
              {items.map((request) => (
                <li key={request.id}>
                  <AdminRequestRow
                    request={request}
                    isSelected={request.id === selectedId}
                    onSelect={setSelectedId}
                  />
                </li>
              ))}
            </ul>
          )}
        </Dialog.Content>

        <Dialog.Footer>
          <div className="flex flex-col-reverse sm:flex-row gap-3 w-full">
            <Button
              variant="tinted"
              fullWidth
              isDisabled={!selected || cancelling}
              onPress={handleCancel}
            >
              {cancelling ? "Отмена…" : "Отменить заявку"}
            </Button>
            <Button
              variant="filled"
              fullWidth
              isDisabled={!selected || cancelling}
              onPress={handleBookForCustomer}
            >
              Забронировать столик для клиента
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog>
    </Modal>
  )
}
