import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Notice } from "./notice"

describe("Notice", () => {
  it("рендерит children", () => {
    render(<Notice>Сообщение</Notice>)
    expect(screen.getByText("Сообщение")).toBeInTheDocument()
  })

  it("проставляет role", () => {
    render(<Notice role="alert">Ошибка</Notice>)
    expect(screen.getByRole("alert")).toHaveTextContent("Ошибка")
  })

  it("по умолчанию role=presentation", () => {
    render(<Notice>Текст</Notice>)
    expect(screen.getByText("Текст")).toHaveAttribute("role", "presentation")
  })
})
