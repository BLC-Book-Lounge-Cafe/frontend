/** Подпись к шкале загруженности (workload), 0–100. */
export function getWorkloadLevelLabel(value: number) {
  if (value < 30) return "Маленький поток посетителей"
  if (value < 70) return "Небольшой поток посетителей"
  return "Загруженное пространство"
}

/** Подпись к шкале шума, 0–100. */
export function getNoiseLevelLabel(value: number) {
  if (value < 30) return "Тихо, как в библиотеке"
  if (value < 70) return "Приятный фон"
  return "Шумно"
}
