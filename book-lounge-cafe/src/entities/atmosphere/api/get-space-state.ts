import { axiosInstance } from "api/axios-instance"
import type { GetSpaceStateResponse } from "api/api-client/api"

export async function fetchSpaceState() {
  const { data } = await axiosInstance.get<GetSpaceStateResponse>("/space-state")
  return data
}
