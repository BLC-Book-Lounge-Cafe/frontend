import { useEffect } from "react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateBook, type Book } from "entities/book"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { TextField } from "shared/ui/text-field"
import { toastManager } from "shared/ui/toast"
import { useModalVitals } from "shared/lib/observability"
import Icon from "shared/ui/Icon"
import { parseEditBookError } from "../lib/parse-edit-book-error"
import {
  bookToEditFormValues,
  editBookFormSchema,
  type EditBookFormValues,
} from "../model/validation"

type EditBookModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  book: Book | null
  onSaved?: () => void
}

export function EditBookModal(props: EditBookModalProps) {
  useModalVitals("edit-book", props.isOpen)

  const form = useForm<EditBookFormValues>({
    defaultValues: bookToEditFormValues({
      title: "",
      author: "",
      cover: "",
    }),
    resolver: zodResolver(editBookFormSchema),
  })

  const submitError = form.formState.errors.root?.message

  useEffect(() => {
    if (!props.isOpen || !props.book) return
    form.reset(bookToEditFormValues(props.book))
    form.clearErrors()
  }, [props.isOpen, props.book, form])

  const onSubmit: SubmitHandler<EditBookFormValues> = async (values) => {
    if (!props.book) return
    form.clearErrors("root")

    try {
      await updateBook(props.book.id, {
        name: values.name,
        author: values.author,
        imageUrl: values.imageUrl,
      })
      toastManager.show({
        title: "Книга обновлена",
        message: `«${values.name}» сохранена.`,
        color: "success",
      })
      props.onSaved?.()
      props.onOpenChange(false)
    } catch (err) {
      form.setError("root", {
        message: parseEditBookError(err, "Не удалось сохранить изменения."),
      })
    }
  }

  const saving = form.formState.isSubmitting

  const handleSave = () => {
    void form.handleSubmit(onSubmit)()
  }

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <Dialog UNSAFE_className="w-full max-w-md">
        <Dialog.Header>
          <div className="flex justify-between items-start gap-2">
            <Dialog.Header.Title>Редактировать карточку</Dialog.Header.Title>
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

        <Dialog.Content UNSAFE_className="space-y-4">
          {submitError ? (
            <Notice tone="negative" variant="tinted">
              {submitError}
            </Notice>
          ) : null}

          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Название книги"
                placeholder="Введите название книги"
                fullWidth
                isRequired
                isDisabled={saving}
                isInvalid={Boolean(fieldState.invalid && fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="author"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Автор"
                placeholder="Введите имя и фамилию автора"
                fullWidth
                isRequired
                isDisabled={saving}
                isInvalid={Boolean(fieldState.invalid && fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="imageUrl"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Изображение"
                placeholder="Добавьте ссылку на изображение"
                fullWidth
                isRequired
                isDisabled={saving}
                isInvalid={Boolean(fieldState.invalid && fieldState.error)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </Dialog.Content>

        <Dialog.Footer>
          <Button
            variant="filled"
            tone="accent"
            fullWidth
            isDisabled={saving}
            onPress={handleSave}
          >
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </Modal>
  )
}
