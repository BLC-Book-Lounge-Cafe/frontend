import { axiosInstance } from "api/axios-instance"
import type { CreateMenuCategoryCommand, MenuCategoryDto } from "api/api-client/api"

/** Данные для создания категории меню (MenuCategoryForCreateDto). */
export type MenuCategoryForCreatePayload = {
  name: string
  menuItems: { name: string; price: number }[]
}

export async function createMenuCategory(
  payload: MenuCategoryForCreatePayload,
): Promise<MenuCategoryDto> {
  const body: CreateMenuCategoryCommand = {
    name: payload.name,
    menuItems: payload.menuItems.map((item) => ({
      name: item.name,
      price: item.price,
    })),
  }

  const { data } = await axiosInstance.post<MenuCategoryDto>("/menu/category", body)
  return data
}
