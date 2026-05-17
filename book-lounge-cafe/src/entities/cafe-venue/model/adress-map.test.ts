import { describe, expect, it, vi } from "vitest"

vi.mock("shared/lib/env/env", () => ({
  env: {
    yandexMapWidgetSrc: "https://api-maps.yandex.ru/services/constructor/1.0/static/",
    yandexMapLon: "37.6177",
    yandexMapLat: "55.7558",
    yandexMapZoom: "16",
  },
}))

import { yandexMapWidgetSrc } from "./adress-map"

describe("yandexMapWidgetSrc", () => {
  it("возвращает URL с базовым адресом виджета", () => {
    const url = yandexMapWidgetSrc()

    expect(url.startsWith("https://api-maps.yandex.ru")).toBe(true)
  })

  it("передаёт координаты центра через параметр ll", () => {
    const params = new URL(yandexMapWidgetSrc()).searchParams

    expect(params.get("ll")).toBe("37.6177,55.7558")
  })

  it("передаёт метку с суффиксом pm2rdm через параметр pt", () => {
    const params = new URL(yandexMapWidgetSrc()).searchParams

    expect(params.get("pt")).toBe("37.6177,55.7558,pm2rdm")
  })

  it("передаёт уровень зума и тип карты", () => {
    const params = new URL(yandexMapWidgetSrc()).searchParams

    expect(params.get("z")).toBe("16")
    expect(params.get("l")).toBe("map")
  })

  it("ll и pt ссылаются на одну точку", () => {
    const params = new URL(yandexMapWidgetSrc()).searchParams
    const ll = params.get("ll")!
    const pt = params.get("pt")!

    expect(pt.startsWith(ll)).toBe(true)
  })
})
