import { describe, expect, it } from "vitest"

import { getNoiseLevelLabel, getWorkloadLevelLabel } from "./workload-noise-labels"

describe("getWorkloadLevelLabel", () => {
  it("возвращает подписи по диапазонам", () => {
    expect(getWorkloadLevelLabel(0)).toBe("Пустой зал")
    expect(getWorkloadLevelLabel(10)).toBe("Почти пустой зал")
    expect(getWorkloadLevelLabel(50)).toBe("Умеренная загруженность")
    expect(getWorkloadLevelLabel(100)).toBe("Зал заполнен полностью")
  })

  it("обрабатывает не-число", () => {
    expect(getWorkloadLevelLabel("x" as unknown as number)).toBe("Не определена")
  })
})

describe("getNoiseLevelLabel", () => {
  it("возвращает подписи по диапазонам", () => {
    expect(getNoiseLevelLabel(0)).toBe("Очень тихо")
    expect(getNoiseLevelLabel(50)).toBe("Привычный кафе-фон")
    expect(getNoiseLevelLabel(90)).toBe("Очень шумно")
  })
})
