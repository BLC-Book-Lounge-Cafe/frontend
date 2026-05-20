/** Значения NoiseLevelType из GET/PATCH /space-state (0–5). */
export const NOISE_LEVELS = [
  { value: 0, label: "Очень тихо" },
  { value: 1, label: "Спокойная обстановка" },
  { value: 2, label: "Умеренный шум" },
  { value: 3, label: "Оживленно" },
  { value: 4, label: "Заметно оживленно" },
  { value: 5, label: "Концерт с живой музыкой" },
] as const

export type NoiseLevel = (typeof NOISE_LEVELS)[number]["value"]

const NOISE_LEVEL_MIN = 0
const NOISE_LEVEL_MAX = 5

export function parseNoiseLevel(value: unknown): number | undefined {
  if (value == null) return undefined

  let n: number
  if (typeof value === "number" && Number.isFinite(value)) {
    n = Math.trunc(value)
  } else if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (!Number.isFinite(parsed)) return undefined
    n = Math.trunc(parsed)
  } else {
    return undefined
  }

  if (n < NOISE_LEVEL_MIN || n > NOISE_LEVEL_MAX) return undefined
  return n
}

/** Подпись к уровню шума NoiseLevelType (0–5). */
export function getNoiseLevelLabel(level: number): string {
  const item = NOISE_LEVELS.find((entry) => entry.value === level)
  return item?.label ?? "Не определена"
}

/** Шкала прогресс-бара: 0 → 0%, 5 → 100%. */
export function noiseLevelToProgressPercent(level: number): number {
  const clamped = Math.min(NOISE_LEVEL_MAX, Math.max(NOISE_LEVEL_MIN, level))
  return Math.round((clamped / NOISE_LEVEL_MAX) * 100)
}

export function isNoiseLevel(value: number): value is NoiseLevel {
  return Number.isInteger(value) && value >= NOISE_LEVEL_MIN && value <= NOISE_LEVEL_MAX
}
