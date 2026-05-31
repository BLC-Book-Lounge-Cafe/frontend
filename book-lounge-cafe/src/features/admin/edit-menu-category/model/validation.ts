import type { MenuViewCategory } from "entities/menu"
import { z } from "zod"

function parsePrice(value: string): number | null {
  const normalized = value.replace(",", ".").trim()
  if (!normalized) return null
  const n = Number.parseFloat(normalized)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

const editMenuItemSchema = z.object({
  itemId: z.number().int().positive().optional(),
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

export const editMenuCategoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Введите название для карточки")
    .max(255, "Название не длиннее 255 символов"),
  items: z.array(editMenuItemSchema).min(1, "Добавьте хотя бы одно блюдо"),
})

export type EditMenuCategoryFormValues = z.infer<typeof editMenuCategoryFormSchema>

export type EditMenuCategoryMenuItemValues = EditMenuCategoryFormValues["items"][number]

export const emptyEditMenuItemValues: EditMenuCategoryMenuItemValues = {
  name: "",
  price: "",
}

export function categoryToEditFormValues(category: MenuViewCategory): EditMenuCategoryFormValues {
  const items =
    category.items.length > 0
      ? category.items.map((item) => ({
          ...(item.id != null ? { itemId: item.id } : {}),
          name: item.name,
          price: String(item.price),
        }))
      : [{ ...emptyEditMenuItemValues }]

  return {
    name: category.title,
    items,
  }
}

export function mapEditMenuCategoryFormToPayload(values: EditMenuCategoryFormValues) {
  return {
    name: values.name.trim(),
    menuItems: values.items.map((item) => ({
      id: item.itemId ?? 0,
      name: item.name.trim(),
      price: parsePrice(item.price) ?? 0,
    })),
  }
}
