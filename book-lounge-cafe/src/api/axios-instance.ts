import axios from 'axios'
import { ADMIN_JWT_COOKIE_NAME } from 'shared/lib/auth'
import { getCookie } from 'shared/lib/cookies'
import { env } from 'shared/lib/env'

export const axiosInstance = axios.create({
  baseURL: env.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie(ADMIN_JWT_COOKIE_NAME)
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})
