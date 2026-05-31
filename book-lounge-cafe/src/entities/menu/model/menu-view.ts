import type { GetMenuResponse, MenuCategoryDto, MenuItemDto } from "api/api-client/api"

export type MenuViewItem = {
  id?: number
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

function readItemId(value: unknown): number | undefined {
  if (value == null) return undefined
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return Math.trunc(value)
  }
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    if (Number.isFinite(n) && n > 0) return Math.trunc(n)
  }
  return undefined
}

function mapItem(item: MenuItemDto): MenuViewItem {
  const raw = item as MenuItemDto & { Id?: number | string }
  const rawPrice = raw.price ?? (raw as { Price?: unknown }).Price
  const id = readItemId(raw.id ?? raw.Id)
  return {
    ...(id != null ? { id } : {}),
    name: item.name?.trim() || "Без названия",
    price: readPrice(rawPrice),
  }
}

function categoryKey(category: MenuCategoryDto, index: number): string {
  const rawId = (category as { id?: number | string }).id
  if (rawId !== undefined && rawId !== null) return String(rawId)
  return `category-${index}`
}

function readMenuItems(category: MenuCategoryDto): MenuItemDto[] {
  const raw = category as MenuCategoryDto & { MenuItems?: MenuItemDto[] }
  const items = category.menuItems ?? raw.MenuItems
  return Array.isArray(items) ? items : []
}

export function parseMenuFromResponse(data: GetMenuResponse): MenuViewCategory[] {
  const root = data as GetMenuResponse & { MenuCategories?: MenuCategoryDto[] }
  const categories = data.menuCategories ?? root.MenuCategories ?? []
  return categories.map((category, index) => ({
    id: categoryKey(category, index),
    title: category.name?.trim() || "Категория",
    items: readMenuItems(category).map(mapItem),
  }))
}
