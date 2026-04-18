import type { GetMenuResponse, MenuCategoryDto, MenuItemDto } from "api/api-client/api"

export type MenuViewItem = {
  name: string
  price: number
}

export type MenuViewCategory = {
  id: string
  title: string
  items: MenuViewItem[]
}

function readPrice(value: unknown): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value
  if (typeof value === "string") {
    const normalized = value.replace(",", ".").trim()
    const n = Number.parseFloat(normalized)
    return Number.isNaN(n) ? 0 : n
  }
  return 0
}

function mapItem(item: MenuItemDto): MenuViewItem {
  const rawPrice = (item as { price?: unknown }).price
  return {
    name: item.name?.trim() || "Без названия",
    price: readPrice(rawPrice),
  }
}

function categoryKey(category: MenuCategoryDto, index: number): string {
  const rawId = (category as { id?: number | string }).id
  if (rawId !== undefined && rawId !== null) return String(rawId)
  return `category-${index}`
}

export function parseMenuFromResponse(data: GetMenuResponse): MenuViewCategory[] {
  const categories = data.menuCategories ?? []
  return categories.map((category, index) => ({
    id: categoryKey(category, index),
    title: category.name?.trim() || "Категория",
    items: (category.menuItems ?? []).map(mapItem),
  }))
}
