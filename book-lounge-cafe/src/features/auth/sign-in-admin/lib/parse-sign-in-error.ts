import axios from "axios"
import { AdminSignInInvalidCredentialsError } from "entities/user"

export const ADMIN_SIGN_IN_INVALID_CREDENTIALS_MESSAGE =
  "Неверный логин или пароль"

export function parseAdminSignInError(err: unknown): string {
  if (err instanceof AdminSignInInvalidCredentialsError) {
    return ADMIN_SIGN_IN_INVALID_CREDENTIALS_MESSAGE
  }

  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      return ADMIN_SIGN_IN_INVALID_CREDENTIALS_MESSAGE
    }
    const data = err.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (err.message) return err.message
  }

  if (err instanceof Error && err.message) return err.message
  return "Не удалось выполнить вход. Попробуйте позже."
}
