import { ADMIN_JWT_COOKIE_NAME } from "shared/lib/auth"
import { removeCookie } from "shared/lib/cookies"

/**
 * Бэкенд не предоставляет эндпоинт выхода, поэтому очищаем JWT-куку на клиенте.
 */
export function signOutAdmin(): void {
  removeCookie(ADMIN_JWT_COOKIE_NAME)
}
