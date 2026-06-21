export type VitalsContext = {
  /** Является ли текущий пользователь администратором. */
  isAdmin: boolean
  /** Текущий путь (route) на момент замера. */
  route: string
  /** Логическое имя страницы (например, "home"). */
  page: string
  /** Имя открытой модалки (или null, если ни одна не открыта). */
  modal: string | null
}

const state: VitalsContext = {
  isAdmin: false,
  route: typeof window !== "undefined" ? window.location.pathname : "/",
  page: "",
  modal: null,
}

/**
 * Возвращает снимок текущего контекста. Route всегда берётся «живым»
 * из window.location, чтобы корректно работать при клиентской навигации.
 */
export function getVitalsContext(): VitalsContext {
  return {
    ...state,
    route:
      typeof window !== "undefined" ? window.location.pathname : state.route,
  }
}

export function setVitalsAdmin(isAdmin: boolean): void {
  state.isAdmin = isAdmin
}

/** Помечает логическую страницу, на которой сейчас находится пользователь. */
export function setVitalsPage(page: string): void {
  state.page = page
}

/**
 * Помечает, какая модалка сейчас открыта. Это значение прикрепляется к
 * метрикам INP/CLS, которые накапливаются во время работы с модалкой.
 */
export function setActiveModal(name: string | null): void {
  state.modal = name
}
