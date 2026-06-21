import { useEffect } from "react"
import { Controller, useFieldArray, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseMenuCategoryId, updateMenuCategory, type MenuViewCategory } from "entities/menu"
import { CircleActionButton } from "features/admin/add-menu-category/ui/menu-item-row-controls"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { TextField } from "shared/ui/text-field"
import { toastManager } from "shared/ui/toast"
import { useModalVitals } from "shared/lib/observability"
import Icon from "shared/ui/Icon"
import { parseEditMenuCategoryError } from "../lib/parse-edit-menu-category-error"
import {
  categoryToEditFormValues,
  editMenuCategoryFormSchema,
  emptyEditMenuItemValues,
  mapEditMenuCategoryFormToPayload,
  type EditMenuCategoryFormValues,
} from "../model/validation"

type EditMenuCategoryModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  category: MenuViewCategory | null
  onSaved?: () => void
}

export function EditMenuCategoryModal(props: EditMenuCategoryModalProps) {
  useModalVitals("edit-menu-category", props.isOpen)

  const form = useForm<EditMenuCategoryFormValues>({
    defaultValues: categoryToEditFormValues({
      id: "",
      title: "",
      items: [],
    }),
    resolver: zodResolver(editMenuCategoryFormSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const submitError = form.formState.errors.root?.message
  const itemsError = form.formState.errors.items?.message

  useEffect(() => {
    if (!props.isOpen || !props.category) return
    form.reset(categoryToEditFormValues(props.category))
    form.clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- сброс при открытии с выбранной категорией
  }, [props.isOpen, props.category])

  const onSubmit: SubmitHandler<EditMenuCategoryFormValues> = async (values) => {
    if (!props.category) return

    const categoryId = parseMenuCategoryId(props.category.id)
    if (categoryId == null) {
      form.setError("root", {
        message: "Не удалось определить категорию для сохранения.",
      })
      return
    }

    form.clearErrors("root")

    try {
      const payload = mapEditMenuCategoryFormToPayload(values)
      await updateMenuCategory(categoryId, payload)
      toastManager.show({
        title: "Карточка обновлена",
        message: `«${payload.name}» сохранена.`,
        color: "success",
      })
      props.onSaved?.()
      props.onOpenChange(false)
    } catch (err) {
      form.setError("root", {
        message: parseEditMenuCategoryError(err, "Не удалось сохранить изменения."),
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

        <Dialog.Content UNSAFE_className="space-y-5">
          {submitError ? (
            <Notice tone="negative" variant="tinted">
              {submitError}
            </Notice>
          ) : null}

          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-body font-medium shrink-0 sm:min-w-[10.5rem]">
                  Название карточки<span className="text-negative">*</span>
                </span>
                <TextField
                  {...field}
                  aria-label="Название карточки"
                  placeholder="Введите название для карточки"
                  fullWidth
                  isDisabled={saving}
                  isInvalid={Boolean(fieldState.invalid && fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  UNSAFE_className="flex-1"
                />
              </div>
            )}
          />

          <div className="space-y-3">
            <div className="grid grid-cols-[1fr_1fr_2.5rem] gap-3 items-end">
              <span className="text-body font-medium">
                Блюдо<span className="text-negative">*</span>
              </span>
              <span className="text-body font-medium">
                Стоимость<span className="text-negative">*</span>
              </span>
              <span className="sr-only">Действия</span>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[1fr_1fr_2.5rem] gap-3 items-start"
              >
                <Controller
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field: itemField, fieldState }) => (
                    <TextField
                      {...itemField}
                      aria-label={`Название блюда ${index + 1}`}
                      placeholder="Введите название блюда"
                      fullWidth
                      isDisabled={saving}
                      isInvalid={Boolean(fieldState.invalid && fieldState.error)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field: itemField, fieldState }) => (
                    <TextField
                      {...itemField}
                      aria-label={`Цена блюда ${index + 1}`}
                      placeholder="Введите цену"
                      fullWidth
                      isDisabled={saving}
                      isInvalid={Boolean(fieldState.invalid && fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      inputMode="decimal"
                    />
                  )}
                />

                {fields.length > 1 ? (
                  <div className="flex justify-center pt-1">
                    <CircleActionButton
                      variant="remove"
                      label="Удалить строку"
                      isDisabled={saving}
                      onPress={() => remove(index)}
                    />
                  </div>
                ) : (
                  <span aria-hidden />
                )}
              </div>
            ))}

            {itemsError ? (
              <p className="text-body-small text-negative">{itemsError}</p>
            ) : null}

            <div className="flex justify-center pt-1">
              <CircleActionButton
                variant="add"
                label="Добавить блюдо"
                isDisabled={saving}
                onPress={() => append({ ...emptyEditMenuItemValues })}
              />
            </div>
          </div>
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
