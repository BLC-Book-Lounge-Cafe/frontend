import { axiosInstance } from "api/axios-instance"

export async function deleteMenuCategory(id: number): Promise<void> {
  await axiosInstance.delete(`/menu/category/${id}`)
}
