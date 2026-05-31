import { axiosInstance } from "api/axios-instance"
import type { MenuCategoryDto, UpdateMenuCategoryCommand } from "api/api-client/api"

export type UpdateMenuCategoryPayload = {
  name: string
  menuItems: { id: number; name: string; price: number }[]
}

export async function updateMenuCategory(
  categoryId: number,
  payload: UpdateMenuCategoryPayload,
): Promise<MenuCategoryDto> {
  const body: UpdateMenuCategoryCommand = {
    name: payload.name,
    menuItems: payload.menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
    })),
  }

  const { data } = await axiosInstance.put<MenuCategoryDto>(
    `/menu/category/${categoryId}`,
    body,
  )
  return data
}
