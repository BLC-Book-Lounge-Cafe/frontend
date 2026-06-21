import { useState } from "react"
import { deleteMenuCategory, parseMenuCategoryId, type MenuViewCategory } from "entities/menu"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import { useModalVitals } from "shared/lib/observability"
import Icon from "shared/ui/Icon"
import { parseDeleteMenuCategoryError } from "../lib/parse-delete-menu-category-error"
type DeleteMenuCategoryModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  category: MenuViewCategory | null
  onDeleted?: () => void
}

export function DeleteMenuCategoryModal(props: DeleteMenuCategoryModalProps) {
  useModalVitals("delete-menu-category", props.isOpen)

  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (open: boolean) => {
    if (!open) setError(null)
    props.onOpenChange(open)
  }

  const handleConfirm = async () => {
    if (!props.category) return

    const categoryId = parseMenuCategoryId(props.category.id)
    if (categoryId == null) {
      setError("Не удалось определить категорию для удаления.")
      return
    }

    setError(null)
    setDeleting(true)

    try {
      await deleteMenuCategory(categoryId)
      toastManager.show({
        title: "Карточка удалена",
        message: `«${props.category.title}» удалена из меню.`,
        color: "success",
      })
      props.onDeleted?.()
      handleOpenChange(false)
    } catch (err) {
      setError(parseDeleteMenuCategoryError(err, "Не удалось удалить карточку."))
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
