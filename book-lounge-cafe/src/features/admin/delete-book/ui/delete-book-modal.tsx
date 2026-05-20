import { useState } from "react"
import { deleteBook, type Book } from "entities/book"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import Icon from "shared/ui/Icon"
import { parseDeleteBookError } from "../lib/parse-delete-book-error"

type DeleteBookModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  book: Book | null
  onDeleted?: () => void
}

export function DeleteBookModal(props: DeleteBookModalProps) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (open: boolean) => {
    if (!open) setError(null)
    props.onOpenChange(open)
  }

  const handleConfirm = async () => {
    if (!props.book) return
    setError(null)
    setDeleting(true)

    try {
      await deleteBook(props.book.id)
      toastManager.show({
        title: "Карточка удалена",
        message: `«${props.book.title}» удалена из библиотеки.`,
        color: "success",
      })
      props.onDeleted?.()
      handleOpenChange(false)
    } catch (err) {
      setError(parseDeleteBookError(err, "Не удалось удалить карточку."))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Modal isOpen={props.isOpen} onOpenChange={handleOpenChange}>
      <Dialog UNSAFE_className="w-full max-w-md">
        <Dialog.Header>
          <div className="flex justify-end">
            <Button
              variant="plain"
              size="sm"
              onPress={() => handleOpenChange(false)}
              aria-label="Закрыть"
              isDisabled={deleting}
            >
              <Icon name="xmark" />
            </Button>
          </div>
        </Dialog.Header>

        <Dialog.Content UNSAFE_className="py-2">
          {error ? (
            <Notice tone="negative" variant="tinted" UNSAFE_className="mb-4">
              {error}
            </Notice>
          ) : null}

          <p className="text-body font-semibold text-center text-title-1 px-2">
            Вы уверены, что хотите удалить карточку?
          </p>
        </Dialog.Content>

        <Dialog.Footer>
          <div className="flex justify-center gap-3 w-full">
            <Button
              variant="filled"
              tone="accent"
              UNSAFE_className="min-w-[7rem] flex-1 max-w-[10rem]"
              isDisabled={deleting}
              onPress={handleConfirm}
            >
              {deleting ? "Удаление…" : "Да"}
            </Button>
            <Button
              variant="filled"
              tone="accent"
              UNSAFE_className="min-w-[7rem] flex-1 max-w-[10rem]"
              isDisabled={deleting}
              onPress={() => handleOpenChange(false)}
            >
              Нет
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog>
    </Modal>
  )
}
