/** Подпись к шкале загруженности (workload), 0–100. */
export function getWorkloadLevelLabel(value: number) {
  if (typeof value !== "number") return "Не определена"

  if (value === 0) {
    return "Пустой зал"
  }

  if (value < 20) {
    return "Почти пустой зал"
  }
  if (value < 40) {
    return "Небольшой поток посетителей"
  }
  if (value < 60) {
    return "Умеренная загруженность"
  }
  if (value < 80) {
    return "Много гостей"
  }

  if (value === 100) {
    return "Зал заполнен полностью"
  }

  return "Зал заполнен почти полностью"
}

/** Подпись к шкале шума, 0–100. */
export function getNoiseLevelLabel(value: number) {
  if (value < 20) {
    return "Очень тихо"
  }
  if (value < 40) {
    return "Тихий фон"
  }
  if (value < 60) {
    return "Привычный кафе-фон"
  }
  if (value < 80) {
    return "Заметно оживлённо"
  }
  return "Очень шумно"
}
