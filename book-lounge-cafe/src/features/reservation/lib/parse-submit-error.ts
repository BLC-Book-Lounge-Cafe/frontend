import axios from "axios"

export function parseReservationSubmitError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (err.message) return err.message
  }
  if (err instanceof Error && err.message) return err.message
  return "Не удалось отправить заявку. Попробуйте позже."
}
