import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MemoryRouter } from "react-router-dom"

import { AppNavLink } from "./nav-link"

describe("AppNavLink", () => {
  it("помечает активную ссылку классом text-accent", () => {
    render(
      <MemoryRouter initialEntries={["/current"]}>
        <AppNavLink to="/current">Текущая</AppNavLink>
      </MemoryRouter>,
    )
    expect(screen.getByRole("link", { name: "Текущая" })).toHaveClass("text-accent")
  })

  it("не добавляет text-accent для неактивного маршрута", () => {
    render(
      <MemoryRouter initialEntries={["/other"]}>
        <AppNavLink to="/home">Домой</AppNavLink>
      </MemoryRouter>,
    )
    expect(screen.getByRole("link", { name: "Домой" })).not.toHaveClass("text-accent")
  })
})
