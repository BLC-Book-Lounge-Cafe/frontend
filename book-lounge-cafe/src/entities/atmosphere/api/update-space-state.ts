import { axiosInstance } from "api/axios-instance"

export type UpdateSpaceStatePayload = {
  noiseLevel: number
  description: string
}

export async function updateSpaceState(payload: UpdateSpaceStatePayload): Promise<void> {
  await axiosInstance.patch("/space-state", payload)
}
