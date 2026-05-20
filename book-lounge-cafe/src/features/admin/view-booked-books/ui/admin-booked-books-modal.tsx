import { useCallback, useEffect, useMemo, useState } from "react"
import {
  deleteBookReservation,
  fetchBookReservations,
  type BookReservation,
} from "entities/book-reservation"
import type { Book } from "entities/book"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import Icon from "shared/ui/Icon"
import { parseBookedBooksError } from "../lib/parse-booked-books-error"
import { AdminBookedBookRow } from "./admin-booked-book-row"

type AdminBookedBooksModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  /** Книги из каталога библиотеки (текущая выборка) — для подписи title/author по bookId. */
  books: Book[]
  onChanged?: () => void
}

export function AdminBookedBooksModal(props: AdminBookedBooksModalProps) {
  const [items, setItems] = useState<BookReservation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Set<number>>(new Set())
  const [saving, setSaving] = useState(false)

  const booksById = useMemo(() => {
    const map = new Map<number, Pick<Book, "title" | "author">>()
    for (const book of props.books) {
      map.set(book.id, { title: book.title, author: book.author })
    }
    return map
  }, [props.books])

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    [items],
  )

  const loadReservations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const reservationsResult = await fetchBookReservations({
        pageNumber: 1,
        pageSize: 100,
        bookId: 19
      })
      setItems(reservationsResult.items)
      setPendingDelete((prev) => {
        const next = new Set<number>()
        for (const id of prev) {
          if (reservationsResult.items.some((r) => r.id === id)) next.add(id)
        }
        return next
      })
    } catch (err) {
      setItems([])
      setPendingDelete(new Set())
      setError(parseBookedBooksError(err, "Не удалось загрузить бронирования."))
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
      ids.map((id) => deleteBookReservation(id)),
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
        message: parseBookedBooksError(
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
              Просмотр забронированных книг
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
              {sortedItems.map((reservation) => (
                <li key={reservation.id}>
                  <AdminBookedBookRow
                    reservation={reservation}
                    book={booksById.get(reservation.bookId) ?? null}
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
