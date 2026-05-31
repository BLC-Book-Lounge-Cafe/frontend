import { describe, expect, it } from "vitest"

import { parseMenuFromResponse } from "./menu-view"

describe("parseMenuFromResponse", () => {
  it("возвращает пустой массив без категорий", () => {
    expect(parseMenuFromResponse({})).toEqual([])
  })

  it("маппит категории и цены", () => {
    const result = parseMenuFromResponse({
      menuCategories: [
        {
          id: 1,
          name: " Напитки ",
          menuItems: [
            { id: 10, name: " Кофе ", price: "120,5" as unknown as number },
            { name: "", price: "x" as unknown as number },
          ],
        },
        {
          name: "Без id",
          menuItems: [],
        },
      ],
    })
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({
      id: "1",
      title: "Напитки",
      items: [
        { id: 10, name: "Кофе", price: 120.5 },
        { name: "Без названия", price: 0 },
      ],
    })
    expect(result[1].id).toBe("category-1")
    expect(result[1].title).toBe("Без id")
  })

  it("читает MenuItems и MenuCategories в PascalCase", () => {
    const result = parseMenuFromResponse({
      MenuCategories: [
        {
          id: 2,
          name: "Десерты",
          MenuItems: [{ id: 5, name: "Торт", price: 300 }],
        },
      ],
    } as never)

    expect(result).toEqual([
      {
        id: "2",
        title: "Десерты",
        items: [{ id: 5, name: "Торт", price: 300 }],
      },
    ])
  })
})
