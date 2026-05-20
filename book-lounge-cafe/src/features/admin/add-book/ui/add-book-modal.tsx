import { useEffect } from "react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createBook } from "entities/book"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { TextField } from "shared/ui/text-field"
import { toastManager } from "shared/ui/toast"
import Icon from "shared/ui/Icon"
import { parseAddBookError } from "../lib/parse-add-book-error"
import {
  addBookFormSchema,
  emptyAddBookValues,
  type AddBookFormValues,
} from "../model/validation"

type AddBookModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSaved?: () => void
}

export function AddBookModal(props: AddBookModalProps) {
  const form = useForm<AddBookFormValues>({
    defaultValues: emptyAddBookValues,
    resolver: zodResolver(addBookFormSchema),
  })

  const submitError = form.formState.errors.root?.message

  useEffect(() => {
    if (!props.isOpen) return
    form.reset(emptyAddBookValues)
    form.clearErrors()
  }, [props.isOpen, form])

  const onSubmit: SubmitHandler<AddBookFormValues> = async (values) => {
    form.clearErrors("root")

    try {
      await createBook({
        name: values.name,
        author: values.author,
        imageUrl: values.imageUrl,
      })
      toastManager.show({
        title: "Книга добавлена",
        message: `«${values.name}» появилась в библиотеке.`,
        color: "success",
      })
      props.onSaved?.()
      props.onOpenChange(false)
    } catch (err) {
      form.setError("root", {
        message: parseAddBookError(err, "Не удалось добавить книгу."),
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
            <Dialog.Header.Title>Добавить карточку книги</Dialog.Header.Title>
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
                label="Название карточки"
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
