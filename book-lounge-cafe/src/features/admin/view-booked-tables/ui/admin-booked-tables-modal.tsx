import { useCallback, useEffect, useMemo, useState } from "react"
import {
  deleteTableReservation,
  fetchTableReservations,
  type TableReservation,
} from "entities/table-reservation"
import type { CafeTable } from "entities/table"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import Icon from "shared/ui/Icon"
import { parseBookedTablesError } from "../lib/parse-booked-tables-error"
import { AdminBookedTableRow } from "./admin-booked-table-row"

type AdminBookedTablesModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  /** Список столов для подстановки seatsCount по tableId. */
  tables: CafeTable[]
  /** Колбэк, чтобы внешний слой мог обновить состояние после изменений. */
  onChanged?: () => void
}

export function AdminBookedTablesModal(props: AdminBookedTablesModalProps) {
  const [items, setItems] = useState<TableReservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Set<number>>(new Set())
  const [saving, setSaving] = useState(false)

  const seatsByTableId = useMemo(() => {
    const map = new Map<number, number>()
    for (const t of props.tables) map.set(t.id, t.seatsCount)
    return map
  }, [props.tables])

  const loadReservations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchTableReservations({ pageSize: 100 })
      setItems(result.items)
      setPendingDelete((prev) => {
        const next = new Set<number>()
        for (const id of prev) {
          if (result.items.some((r) => r.id === id)) next.add(id)
        }
        return next
      })
    } catch (err) {
      setItems([])
      setPendingDelete(new Set())
      setError(parseBookedTablesError(err, "Не удалось загрузить бронирования."))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!props.isOpen) return
    void loadReservations()
  }, [props.isOpen, loadReservations])

  useEffect(() => {
    if (!props.isOpen) {
      setPendingDelete(new Set())
      setError(null)
    }
  }, [props.isOpen])

  const togglePending = useCallback((id: number) => {
    setPendingDelete((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleSave = async () => {
    if (pendingDelete.size === 0) return
    const ids = Array.from(pendingDelete)
    setSaving(true)

    const settled = await Promise.allSettled(
      ids.map((id) => deleteTableReservation(id)),
    )

    const succeeded = new Set<number>()
    const failed: Array<{ id: number; reason: unknown }> = []
    settled.forEach((res, idx) => {
      const id = ids[idx]
      if (res.status === "fulfilled") {
        succeeded.add(id)
      } else {
        failed.push({ id, reason: res.reason })
      }
    })

    if (succeeded.size > 0) {
      setItems((prev) => prev.filter((r) => !succeeded.has(r.id)))
      setPendingDelete((prev) => {
        const next = new Set(prev)
        for (const id of succeeded) next.delete(id)
        return next
      })
      toastManager.show({
        title:
          succeeded.size === 1
            ? "Бронь снята"
            : `Сняты брони: ${succeeded.size}`,
        message: "Изменения сохранены.",
        color: "success",
      })
      props.onChanged?.()
    }

    if (failed.length > 0) {
      toastManager.show({
        title:
          failed.length === 1
            ? "Не удалось снять бронь"
            : `Не удалось снять ${failed.length} ${failed.length === 1 ? "бронь" : "брони"}`,
        message: parseBookedTablesError(
          failed[0]?.reason,
          "Попробуйте обновить список и повторить.",
        ),
        color: "negative",
      })
    }

    setSaving(false)

    if (succeeded.size > 0 && failed.length === 0) {
      props.onOpenChange(false)
    }
  }

  const hasPending = pendingDelete.size > 0
  const isEmpty = !loading && !error && items.length === 0

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <Dialog UNSAFE_className="w-full max-w-md">
        <Dialog.Header>
          <div className="flex justify-between items-start gap-2">
            <Dialog.Header.Title>
              Просмотр забронированных столов
            </Dialog.Header.Title>
            <Button
              variant="plain"
              size="sm"
              onPress={() => props.onOpenChange(false)}
              aria-label="Закрыть"
              isDisabled={saving}
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
              Загружаем бронирования…
            </p>
          ) : isEmpty ? (
            <p className="text-body text-center text-secondary py-8">
              Активных бронирований нет.
            </p>
          ) : (
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {items.map((reservation) => (
                <li key={reservation.id}>
                  <AdminBookedTableRow
                    reservation={reservation}
                    seatsCount={seatsByTableId.get(reservation.tableId) ?? null}
                    isPendingDelete={pendingDelete.has(reservation.id)}
                    isDisabled={saving}
                    onToggle={togglePending}
                  />
                </li>
              ))}
            </ul>
          )}
        </Dialog.Content>

        <Dialog.Footer>
          <Button
            variant="filled"
            tone="accent"
            fullWidth
            isDisabled={!hasPending || saving || loading}
            onPress={handleSave}
          >
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </Modal>
  )
}
