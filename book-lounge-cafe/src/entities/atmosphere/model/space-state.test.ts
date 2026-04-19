import { describe, expect, it } from "vitest"

import { parseAtmosphereFromResponse, readPercent } from "./space-state"

describe("readPercent", () => {
  it("клампит число в 0–100", () => {
    expect(readPercent(50)).toBe(50)
    expect(readPercent(-5)).toBe(0)
    expect(readPercent(150)).toBe(100)
  })

  it("возвращает undefined для не-числа", () => {
    expect(readPercent("10")).toBeUndefined()
    expect(readPercent(NaN)).toBeUndefined()
  })
})

describe("parseAtmosphereFromResponse", () => {
  it("возвращает null без spaceState", () => {
    expect(parseAtmosphereFromResponse({})).toBeNull()
  })

  it("собирает patch из полей ответа", () => {
    const patch = parseAtmosphereFromResponse({
      spaceState: {
        workloadLevel: 40,
        noiseLevel: 30,
        description: "  Уютно  ",
        currentTrack: {
          name: " Track ",
          authors: ["A", "B"],
          imageUrl: " https://img ",
        },
      },
    })
    expect(patch).toEqual({
      crowdLevel: 40,
      noiseLevel: 30,
      description: "Уютно",
      trackTitle: "Track",
      trackAuthors: "A, B",
      trackImage: "https://img",
    })
  })
})
