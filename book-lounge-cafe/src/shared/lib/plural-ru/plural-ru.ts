/**
 * Склонение для русского языка по числу `n`.
 * `forms` — [одна единица, 2–4 единицы, 5+ и исключения 11–14].
 *
 * @example pluralRu(1, ['стол', 'стола', 'столов']) // 'стол'
 * @example pluralRu(7, ['место', 'места', 'мест']) // 'мест'
 */
export function pluralRu(n: number, forms: readonly [string, string, string]): string {
  const abs = Math.abs(Math.trunc(n))
  const mod10 = abs % 10
  const mod100 = abs % 100

  if (mod100 >= 11 && mod100 <= 14) return forms[2]
  if (mod10 === 1) return forms[0]
  if (mod10 >= 2 && mod10 <= 4) return forms[1]
  return forms[2]
}

/** Текст вида «7 мест», «1 место», «3 места». */
export function formatSeatsCount(n: number): string {
  return `${Math.trunc(n)} ${pluralRu(n, ["место", "места", "мест"])}`
}
