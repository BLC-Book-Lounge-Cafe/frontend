import { parseUserFromResponse, type User } from "../model/user"

const MOCK_RESPONSE = {
  isAdmin: false,
} as const

const MOCK_DELAY_MS = 300

export async function fetchCurrentUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return parseUserFromResponse(MOCK_RESPONSE)
}
