// shared
import { breakpoints, type Breakpoint } from "shared/lib/breakpoints"
// local
import type { Responsive, Static } from "./types"

export const responsive = new class {
  public isResponsive<T>(x: unknown): x is Partial<Record<Breakpoint, T>> {
    const keys: Breakpoint[] = [
      "base", // По умолчанию не включен в список брейкпоинтов
      ...Object.keys(breakpoints) as Breakpoint[],
    ]
    return (
      x !== null
      && typeof x === "object"
      && !Array.isArray(x)
      && keys.some((key) => key in x)
    )
  }

  public resolve<T, P extends Responsive<T>>(
    breakpoints: ReadonlySet<Breakpoint>,
    value: P
  ): Static<P>
  public resolve<T, P extends Responsive<T>, F extends Responsive<P>>(
    breakpoints: ReadonlySet<Breakpoint>,
    value: P,
    fallback: F
  ): NonNullable<Static<P>>
  public resolve<T, P extends Responsive<T>, F extends Responsive<P> | undefined = undefined>(
    breakpoints: ReadonlySet<Breakpoint>,
    value: P,
    fallback?: F,
  ): NonNullable<Static<P>> | Static<P> {
    // Если передан null, значит свойство обнулено, возвращаем его как есть
    if (value === null) return value as Static<P>

    // Указываем источник данных
    const source = (value ?? fallback)

    // Если источник не является адаптивным, возвращаем его как есть
    if (!this.isResponsive(source)) {
      return source as Static<P>
    }

    // Цикл проходит по ключам брейкпоинтов с конца списка, чтобы найти самое актуальное совпадение.
    // Пример: [base, xxs, xs, sm, (md), lg] -> { base, (md), xl }
    // Результат: md
    for (const bp of Array.from(breakpoints).reverse()) {
      if (source[bp]) return source[bp] as Static<P>
    }

    // Если не найдено совпадение, возвращаем значение по умолчанию.
    // Хотя это условие не должно срабатывать, тк цикл должен найти совпадение
    return source.base as Static<P>
  }
}()
