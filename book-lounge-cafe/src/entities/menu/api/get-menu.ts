import { axiosInstance } from "api/axios-instance"
import type { GetMenuResponse } from "api/api-client/api"

export async function fetchMenu() {
  const { data } = await axiosInstance.get<GetMenuResponse>("/menu")
  return data
}
