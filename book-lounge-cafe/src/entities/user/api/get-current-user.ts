import { ADMIN_JWT_COOKIE_NAME } from "shared/lib/auth"
import { hasCookie } from "shared/lib/cookies"
import { parseUserFromResponse, type User } from "../model/user"

/**
 * В API нет ручки "/me", признак админа определяем по наличию JWT-куки,
 * которую бэкенд выставляет после успешного /admin/login.
 */
export async function fetchCurrentUser(): Promise<User> {
  const isAdmin = hasCookie(ADMIN_JWT_COOKIE_NAME)
  return parseUserFromResponse({ isAdmin })
}
