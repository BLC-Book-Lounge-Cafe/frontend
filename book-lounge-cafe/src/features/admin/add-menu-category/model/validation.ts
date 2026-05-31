import { z } from "zod"

function parsePrice(value: string): number | null {
  const normalized = value.replace(",", ".").trim()
  if (!normalized) return null
  const n = Number.parseFloat(normalized)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

const menuItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Введите название блюда")
    .max(255, "Название не длиннее 255 символов"),
  price: z
    .string()
    .trim()
    .min(1, "Введите цену")
    .refine((value) => parsePrice(value) != null, "Укажите корректную цену (0 или больше)"),
})

export const addMenuCategoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Введите название для карточки")
    .max(255, "Название не длиннее 255 символов"),
  items: z.array(menuItemSchema).min(1, "Добавьте хотя бы одно блюдо"),
})

export type AddMenuCategoryFormValues = z.infer<typeof addMenuCategoryFormSchema>

export type AddMenuCategoryMenuItemValues = AddMenuCategoryFormValues["items"][number]

export const emptyMenuItemValues: AddMenuCategoryMenuItemValues = {
  name: "",
  price: "",
}

export const emptyAddMenuCategoryValues: AddMenuCategoryFormValues = {
  name: "",
  items: [{ ...emptyMenuItemValues }],
}

export function mapAddMenuCategoryFormToPayload(values: AddMenuCategoryFormValues) {
  return {
    name: values.name.trim(),
    menuItems: values.items.map((item) => ({
      name: item.name.trim(),
      price: parsePrice(item.price) ?? 0,
    })),
  }
}
