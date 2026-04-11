import { useEffect, useState } from "react"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import Icon from "shared/ui/Icon"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import { createReservation, RESERVATION_LEAVE_REQUEST_LABEL } from "entities/reservation"
import { parseReservationSubmitError } from "../lib/parse-submit-error"
import type { ReservationFormValues } from "../model/validation"
import { ReservationForm } from "./reservation-form"

type ReservationModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservationModal(props: ReservationModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [formNonce, setFormNonce] = useState(0)

  useEffect(() => {
    if (props.isOpen) {
      setFormNonce((n) => n + 1)
      setApiError(null)
    }
  }, [props.isOpen])

  const handleSubmit = async (values: ReservationFormValues) => {
    setApiError(null)
    setIsLoading(true)
    try {
      await createReservation({
        customerName: values.customerName,
        customerPhone: values.customerPhone,
      })
      toastManager.show({
        title: "Заявка отправлена",
        message: "Мы свяжемся с вами в ближайшее время.",
        color: "success",
      })
      props.onOpenChange(false)
    } catch (err) {
      setApiError(parseReservationSubmitError(err))
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
              <Dialog.Header.Title>{RESERVATION_LEAVE_REQUEST_LABEL}</Dialog.Header.Title>
              <p className="text-body-small text-secondary">
                Оставьте контакты — администратор перезвонит и уточнит детали брони.
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
          <ReservationForm key={formNonce} onSubmit={handleSubmit} isLoading={isLoading} />
        </Dialog.Content>
      </Dialog>
    </Modal>
  )
}
