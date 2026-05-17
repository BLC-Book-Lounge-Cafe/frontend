import { parseUserFromResponse, type User } from "../model/user"

// TODO: заменить мок на реальный запрос, когда появится ручка на бэке.
// Шаблон будущей реализации (DTO нужно будет догенерить в api-client):
//
// import { axiosInstance } from "api/axios-instance"
// import type { GetCurrentUserResponse } from "api/api-client/api"
//
// export async function fetchCurrentUser(): Promise<User> {
//   const { data } = await axiosInstance.get<GetCurrentUserResponse>("/users/me")
//   return parseUserFromResponse({ isAdmin: data.isAdmin })
// }

const MOCK_RESPONSE = {
  isAdmin: true,
} as const

const MOCK_DELAY_MS = 300

export async function fetchCurrentUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return parseUserFromResponse(MOCK_RESPONSE)
}
