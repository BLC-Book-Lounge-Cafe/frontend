import { useEffect, useState } from "react"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import Icon from "shared/ui/Icon"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import { createBookReservation } from "entities/book-reservation"
import { parseBookingBookSubmitError } from "../lib/parse-submit-error"
import { reservationDateToIsoDateTime, type BookingBookFormValues } from "../model/validation"
import { BookingBookForm } from "./booking-book-form"

type BookingBookModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  bookId: number
  bookTitle: string
}

export function BookingBookModal(props: BookingBookModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [formNonce, setFormNonce] = useState(0)

  useEffect(() => {
    if (props.isOpen) {
      setFormNonce((n) => n + 1)
      setApiError(null)
    }
  }, [props.isOpen])

  const handleSubmit = async (values: BookingBookFormValues) => {
    setApiError(null)
    setIsLoading(true)
    try {
      await createBookReservation({
        bookId: props.bookId,
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        date: reservationDateToIsoDateTime(values.reservationDate),
      })
      toastManager.show({
        title: "Книга забронирована",
        message: "Мы свяжемся с вами для подтверждения.",
        color: "success",
      })
      props.onOpenChange(false)
    } catch (err) {
      setApiError(parseBookingBookSubmitError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={(open) => {
        props.onOpenChange(open)
        if (!open) setApiError(null)
      }}
    >
      <Dialog UNSAFE_className="w-full max-w-sm">
        <Dialog.Header>
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-2 pr-2">
              <Dialog.Header.Title>Бронирование книги</Dialog.Header.Title>
              <p className="text-body-small text-secondary">
                <strong className="font-bold text-title-3 text-black dark:text-white">
                  «{props.bookTitle}»
                </strong>. <br/> Оставьте контакты и дату — администратор подтвердит бронь.
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

        <Dialog.Content UNSAFE_className="overflow-y-auto">
          {apiError ? (
            <Notice tone="negative" variant="tinted" UNSAFE_className="mb-4">
              {apiError}
            </Notice>
          ) : null}
          <BookingBookForm key={formNonce} onSubmit={handleSubmit} isLoading={isLoading} />
        </Dialog.Content>
      </Dialog>
    </Modal>
  )
}
