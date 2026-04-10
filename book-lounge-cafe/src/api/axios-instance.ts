import axios from 'axios'
import { env } from 'shared/lib/env'

export const axiosInstance = axios.create({
  baseURL: env.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
