import { parseUserFromResponse, type User } from "../model/user"

export type AdminSignInPayload = {
  login: string
  password: string
}

const MOCK_DELAY_MS = 500

const MOCK_VALID_LOGIN = "admin"
const MOCK_VALID_PASSWORD = "admin"

export class AdminSignInInvalidCredentialsError extends Error {
  constructor() {
    super("invalid_credentials")
    this.name = "AdminSignInInvalidCredentialsError"
  }
}

export async function signInAdmin(payload: AdminSignInPayload): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

  if (
    payload.login !== MOCK_VALID_LOGIN ||
    payload.password !== MOCK_VALID_PASSWORD
  ) {
    throw new AdminSignInInvalidCredentialsError()
  }

  return parseUserFromResponse({ isAdmin: true })
}
