import axios from "axios"
import { axiosInstance } from "api/axios-instance"
import { ADMIN_JWT_COOKIE_NAME } from "shared/lib/auth"
import { setCookie } from "shared/lib/cookies"
import { parseUserFromResponse, type User } from "../model/user"

export type AdminSignInPayload = {
  login: string
  password: string
}

type LoginResponse = {
  token?: string | null
}

export class AdminSignInInvalidCredentialsError extends Error {
  constructor() {
    super("invalid_credentials")
    this.name = "AdminSignInInvalidCredentialsError"
  }
}

const ONE_DAY_SECONDS = 60 * 60 * 24

export async function signInAdmin(payload: AdminSignInPayload): Promise<User> {
  let token: string | undefined
  try {
    const { data } = await axiosInstance.post<LoginResponse>("/admin/login", {
      login: payload.login,
      password: payload.password,
    })
    token = data?.token ?? undefined
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      throw new AdminSignInInvalidCredentialsError()
    }
    throw err
  }

  if (!token) {
    throw new Error("Сервер не вернул токен авторизации.")
  }

  setCookie(ADMIN_JWT_COOKIE_NAME, token, {
    path: "/",
    sameSite: "lax",
    maxAgeSeconds: ONE_DAY_SECONDS,
  })

  return parseUserFromResponse({ isAdmin: true })
}
