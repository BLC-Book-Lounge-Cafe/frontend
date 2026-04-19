import { describe, expect, it } from "vitest"

import { range } from "./range"

describe("range", () => {
  it("строит возрастающий массив включительно", () => {
    expect(range(1, 3)).toEqual([1, 2, 3])
    expect(range(5, 5)).toEqual([5])
  })
})
