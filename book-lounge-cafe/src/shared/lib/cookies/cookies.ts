export type SetCookieOptions = {
  path?: string
  domain?: string
  maxAgeSeconds?: number
  expires?: Date
  sameSite?: "lax" | "strict" | "none"
  secure?: boolean
}

export function setCookie(
  name: string,
  value: string,
  options: SetCookieOptions = {},
): void {
  if (typeof document === "undefined") return

  const path = options.path ?? "/"
  const sameSite = options.sameSite ?? "lax"

  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${path}`,
    `samesite=${sameSite}`,
  ]

  if (options.maxAgeSeconds !== undefined) {
    parts.push(`max-age=${options.maxAgeSeconds}`)
  }
  if (options.expires) {
    parts.push(`expires=${options.expires.toUTCString()}`)
  }
  if (options.domain) {
    parts.push(`domain=${options.domain}`)
  }
  if (options.secure || sameSite === "none") {
    parts.push("secure")
  }

  document.cookie = parts.join("; ")
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const encodedName = encodeURIComponent(name)
  const cookies = document.cookie ? document.cookie.split("; ") : []

  for (const entry of cookies) {
    const eqIndex = entry.indexOf("=")
    const rawName = eqIndex === -1 ? entry : entry.slice(0, eqIndex)
    if (rawName === encodedName) {
      const rawValue = eqIndex === -1 ? "" : entry.slice(eqIndex + 1)
      try {
        return decodeURIComponent(rawValue)
      } catch {
        return rawValue
      }
    }
  }

  return null
}

export function removeCookie(
  name: string,
  options: { path?: string; domain?: string } = {},
): void {
  if (typeof document === "undefined") return

  const path = options.path ?? "/"
  const parts = [
    `${encodeURIComponent(name)}=`,
    "expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "max-age=0",
    `path=${path}`,
  ]

  if (options.domain) {
    parts.push(`domain=${options.domain}`)
  }

  document.cookie = parts.join("; ")
}

export function hasCookie(name: string): boolean {
  return getCookie(name) !== null
}
