import type { ReactElement } from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MemoryRouter } from "react-router-dom"

import { AppLink } from "./link"

function renderWithRouter(ui: ReactElement, initialEntries = ["/"]) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>)
}

describe("AppLink", () => {
  it("рендерит Router Link с href и текстом", () => {
    renderWithRouter(<AppLink to="/books">Книги</AppLink>)
    const link = screen.getByRole("link", { name: "Книги" })
    expect(link).toHaveAttribute("href", "/books")
  })

  it("добавляет класс no-underline при noDefaultStyles", () => {
    renderWithRouter(<AppLink to="/" noDefaultStyles>Ссылка</AppLink>)
    expect(screen.getByRole("link", { name: "Ссылка" })).toHaveClass("no-underline")
  })
})
