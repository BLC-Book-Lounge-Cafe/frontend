import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Container } from "./container"

describe("Container", () => {
  it("рендерит children", () => {
    render(<Container>Контент</Container>)
    expect(screen.getByText("Контент")).toBeInTheDocument()
  })

  it("применяет max-width по размеру", () => {
    const { rerender, container } = render(<Container size="sm">x</Container>)
    expect(container.firstChild).toHaveClass("max-w-md")

    rerender(<Container size="md">x</Container>)
    expect(container.firstChild).toHaveClass("max-w-lg")

    rerender(<Container size="lg">x</Container>)
    expect(container.firstChild).toHaveClass("max-w-xl")
  })

  it("прокидывает UNSAFE_className", () => {
    const { container } = render(<Container UNSAFE_className="extra">x</Container>)
    expect(container.firstChild).toHaveClass("extra")
  })
})
